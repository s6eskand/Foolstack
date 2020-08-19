package foolstack.server.auth

import grails.gorm.transactions.Transactional

@Transactional
class AccountService {

    def getUser(Object body) {
        return User.findByUsername(body.username)
    }
}
