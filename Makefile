# Runs the development environment
# 	Usage: make dev | dev-down
#   This will stop any running containers, 
#   build the Docker images, start the containers in detached mode, 
#   and run the development server.
.PHONY: dev dev-down
dev:
	@docker compose down
	@docker compose up --build -d
	@npm run dev
dev-down:
	@docker compose down

# Bump version
# 	Usage: make patch | minor | major
#   This will bump the version in package.json 
#	and create a git commit with the appropriate message
# 	and tag.
.PHONY: patch minor major
patch:
	@npm version patch --no-git-tag-version
	@VERSION=$$(node -p "require('./package.json').version") && \
	git commit -am "🏷️ release (patch): $$VERSION" && \
	git tag -a "$$VERSION" -m "Release $$VERSION"

minor:
	@npm version minor --no-git-tag-version
	@VERSION=$$(node -p "require('./package.json').version") && \
	git commit -am "🏷️ release (minor): $$VERSION" && \
	git tag -a "$$VERSION" -m "Release $$VERSION"

major:
	@npm version major --no-git-tag-version
	@VERSION=$$(node -p "require('./package.json').version") && \
	git commit -am "🏷️ release (major): $$VERSION" && \
	git tag -a "$$VERSION" -m "Release $$VERSION"

# Push tag to origin
.PHONY: tag
tag:
	@VERSION=$$(node -p "require('./package.json').version") && \
	git push origin $$VERSION
