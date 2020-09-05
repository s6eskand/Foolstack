package foolstack.server.auth

import grails.gorm.transactions.Transactional
import foolstack.server.Constants

import javax.imageio.ImageIO
import java.awt.Image

@Transactional
class AccountService {

    /**
     * @param none
     * @return List<User>: list of all users
     */
    def listAllUsers() {
        return User.listOrderById()
    }

    /**
     *
     * @param body {
     *     username: username submitted
     * }
     * @return User: the specific user
     */
    def getUser(Object body) {
        return User.findByUsername(body.username)
    }

    /**
     *
     * @param searchValue: piece of searched username
     * @return List<User>: list of all matching users
     */
    def listUsers(String searchValue) {
        def criteria = User.createCriteria()
        def query = criteria.list {
            like("username", "${searchValue}%")
        }

        return query
    }

    /**
     *
     * @param body {
     *     username: username submitted for request
     *     githubUsername: linked github username submitted by username
     *     biography: submitted biography of user
     *     websiteLink: submitted website of user
     *     socialLink: social website submitted by user
     *     profilePicture: base64 string to be saved as profile picture (converted through JS)
     * }
     * @return
     */
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

        // check image size to ensure compatibility
        String base64String = profilePicture.tokenize(',')[1]
        byte[] bytes = Base64.decoder.decode(base64String)
        InputStream inputStream = new ByteArrayInputStream(bytes)
        Image image = ImageIO.read(inputStream)
        if (image.height > 260 || image.width > 260) {
            return '{"success": false, "message": "Image dimensions of '+image.width+' by '+image.height+' exceed maximum of 260"}'
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
