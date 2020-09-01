package foolstack.server.auth

import foolstack.server.project.Project
import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic
import org.bson.types.ObjectId

@GrailsCompileStatic
@EqualsAndHashCode(includes='username')
@ToString(includes='username', includeNames=true, includePackage=false)
class User implements Serializable {

    static mapWith = "mongo"

    ObjectId id
    String username
    String password
    String email
    String firstname
    String lastname
    String accountType
    String biography
    String websiteLink
    String socialLink
    String githubUsername
    String profilePicture = "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    Set<Project> projects
    boolean enabled = true
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired
    Set<Role> authorities

    static embedded = ['authorities', 'projects']

    Set<Role> getAuthorities() {
//        (UserRole.findAllByUser(this) as List<UserRole>)*.role as Set<Role>
        this.authorities
    }

    static constraints = {
        password nullable: false, blank: false, password: true
        username nullable: false, blank: false, unique: true
        websiteLink nullable: true
        socialLink nullable: true
        profilePicture nullable: true
        biography nullable: true
        githubUsername nullable: true
    }

    static mapping = {
	    password column: '`password`'
        username index: true
    }
}
