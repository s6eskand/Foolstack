package foolstack.server.project

import foolstack.server.Constants
import foolstack.server.auth.User
import grails.converters.JSON
import grails.gorm.transactions.Transactional
import groovy.json.JsonSlurper
import org.grails.web.json.JSONElement

@Transactional
class ProjectService {

    def makeGithubRequest(URL url) {

        // open HTTP connection
        def connection = url.openConnection()
        connection.setRequestProperty("requestMethod", "GET")

        // if successful request, set values
        if (connection.getResponseCode() == 200) {
            def responseString = connection.getInputStream().getText()
            return JSON.parse(responseString)
        }

    }

    def list() {
        return Project.listOrderById()
    }

    def getUserProjects(String owner) {

        // check to ensure user exists
        User user = User.findByUsername(owner)

        if (!user) {
            Map<String, String> response = new HashMap<>()
            response.put("Error", "No such user exists")
            return response
        } else {
            return Project.findAllByOwner(owner)
        }
    }

    def getSpecificProject(String projectTitle) {
        Project project = Project.findByProjectTitle(projectTitle)
        if (!project) {
            Map<String, String> response = new HashMap<>()
            response.put("Error", "No such project exists")
            return response
        } else {
            return project
        }
    }

    def getUserGithubRepositories(String githubUsername) {

        Constants constants = new Constants()

        // set url to find repos linked to specified user
        URL url = new URL("${constants.GITHUB_USER.replace('{:user}', githubUsername)}/repos")

        // open HTTP request connection
        def connection = url.openConnection()
        connection.setRequestProperty('requestMethod', 'GET')

        // if successful, parse data, returning list of all repositories for user
        // else return error message
        if (connection.getResponseCode() == 200) {
            def responseString = connection.getInputStream().getText()
            def response = JSON.parse(responseString)
            List<String> repositories = new ArrayList<>()
            for (Object obj : response) {
                repositories.add(obj.name)
            }
            return repositories
        } else {
            Map<String, String> response = new HashMap<>()
            response.put("Error", "No such github userame exists")
            return response
        }
    }

    def create(Object body) {

        // error object to return if project already exists
        Map<String, String> error = new HashMap<>()
        error.put("Error", "Project title already taken!")

        Constants constants = new Constants()
        String username = body.username
        User user = User.findByUsername(username)
        boolean fromGithub = body.fromGithub
        String projectId = UUID.randomUUID().toString()
        Set<String> canEdit = new HashSet<>()
        canEdit.add(username)

        // if project loading from Github, create using Github API
        // else implement standard creation
        if (fromGithub) {
            String githubRepository = body.githubRepository
            boolean linkCommits = body.linkCommits
            boolean linkIssues = body.linkIssues
            boolean linkPullRequests = body.linkPullRequests

            String baseRepositoryUrl = constants.GITHUB_REPO.replace('{:user}', user.githubUsername).replace('{:repo}', githubRepository)

            Set<Commit> commits = new HashSet<>()
            Set<Issue> issues = new HashSet<>()
            Set<PullRequest> pullRequests = new HashSet<>()

            // make general request
            URL url = new URL(baseRepositoryUrl)
            Object response = makeGithubRequest(url)

            // make languages request
            URL languagesUrl = new URL("${baseRepositoryUrl}/languages")
            String languageResponse = makeGithubRequest(languagesUrl).toString()
            Set<String> languages = new JsonSlurper().parseText(languageResponse).keySet()

            // if user selected to link commit history, make github API request
            if (linkCommits) {
                URL commitsUrl = new URL("${baseRepositoryUrl}/commits")
                def commitsResponse = makeGithubRequest(commitsUrl)
                for (Object obj : commitsResponse) {
                    Commit commit = new Commit()
                    Commit.withTransaction {
                        commit.projectId = projectId
                        commit.commitId = UUID.randomUUID().toString()
                        commit.githubSha = obj.sha
                        commit.githubUrl = obj.html_url
                        commit.author = obj.author.login
                        commit.avatar = obj.author.avatar_url
                        commit.message = obj.commit.message
                        commit.date = obj.commit.author.date
                    }
                    commits.add(commit)
                }
            }

            // if user selected to link issue history, make github API request
            if (linkIssues) {
                URL issuesUrl = new URL("${baseRepositoryUrl}/issues")
                def issuesResponse = makeGithubRequest(issuesUrl)
                for (Object obj : issuesResponse) {
                    Issue issue = new Issue()
                    Issue.withTransaction {
                        issue.projectId = projectId
                        issue.issueId = UUID.randomUUID().toString()
                        issue.issueTitle = obj.title
                        issue.issueNumber = obj.number
                        issue.githubUrl = obj.html_url
                        issue.raisedBy = obj.user.login
                        issue.state = obj.state
                        issue.createdAt = obj.created_at
                        issue.lastUpdated = obj.updated_at
                    }
                    issues.add(issue)
                }
            }

            // if user selected to link pullRequest history, make github API request
            if (linkPullRequests) {
                URL pullRequestsUrl = new URL("${baseRepositoryUrl}/pulls")
                def pullRequestResponse = makeGithubRequest(pullRequestsUrl)
                for (Object obj : pullRequestResponse) {
                    PullRequest pullRequest = new PullRequest()
                    PullRequest.withTransaction {
                        pullRequest.projectId = projectId
                        pullRequest.pullRequestId = UUID.randomUUID().toString()
                        pullRequest.pullRequestTitle = obj.title
                        pullRequest.pullRequestNumber = obj.number
                        pullRequest.githubUrl = obj.html_url
                        pullRequest.raisedBy = obj.user.login
                        pullRequest.state = obj.state
                        pullRequest.createdAt = obj.created_at
                        pullRequest.lastUpdated = obj.updated_at
                    }
                    pullRequests.add(pullRequest)
                }
            }

            String projectTitle = response.name
            Project checkProject = Project.findByProjectTitle(projectTitle)
            if (!checkProject) {
                String projectDescription = response.description
                String mainLanguage = response.language
                String githubUrl = response.html_url
                boolean isPrivate = response.private

                // create new project to save to DB and user
                Project newProject = new Project()
                Project.withTransaction {
                    newProject.projectId = projectId
                    newProject.projectTitle = projectTitle
                    newProject.projectDescription = projectDescription
                    newProject.mainLanguage = mainLanguage
                    newProject.languages = languages
                    newProject.owner = username
                    newProject.isPrivate = isPrivate
                    newProject.fromGithub = fromGithub
                    newProject.linkCommits = linkCommits
                    newProject.linkIssues = linkIssues
                    newProject.linkPullRequests = linkPullRequests
                    newProject.githubUrl = githubUrl
                    newProject.commits = commits
                    newProject.issues = issues
                    newProject.pullRequests = pullRequests
                    newProject.services = new HashSet<Service>()
                    newProject.codeFiles = new HashSet<Code>()
                    newProject.canEdit = canEdit
                    newProject.save(flush: true, failOnError: true)
                }

                Set<Project> projects = user.projects
                projects.add(newProject)

                User.withTransaction {
                    user.projects = projects
                    user.save(flush: true, failOnError: true)
                }

                return newProject
            } else {
                return error
            }


        } else {
            String projectTitle = body.projectTitle
            Project checkProject = Project.findByProjectTitle(projectTitle)

            if (!checkProject) {

                String projectDescription = body.projectDescription
                String languages = body.languages
                boolean isPrivate = body.isPrivate
                Set<String> languageList = new HashSet<>()
                if (languages.contains(',')) {
                    languageList = languages.split(',')
                } else {
                    languageList.add(languages)
                }

                Project newProject = new Project()
                Project.withTransaction {
                    newProject.projectId = projectId
                    newProject.projectTitle = projectTitle
                    newProject.projectDescription = projectDescription
                    newProject.mainLanguage = languageList[0]
                    newProject.languages = languageList
                    newProject.owner = username
                    newProject.isPrivate = isPrivate
                    newProject.commits = new HashSet<Commit>()
                    newProject.issues = new HashSet<Issue>()
                    newProject.pullRequests = new HashSet<PullRequest>()
                    newProject.services = new HashSet<Service>()
                    newProject.codeFiles = new HashSet<Code>()
                    newProject.canEdit = canEdit
                    newProject.save(flush: true, failOnError: true)
                }

                Set<Project> projects = user.projects
                projects.add(newProject)

                User.withTransaction {
                    user.projects = projects
                    user.save(flush: true, failOnError: true)
                }

                return newProject

            } else {
                return error
            }

        }

    }

    def createReadme(Object body) {
        String username = body.owner
        String projectTitle = body.projectTitle
        String readmeContent = body.content

        User user = User.findByUsername(username)
        Project project = Project.findByProjectTitle(projectTitle)

        Project.withTransaction {
            project.readMe = readmeContent
            project.save(flush: true, failOnError: true)
        }

        Set<Project> projects = new HashSet<>()

        for (Project p : user.projects) {
            if (p.projectTitle == projectTitle) {
                projects.add(project)
            } else {
                projects.add(p)
            }
        }

        User.withTransaction {
            user.projects = projects
            user.save(flush: true, failOnError: true)
        }

    }

}
