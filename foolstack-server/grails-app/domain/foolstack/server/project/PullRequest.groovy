package foolstack.server.project

class PullRequest {

    static mapWith = "mongo"

    // indexing Domain class fields allows for faster lookup through GORM
    static mapping = {
        projectId index: true
        pullRequestId index: true
    }

    String projectId
    String pullRequestId
    String pullRequestTitle
    long pullRequestNumber
    String githubUrl
    String state
    String raisedBy
    String createdAt
    String lastUpdated

    static constraints = {
    }
}
