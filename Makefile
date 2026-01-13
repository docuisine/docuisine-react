.PHONY: patch
patch:
	@npm version patch -m "🏷️ release: patch v%s"

.PHONY: minor
minor:
	@npm version minor -m "🏷️ release: minor v%s"

.PHONY: major
major:
	@npm version major -m "🏷️ release: major v%s"