package foolstack.server.project

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import net.minidev.json.JSONObject
import org.grails.web.json.JSONElement

class ProjectController {

    static allowedMethods = [
            list: 'GET',
            account: 'GET',
            github: 'GET'
    ]
    static responseFormats = ['json']

    def projectService

    @Secured('permitAll')
    def list() {
        respond projectService.list()
    }

    @Secured('permitAll')
    def account() {
        String owner = request.getParameter('user')
        respond projectService.getUserProjects(owner)
    }

    @Secured('permitAll')
    def detail() {
        String projectTitle = request.getParameter('projectTitle')
        respond projectService.getSpecificProject(projectTitle)
    }

    @Secured('ROLE_USER')
    def github() {
        String githubUsername = request.getParameter('username')
        respond projectService.getUserGithubRepositories(githubUsername)
    }

    @Secured('ROLE_USER')
    def create() {
        respond projectService.create(request.JSON)
    }

}
