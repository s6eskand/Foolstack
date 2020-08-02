

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'foolstack.server.auth.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'foolstack.server.auth.UserRole'
grails.plugin.springsecurity.authority.className = 'foolstack.server.auth.Role'

grails.plugin.springsecurity.rest.token.storage.useGorm = true // since using gorm for token storage
grails.plugin.springsecurity.rest.token.generation.useSecureRandom = true
grails.plugin.springsecurity.rest.login.active = true
grails.plugin.springsecurity.rest.login.useJsonCredentials = true // can use json a request parameter
grails.plugin.springsecurity.rest.login.usernamePropertyName = 'username' // field of username parameter
grails.plugin.springsecurity.rest.login.passwordPropertyName = 'password' // field of pasword parameter
grails.plugin.springsecurity.rest.login.useRequestParamsCredential = true

grails.plugin.springsecurity.rest.token.storage.gorm.tokenDomainClassName ='foolstack.server.auth.AuthToken' // token class name with package
grails.plugin.springsecurity.rest.token.storage.gorm.tokenValuePropertyName = 'secretToken' // field name for token storage
grails.plugin.springsecurity.rest.token.storage.gorm.usernamePropertyName = 'loginName'
grails.plugin.springsecurity.rest.token.storage.gorm.expiration = true
grails.plugin.springsecurity.rest.logout.endpointUrl = '/auth/logout'
grails.plugin.springsecurity.rest.login.endpointUrl = '/auth/login'
grails.plugin.springsecurity.rest.login.failureStatusCode = 401

// token validate
grails.plugin.springsecurity.rest.token.validation.useBearerToken = true
grails.plugin.springsecurity.rest.token.validation.active = true
grails.plugin.springsecurity.rest.token.validation.endpointUrl = '/api/validate'

grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	[pattern: '/',               access: ['permitAll']],
	[pattern: '/error',          access: ['permitAll']],
	[pattern: '/index',          access: ['permitAll']],
	[pattern: '/index.gsp',      access: ['permitAll']],
	[pattern: '/shutdown',       access: ['permitAll']],
	[pattern: '/assets/**',      access: ['permitAll']],
	[pattern: '/**/js/**',       access: ['permitAll']],
	[pattern: '/**/css/**',      access: ['permitAll']],
	[pattern: '/**/images/**',   access: ['permitAll']],
	[pattern: '/**/favicon.ico', access: ['permitAll']]
]

grails.plugin.springsecurity.filterChain.chainMap = [
	[pattern: '/assets/**',      filters: 'none'],
	[pattern: '/**/js/**',       filters: 'none'],
	[pattern: '/**/css/**',      filters: 'none'],
	[pattern: '/**/images/**',   filters: 'none'],
	[pattern: '/**/favicon.ico', filters: 'none'],
	[pattern: '/**',             filters: 'JOINED_FILTERS']
]

