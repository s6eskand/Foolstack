package foolstack.server.auth

import groovy.transform.EqualsAndHashCode
import groovy.transform.ToString
import grails.compiler.GrailsCompileStatic
import org.bson.types.ObjectId

@GrailsCompileStatic
@EqualsAndHashCode(includes='authority')
@ToString(includes='authority', includeNames=true, includePackage=false)
class Role implements Serializable {

	static mapWith = "mongo"

	ObjectId id
	String authority

	static constraints = {
		authority nullable: false, blank: false, unique: false
	}

	static mapping = {
	}
}
