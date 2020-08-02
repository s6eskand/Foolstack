package foolstack.server.auth

import org.bson.types.ObjectId

class AuthToken {

    static mapWith = "mongo"

    ObjectId id
    String secretToken // field to store the token used for accessing api end point
    String loginName // login name of the user

    static mapping = {
        version false
    }
}
