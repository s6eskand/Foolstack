package foolstack.server.project

class Project {

    static mapWith = "mongo"

    String projectTitle
    Set<String> canEdit

    static embedded = ['canEdit']

    static constraints = {
    }
}
