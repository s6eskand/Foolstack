package foolstack.server.project

import foolstack.server.auth.User
import grails.gorm.transactions.Transactional

@Transactional
class ProjectService {

    def listUsers(String searchValue) {
        def criteria = User.createCriteria()
        def query = criteria.list {
            like("username", "${searchValue}%")
        }

        return query
    }

}
