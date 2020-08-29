package foolstack.server.auth

import foolstack.server.project.Project
import grails.gorm.transactions.Transactional

@Transactional
class RegisterService {

    def register(Object body) {
        Set<Role> roles = new HashSet<>()
        def role = new Role(authority: body.authority).save()
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
        ).save()
        UserRole.create(user, role, true).save()
    }
}
