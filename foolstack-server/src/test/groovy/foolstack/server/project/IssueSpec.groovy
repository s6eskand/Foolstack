package foolstack.server.project

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class IssueSpec extends Specification implements DomainUnitTest<Issue> {

    def setup() {
    }

    def cleanup() {
    }

    void "test something"() {
        expect:"fix me"
            true == false
    }
}
