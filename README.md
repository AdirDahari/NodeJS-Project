# Biz Card Business

NodeJS Project - build api with nodejs, express, mongodb

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Scripts](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Configuration](#configuration)
- [Extras](#extras)

## Getting Started

This project was build in visual studio code with javascript and typescript

### Prerequisites

Install nodejs to your local computer

### Installation & Scripts

Step-by-step instructions on how to install dependencies and set up the project.

```bash
# `Clone the repository`
git clone https://github.com/AdirDahari/HackerU-ShopApp-React.git

copy of the project

# `Install dependencies`
npm install

when we download the project for the first time we must execute npm i to install all dependencies

### `Run the project`
npm watch

Runs the app in the current mode (.env file) every change will automatic update the project, no need to stop the project and ran again
```

### Folder Structure

- **`/public`:** HTML files.
- **`/src`:** The root directory for source code.
  - **`/@type`:** Interfaces for typescript.
  - **`/config`:** Configured and run the project by the .env files.
  - **`/database`:** Data models and database schemas.
  - **`/error`:** Custom error handle extend from error.
  - **`/logs`:** Custom logger.
  - **`/middlewares`:** Middleware functions for handling requests before they reach the route handler.
  - **`/routes`:** Express route definitions, organized by resource or functionality.
  - **`/service`:** Utility functions.
  - **`/validation`:** Validate schema with Joi library.
  - **`index.ts`:** The main application file where the server is configured and initialized.

### Configuration

In config folder change NODE_ENV variable from dev, test and prod. in prod mode we use mondodb atlas

### Extras

- **`jwt`:** Response json with email only.
- **`Update user`:** Update user not included email, password and isBusiness.
- **`bonus`:** Admin can change bizNumber if the bizNumber is not already used.
