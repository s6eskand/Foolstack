package foolstack.server.project

class Service {

    static mapWith = "mongo"

    // indexing Domain class fields allows for faster lookup through GORM
    static mapping = {
        projectId index: true
        serviceId index: true
    }

    String projectId
    String serviceId
    String name
    String path
    Set<Object> queryParams
    Set<Object> sampleRequests
    Map<String, String> sampleResponse
    Set<Object> responseFields
    String requestMethod

    static constraints = {
    }
}
