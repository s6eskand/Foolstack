package foolstack.server.project

import org.bson.types.ObjectId

class Project {

    static mapWith = "mongo"

    // indexing Domain class fields allows for faster lookup through GORM
    static mapping = {
        projectId index: true
        owner index: true
        projectTitle index: true
    }

    ObjectId id
    String projectId
    String projectTitle
    String projectDescription
    String projectUrl
    String mainLanguage
    Set<String> languages
    String owner
    String readMe
    boolean isPrivate = false
    boolean fromGithub = false
    boolean linkCommits = false
    boolean linkIssues = false
    boolean linkPullRequests = false
    String githubUrl
    Set<Commit> commits
    Set<Issue> issues
    Set<PullRequest> pullRequests
    Set<Service> services
    Set<Code> codeFiles
    Set<String> canEdit

    static embedded = [
            'canEdit',
            'commits',
            'issues',
            'pullRequests',
            'languages',
            'code',
    ]

    static constraints = {
        projectTitle unique: true
        projectDescription nullable: true
        projectUrl nullable: true
        fromGithub nullable: true
        linkCommits nullable: true
        linkIssues nullable: true
        linkPullRequests nullable: true
        githubUrl nullable: true
        readMe nullable: true
    }
}
