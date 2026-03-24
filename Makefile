.PHONY: dev build preview lint test check review clean install size audit e2e assets

# Development
dev:                ## Start dev server
	npm run dev

install:            ## Install dependencies
	npm ci

# Quality
lint:               ## Type-check with tsc
	npm run lint

test:               ## Run tests once
	npm run test

test-watch:         ## Run tests in watch mode
	npm run test:watch

check:              ## Lint + test + build (CI gate)
	npm run check

# Review
review:             ## Full review: check + audit + bundle size
	npm run review

audit:              ## Dependency audit (production only)
	npm run audit:deps

size:               ## Show bundle sizes
	npm run size

# E2E & Ship Gate
e2e:                ## Run Playwright e2e tests (builds first)
	npm run e2e

assets:             ## Regenerate image assets (icons, OG image)
	npm run generate:assets

# Build & Deploy
build:              ## Production build
	npm run build

preview:            ## Preview production build locally
	npm run preview

clean:              ## Remove build artifacts
	rm -rf dist node_modules/.tmp

# Help
help:               ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
