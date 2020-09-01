package foolstack.server.project

class Issue {

    static mapWith = "mongo"

    // indexing Domain class fields allows for faster lookup through GORM
    static mapping = {
        issueId index: true
        projectId index: true
    }

    String projectId
    String issueId
    String issueTitle
    String githubUrl
    long issueNumber
    String raisedBy
    String state
    String createdAt
    String lastUpdated

    static constraints = {
    }
}
