build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker-compose up

###


build-production:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build

run-production:
	docker-compose up