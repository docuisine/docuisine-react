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
.PHONY: patch minor major
patch:
	@npm version patch -m "🏷️ release (patch): %s"
minor:
	@npm version minor -m "🏷️ release (minor): %s"
major:
	@npm version major -m "🏷️ release (major): %s"