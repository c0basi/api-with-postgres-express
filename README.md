# Storefront Backend Project summary

Imagine that you are a web developer at a small company. The company stakeholders have decided they want to set up an online store to make their great product ideas available for purchase -- and they want you and your co-worker to build it.

The stakeholders have put together a list of requirements for this online store. Your co-worker will be building the frontend and you will be supplying the JavaScript API. The requirements have been collected into requirements document.

Your job is to architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.

Your application needs to be ready for beta tests, so it needs to have tests, keep user information secure, and provide user authentication tokens that are ready to integrate with the frontend.

## Getting Started

Use npm install to start this project
## Required Technologies
The application makes use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1.  DB Creation and Migrations


 Any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models
 The models are cretaed for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. These models all have test suites and mocks.

### 4. Express Handlers
 Endpoints have tests and be CORS enabled. 

### 5. JWTs
 JWT functionality is enabled .

