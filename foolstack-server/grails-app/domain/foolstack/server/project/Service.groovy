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
    String path
    boolean isRest = true
    Set<Map<String, String>> sampleRequests
    String sampleResponse
    String requestMethod

    static constraints = {
    }
}
