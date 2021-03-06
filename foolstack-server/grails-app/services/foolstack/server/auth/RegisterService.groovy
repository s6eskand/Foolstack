package foolstack.server.auth

import foolstack.server.project.Project
import grails.gorm.transactions.Transactional

@Transactional
class RegisterService {

    /**
     *
     * @param body: {
     *     username: username submitted by user,
     *     firstname: firstname of user,
     *     lastname: lastname of user,
     *     password: user password to be encoded,
     *     email: email of user
     * }
     * @return null
     */
    def register(Object body) {
        Set<Role> roles = new HashSet<>()
        def role = new Role(authority: "ROLE_USER").save(flush: true)
        roles.add(role)
        def user = new User(
                username: body.username,
                firstname: body.firstname,
                lastname: body.lastname,
                password: body.password,
                authorities: roles,
                email: body.email,
                projects: new HashSet<Project>(),
                accountType: 'standard'
        ).save(flush: true, failOnError: true)
        UserRole.create(user, role, true).save(flush: true)
    }
}
