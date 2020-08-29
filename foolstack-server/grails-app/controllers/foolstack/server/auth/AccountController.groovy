package foolstack.server.auth

import grails.plugin.springsecurity.annotation.Secured

class AccountController {

    static allowedMethods = [getUser: 'POST']
    static responseFormats = ['json']

    def accountService

    @Secured(['ROLE_USER'])
    def getUser() {
        respond accountService.getUser(request.JSON)
    }

    @Secured(['ROLE_USER'])
    def searchUser() {
        String username = request.parameterMap.get('username')[0]
        respond accountService.userSearch(username)
    }

}
