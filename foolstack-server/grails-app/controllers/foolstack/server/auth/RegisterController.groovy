package foolstack.server.auth

import grails.plugin.springsecurity.annotation.Secured

class RegisterController {

    static allowedMethods = [save: 'POST']
    static responseFormats = ['json']

    def registerService

    @Secured('permitAll')
    def save() {

//        respond User.findByPassword('foolstack')
        response.setContentType('application/json')
        response << registerService.register(request.JSON)

    }

}
