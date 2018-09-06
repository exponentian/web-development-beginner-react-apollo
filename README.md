# Beginner's Guide to Web Development
## Example: College
### Technologies: Node.js, React, GraphQL, Apollo and MongoDB
#### Author: Ho Seok (Brandon) Oh


#### Objectives
- Understanding of React, GraphQL and Apollo
- Relationship between two models
- Implimenting basic four [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) operations
- Data model schema design for server side
- Communicating data between backend and frontend


This tutorial consists of two parts: 
- **Part One:** [Server-side with Node.js, Express, GraphQL and MongoDB](https://github.com/exponentian/web-development-beginner-node-express-graphql)
- **Part Two:** [Frontend with React and Apollo](https://github.com/exponentian/web-development-beginner-react-apollo)


Target audiences:
- Beginners of web development
- People who want to learn Node.js, React, GraphQL, Apollo and MongoDB


## Overview of College

> This is a simple toy example for learining GraphQL and Apollo. There are two models such as **Professor** and **Course**. Threre are important keywords: **query**, **resolve**, **type**, and **mutation**, so a folder structure of schema is divided by four parts. There are basic CRUD operations such as get, add, update and remove for each model.


A professor has information:
- Name
- Professor Number
- Department
- Position
- Courses

Also, a course has information:
- Name
- Course Code
- Description
- Professor


#### Must be installed
- [Node.js](https://nodejs.org/en/download/)
- [NPM](https://docs.npmjs.com/cli/install)
- [MongoDB](https://docs.mongodb.com/manual/installation/)


#### To start

1. Download or clone

```
$ git clone https://github.com/exponentian/web-development-beginner-node-express-graphql.git
```

2. Install npm packages

```
$ npm install
```

3. Add your MONGODB URI in ./src/config.js

4. Start

```
$ npm start
```


Happy coding!