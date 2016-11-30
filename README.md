# Webhooks API

Store Webhooks data and returns the latest records.

## Instructions

* Install all project dependencies: `$ npm install`

* To run this project: `$ npm start`

* To run this project with livereload: `$ npm run nodemon`

* To run the tests: `$ npm run test`

## Endpoints for API

* `GET /webhooks` - Index webhooks data.

* `GET /webhooks?limit=10&skip=5` - Index webhooks data with pagination.

* `POST /webhooks` - Store webhooks data.

* `DELETE /webhooks` - Delete all stored data.

## Configuration

* You can configure the port it starts on in `index.js`

* Currently it starts on PORT `8080`
