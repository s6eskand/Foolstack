package foolstack.server.project

class Schema {

    static mapWith = "mongo"

    String projectId
    String schemaId
    String name
    Set<Object> fields

    static constraints = {
    }
}
