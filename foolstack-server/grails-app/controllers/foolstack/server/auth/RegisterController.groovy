package foolstack.server.auth

import grails.plugin.springsecurity.annotation.Secured

class RegisterController {

    static allowedMethods = [save: 'POST']
    static responseFormats = ['json']

    def registerService

    // controller to register users
    @Secured('permitAll')
    def save() {

        response.setContentType('application/json')
        response << registerService.register(request.JSON)

    }

}
