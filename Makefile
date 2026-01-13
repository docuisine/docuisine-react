.PHONY: patch
patch:
	@npm version patch -m "🏷️ release(patch): %s"

.PHONY: minor
minor:
	@npm version minor -m "🏷️ release(minor): %s"
.PHONY: major
major:
	@npm version major -m "🏷️ release(major): %s"