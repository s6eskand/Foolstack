package foolstack.server.auth

import grails.plugin.springsecurity.annotation.Secured

class AccountController {

    static allowedMethods = [
            list: 'GET',
            getUser: 'POST',
            edit: 'POST',
            search: 'POST'
    ]
    static responseFormats = ['json']

    def accountService

    @Secured('permitAll')
    def list() {
        respond accountService.listAllUsers()
    }

    @Secured(['ROLE_USER'])
    def getUser() {
        respond accountService.getUser(request.JSON)
    }

    @Secured(['ROLE_USER'])
    def edit() {
        response.setContentType('application/json')
        response << accountService.editProfile(request.JSON)
    }

    @Secured(['ROLE_USER'])
    def search() {
        respond accountService.listUsers(request.JSON.searchValue)
    }

}
