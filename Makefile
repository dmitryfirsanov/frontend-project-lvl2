install:
	npm ci

lint:
	npx eslint .
	
test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npm test -- --watch

publish:
	npm publish --dry-run
