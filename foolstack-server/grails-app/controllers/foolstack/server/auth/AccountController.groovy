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

    // controller to list all registered accounts
    // no auth required as reading privileges do not require account
    @Secured('permitAll')
    def list() {
        respond accountService.listAllUsers()
    }

    // controller to get specific user
    // secured as specific entries are handled for writing purposes
    @Secured(['ROLE_USER'])
    def getUser() {
        respond accountService.getUser(request.JSON)
    }

    // controller to edit account of specified user
    // secured
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
