package foolstack.server.project

import foolstack.server.Constants
import foolstack.server.auth.User
import grails.converters.JSON
import grails.gorm.transactions.Transactional
import groovy.json.JsonSlurper

@Transactional
class ProjectService {

    // save user projects after edit or creation
    // required since Project domain is embedded within User domain, rather than a one to many relationship
    def updateUserProjects(User user, Project project, String projectTitle) {
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

    // general github request
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

    /**
     * @param null
     * @return List<Project>: all projects
     */
    def list() {
        return Project.listOrderById()
    }

    /**
     *
     * @param owner: user to get linked projects
     * @return List<Project>: all projects linked to user
     */
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

    /**
     *
     * @param projectTitle
     * @return Project: spcific project or error
     */
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

    /**
     *
     * @param githubUsername
     * @return List<String>: list of all github repos by title
     */
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

    /**
     *
     * @param body: {
     *     username: username of user creating project
     *     fromGithub: boolean value to know if project imported from github
     *     githubRepository: if fromGithub, search details of selected repository
     *     linkIssues: boolean value to know whether or not to link project issues (github only)
     *     linkCommits: boolean value to know whether or not to link project commits (github only)
     *     linkPullRequests: boolean value to know whether or not to link project prs (github only)
     *     isPrivate: boolean value to tell if project is private or not
     *     projectDescription: project description
     *     languages: programming languages associated with project
     * }
     * @return Project: created project
     */
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
                    newProject.schemas = new HashSet<Schema>()
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
                    newProject.schemas = new HashSet<Schema>()
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

    /**
     *
     * @param body: {
     *     owner: project owner
     *     projectTitle: title of project to be edited
     *     content: readme text content
     * }
     * @return Project: edited project
     */
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

        updateUserProjects(user, project, projectTitle)
        return project

    }

    /**
     *
     * @param body: {
     *     owner: owner of project
     *     projectTitle: title of project
     *     name: name of code file
     *     language: language file is written in
     *     content: content of file
     * }
     * @return Project: edited project
     */
    def createFile(Object body) {

        String username = body.owner
        String projectTitle = body.projectTitle
        User user = User.findByUsername(username)
        Project project = Project.findByProjectTitle(projectTitle)

        Set<Code> codeFiles = project.codeFiles
        Code code = new Code(
                projectId: project.projectId,
                codeId: UUID.randomUUID().toString(),
                name: body.name,
                language: body.language,
                content: body.content
        )

        codeFiles.add(code)

        Project.withTransaction {
            project.codeFiles = codeFiles
            project.save(flush: true, failOnError: true)
        }

        updateUserProjects(user, project, projectTitle)
        return project

    }

    /**
     *
     * @param body: {
     *     codeId: uuid of code file
     *     owner: owner of project
     *     projectTitle: title of project
     *     name: name of code file
     *     language: language file is written in
     *     content: content of file
     * }
     * @return Project: edited project
     */
    def editCodeFile(Object body) {

        String codeId = body.codeId
        String username = body.owner
        String projectTitle = body.projectTitle
        User user = User.findByUsername(username)
        Project project = Project.findByProjectTitle(projectTitle)

        Set<Code> codeFiles = new HashSet<>()
        Code code = new Code(
                projectId: project.projectId,
                codeId: UUID.randomUUID().toString(),
                name: body.name,
                language: body.language,
                content: body.content
        )

        for (Code c : project.codeFiles) {
            if (c.codeId == codeId) {
                codeFiles.add(code)
            } else {
                codeFiles.add(c)
            }
        }

        Project.withTransaction {
            project.codeFiles = codeFiles
            project.save(flush: true, failOnError: true)
        }

        updateUserProjects(user, project, projectTitle)
        return project

    }

    /**
     *
     * @param body: {
     *      owner: owner of project
     *      projectTitle: title of project
     *      name: name of code file
     * @return Project: edited project
     */
    def deleteCode(Object body) {

        String codeId = body.codeId
        String username = body.owner
        String projectTitle = body.projectTitle
        User user = User.findByUsername(username)
        Project project = Project.findByProjectTitle(projectTitle)

        Set<Code> codeFiles = new HashSet<>()

        for (Code c : project.codeFiles) {
            if (c.codeId != codeId) {
                codeFiles.add(c)
            }
        }

        Project.withTransaction {
            project.codeFiles = codeFiles
            project.save(flush: true, failOnError: true)
        }

        updateUserProjects(user, project, projectTitle)
        return project

    }

    /**
     *
     * @param body: {
     *     owner: owner of project
     *     projectTitle: title of project
     *     isEdit: whether or not the schema is being edited
     *     schemaId: internal uuid of schema
     *     name: name of schema
     *     fields: fields/data within schema
     * }
     * @return Project: edited project
     */
    def createSchema(Object body) {

        String username = body.owner
        String projectTitle = body.projectTitle
        boolean isEdit = body.isEdit
        String schemaId = ''
        if (isEdit) {
            schemaId = body.schemaId
        } else {
            schemaId = UUID.randomUUID().toString()
        }

        User user = User.findByUsername(username)
        Project project = Project.findByProjectTitle(projectTitle)

        Schema schema = new Schema(
                projectId: project.projectId,
                schemaId: schemaId,
                name: body.name,
                fields: body.fields,
        )

        if (isEdit) {
            Set<Schema> schemas = new HashSet<>()

            for (Schema s : project.schemas) {
                if (s.schemaId == schemaId) {
                    schemas.add(schema)
                } else {
                    schemas.add(s)
                }
            }

            Project.withTransaction {
                project.schemas = schemas
                project.save(flush: true, failOnError: true)
            }

        } else {
            Set<Schema> schemas = project.schemas
            schemas.add(schema)

            Project.withTransaction {
                project.schemas = schemas
                project.save(flush: true, failOnError: true)
            }
        }

        updateUserProjects(user, project, projectTitle)
        return project

    }

    /**
     *
     * @param body: {
     *     username: username of user deleting schema
     *     projectTitle: title of project
     *     schemaId: internal uuid of schema
     * }
     * @return Project: edited project
     */
    def deleteSchema(Object body) {

        String username = body.username
        String projectTitle = body.projectTitle
        String schemaId = body.schemaId

        User user = User.findByUsername(username)
        Project project = Project.findByProjectTitle(projectTitle)

        Set<Schema> schemas = new HashSet<>()
        for (Schema s : project.schemas) {
            if (s.schemaId != schemaId) {
                schemas.add(s)
            }
        }

        Project.withTransaction {
            project.schemas = schemas
            project.save(flush: true, failOnError: true)
        }

        updateUserProjects(user, project, projectTitle)
        return project

    }

    /**
     *
     * @param body: {
     *     owner: owner of project
     *     projectTitle: title of project
     *     isEdit: whether or not the service is being edited
     *     serviceId: internal uuid of service
     *     sampleResponse: sample response object of service
     *     name: name of service
     *     requestMethod: HTTP request method of service
     *     path: path of endpoint
     *     queryParams: queryParams of request (can be empty)
     *     sampleRequests: sample requests of request (can be empty)
     *     responseFields: response fields returned by service (can be empty)
     * }
     * @return Project: edited project
     */
    def createOrEditService(Object body) {

        String username = body.owner
        String projectTitle = body.projectTitle
        boolean isEdit = body.isEdit
        String serviceId = ''
        if (isEdit) {
            serviceId = body.serviceId
        } else {
            serviceId = UUID.randomUUID().toString()
        }

        User user = User.findByUsername(username)
        Project project = Project.findByProjectTitle(projectTitle)

        Map<String, String> sampleResponse = new HashMap<>()
        sampleResponse.put('responseBody', body.sampleResponse ? body.sampleResponse.responseBody : '')
        sampleResponse.put('language', body.sampleResponse ? body.sampleResponse.language : '')

        Service service = new Service(
                projectId: project.projectId,
                serviceId: serviceId,
                name: body.name,
                requestMethod: body.requestMethod,
                path: body.path,
                queryParams: body.queryParams ? body.queryParams : new HashSet<Object>(),
                sampleRequests: body.sampleRequests ? body.sampleRequests : new HashSet<Object>(),
                sampleResponse: body.sampleResponse ? sampleResponse : new HashMap<String, String>(),
                responseFields: body.responseFields ? body.responseFields : new HashSet<Object>(),
        )

        if (isEdit) {
            Set<Service> services = new HashSet<>()

            for (Service s : project.services) {
                if (s.serviceId == serviceId) {
                    services.add(service)
                } else {
                    services.add(s)
                }
            }

            Project.withTransaction {
                project.services = services
                project.save(flush: true, failOnError: true)
            }

        } else {
            Set<Service> services = project.services
            services.add(service)

            Project.withTransaction {
                project.services = services
                project.save(flush: true, failOnError: true)
            }
        }

        updateUserProjects(user, project, projectTitle)
        return project
    }

    /**
     *
     * @param body: {
     *     username: username of user deleting service
     *     projectTitle: title of project
     *     serviceId: internal uuid of service
     * }
     * @return Project: edited project
     */
    def deleteService(Object body) {

        String username = body.username
        String projectTitle = body.projectTitle
        String serviceId = body.serviceId

        User user = User.findByUsername(username)
        Project project = Project.findByProjectTitle(projectTitle)

        Set<Service> services = new HashSet<>()
        for (Service s : project.services) {
            if (s.serviceId != serviceId) {
                services.add(s)
            }
        }

        Project.withTransaction {
            project.services = services
            project.save(flush: true, failOnError: true)
        }

        updateUserProjects(user, project, projectTitle)
        return project

    }

    /**
     *
     * @param body: {
     *     owner: owner of project to be deleted
     *     projectTitle: title of project to be deleted
     * }
     * @return null
     */
    def deleteProject(Object body) {

        String username = body.owner
        String projectTitle = body.projectTitle
        User user = User.findByUsername(username)
        Project project = Project.findByProjectTitle(projectTitle)

        Set<Project> projects = new HashSet<>()
        for (Project p : user.projects) {
            if (p.projectId != project.projectId) {
                projects.add(p)
            }
        }

        Project.withTransaction {
            project.delete()
        }

        User.withTransaction {
            user.save(flush: true, failOnError: true)
        }

    }

}
