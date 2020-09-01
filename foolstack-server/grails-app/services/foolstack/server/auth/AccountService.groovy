package foolstack.server.auth

import grails.gorm.transactions.Transactional
import foolstack.server.Constants

@Transactional
class AccountService {

    def getUser(Object body) {
        return User.findByUsername(body.username)
    }

    def editProfile(Object body) {

        Constants constants = new Constants()

        String username = body.username
        String githubUsername = body.githubUsername
        String biography = body.biography
        String websiteLink = body.websiteLink
        String socialLink = body.socialLink
        String profilePicture = body.profilePicture

        User user = User.findByUsername(username)

        // ensure github user exists
        if (githubUsername) {
            URL url = new URL(constants.GITHUB_USER.replace("{:user}", githubUsername))
            def connection = url.openConnection()
            connection.setRequestProperty("requestMethod", "GET")
            if (connection.getResponseCode() == 404) {
                return '{"success": false, "message": "No such github account exists"}'
            }
        }

        // since github username exists and is verified, save info
        User.withTransaction {
            user.githubUsername = githubUsername
            user.biography = biography
            user.websiteLink = websiteLink
            user.socialLink = socialLink
            user.profilePicture = profilePicture
            user.save(flush: true, failOnError: true)
        }

        return '{"success": true, "message": "account info successfully updated"}'


    }

}
