package foolstack.server.project

class Commit {

    static mapWith = "mongo"

    // indexing Domain class fields allows for faster lookup through GORM
    static mapping = {
        projectId index: true
        commitId index: true
    }

    String projectId
    String commitId
    String githubSha
    String githubUrl
    String author
    String message
    String date

    static constraints = {
    }
}
