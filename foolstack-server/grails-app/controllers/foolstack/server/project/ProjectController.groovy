package foolstack.server.project

import grails.converters.JSON
import grails.plugin.springsecurity.annotation.Secured
import net.minidev.json.JSONObject
import org.grails.web.json.JSONElement

class ProjectController {

    static allowedMethods = [
            list: 'GET',
            account: 'GET',
            github: 'GET',
            create: 'POST',
            readme: 'POST',
            addCode: 'POST',
            editCode: 'POST',
            schema: 'POST',
            deleteSchema: 'POST'
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

    @Secured('ROLE_USER')
    def readme() {
        respond projectService.createReadme(request.JSON)
    }

    @Secured('ROLE_USER')
    def addCode() {
        respond projectService.createFile(request.JSON)
    }

    @Secured('ROLE_USER')
    def editCode() {
        respond projectService.editCodeFile(request.JSON)
    }

    @Secured('ROLE_USER')
    def schema() {
        respond projectService.createSchema(request.JSON)
    }

    @Secured('ROLE_USER')
    def deleteSchema() {
        respond projectService.deleteSchema(request.JSON)
    }

}
