package foolstack.server.project

import grails.plugin.springsecurity.annotation.Secured

class ProjectController {

    static allowedMethods = [
            listUsers: 'POST'
    ]
    static responseFormats = ['json']

    def projectService

    @Secured('ROLE_USER')
    def listUsers() {
        respond projectService.listUsers(request.JSON.searchValue)
    }

}
