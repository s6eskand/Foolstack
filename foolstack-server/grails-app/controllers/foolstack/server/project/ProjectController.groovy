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
            deleteCode: 'POST',
            schema: 'POST',
            deleteSchema: 'POST',
            service: 'POST',
            deleteService: 'POST',
            delete: 'POST'
    ]
    static responseFormats = ['json']

    def projectService

    // list all projects
    // reading privileges do not require authentication
    @Secured('permitAll')
    def list() {
        respond projectService.list()
    }

    // get account specific accounts
    // reading privileges do not require authentication
    @Secured('permitAll')
    def account() {
        String owner = request.getParameter('user')
        respond projectService.getUserProjects(owner)
    }

    // get specific project details based off title
    @Secured('permitAll')
    def detail() {
        String projectTitle = request.getParameter('projectTitle')
        respond projectService.getSpecificProject(projectTitle)
    }

    // get github repositories linked to user
    @Secured('ROLE_USER')
    def github() {
        String githubUsername = request.getParameter('username')
        respond projectService.getUserGithubRepositories(githubUsername)
    }

    // create project
    @Secured('ROLE_USER')
    def create() {
        respond projectService.create(request.JSON)
    }

    // create/overwrite project README
    @Secured('ROLE_USER')
    def readme() {
        respond projectService.createReadme(request.JSON)
    }

    // create code file to link to project
    @Secured('ROLE_USER')
    def addCode() {
        respond projectService.createFile(request.JSON)
    }

    // edit code file linked to project
    @Secured('ROLE_USER')
    def editCode() {
        respond projectService.editCodeFile(request.JSON)
    }

    // delete code file linked to project
    @Secured('ROLE_USER')
    def deleteCode() {
        respond projectService.deleteCode(request.JSON)
    }

    // create or edit schema to link/is linked to project
    @Secured('ROLE_USER')
    def schema() {
        respond projectService.createSchema(request.JSON)
    }

    // delete schema linked to project
    @Secured('ROLE_USER')
    def deleteSchema() {
        respond projectService.deleteSchema(request.JSON)
    }

    // create or edit service to link/is linked to project
    @Secured('ROLE_USER')
    def service() {
        respond projectService.createOrEditService(request.JSON)
    }

    // delete service linked to project
    @Secured('ROLE_USER')
    def deleteService() {
        respond projectService.deleteService(request.JSON)
    }

    // delete project linked to user
    @Secured('ROLE_USER')
    def delete() {
        respond projectService.deleteProject(request.JSON)
    }

}
