
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/arturbacilla/nextjs-todolist/blob/master/README.md)
# Nest.JS - Todo List

![demo screenshot](/screenshot.png)

This project involves the creation of a task management system with a back-end developed in NestJS and a front-end in React. On the back-end, we set up a NestJS server, established a PostgreSQL database, and implemented data models to represent tasks. Additionally, we created RESTful endpoints with JWT authentication for task creation, listing, updating, and deletion actions. On the front-end, we developed an intuitive user interface that displays and allows task editing, including user authentication. We faced additional challenges such as creating Dockerfiles and a docker-compose.yml file to orchestrate containers, adding task tagging features, and implementing tests to ensure code quality. We are open to questions and feedback to further improve the project.

## Authors

- [@arturbacilla](https://www.github.com/arturbacilla)

## Running locally

#### Necessary Dependencies:

**Yarn (classic):** @1.22.19

**docker-engine:** + compose

**node**: >=18.18.2

Clone the project

```bash
  git clone git@github.com:arturbacilla/nestjs-todolist.git
```

Go to the project directory

```bash
  cd ./nest-todo

```
#### Executing:

<details open>
<summary>
 <picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black">
  <img alt="Linux" src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black">
</picture>
or
 <picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/apple-000000?style=for-the-badge&logo=apple&logoColor=white">
  <img alt="Apple" src="https://img.shields.io/badge/apple-ffffff?style=for-the-badge&logo=apple&logoColor=black">
</picture>
</summary>
For Linux users (tested with ZSH and BASH) or Mac users (untested), run the following command in the project's root directory and follow the instructions:

```bash
  ./nest-todo
```
 Sometimes is necessary to change script permissions. If needed:

 ```bash
  sudo chmod +x ./nest-todo
```
</details>

<details>
<summary>
 <picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/windows-0078D4?style=for-the-badge&logo=windows10&logoColor=white">
  <img alt="Windows" src="https://img.shields.io/badge/windows-0078D4?style=for-the-badge&logo=windows10&logoColor=white">
</picture>
</summary>
*I don't use Windows so instructions below may be wrong.*

If you are a Windows user and use Git Bash or any standard UNIX-like terminal, follow the Linux/Mac instructions.

Otherwise, you need to have the docker compose command installed and update the environment variables as follows:

#### Variáveis de ambiente

Rename the file `.env.example` on root directory to `.env` and add the following environment variables (as example):

`POSTGRES_PASSWORD=somepassword`
`POSTGRES_USER=postgres`
`PGUSER=postgres`
`POSTGRES_DB=nest-todo_db`

Besides that, 
Rename the file `./app/backend/.env.example` to `./app/backend/.env` and add the follwing environment variables using previous as reference

`DATABASE_URL=postgresql://<$POSTGRES_USER>:<$POSTGRES_PASSWORD>@db:5432/ <$POSTGRES_DB>?schema=public`

Following the example above, it should be:
`DATABASE_URL=postgresql://postgres:somepassword@db:5432/nest-todo_db?schema=public`

`JWT_SECRET=somesecretJWT`

You need also install dependencies with `yarn install` in both frontend and backend folders.

and lastly, run the following on project root:
`docker compose up`
</details>


## Stacks

<!-- Ícones tech: https://shields.io/  https://simpleicons.org/ -->

**Languages:**  
 <picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Typescript" src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
</picture>

**Frontend:** 
 <picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img alt="React" src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
</picture>

**Backend:** 
 <picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
</picture>

 <picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/NestJS-ffffff?style=for-the-badge&logo=nestjs&logoColor=E0234E">
  <img alt="NestJS" src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=black">
</picture>

 <picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
  <img alt="Prisma" src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white">
</picture>

**Database:** 
 <picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/postgre-4169E1?style=for-the-badge&logo=postgresql&logoColor=black">
  <img alt="Postgre" src="https://img.shields.io/badge/postgre-4169E1?style=for-the-badge&logo=postgresql&logoColor=black">
</picture>

**Other:** 
<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
  <img alt="Docker" src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=black">
</picture>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/jwt-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
  <img alt="JWT" src="https://img.shields.io/badge/jwt-ffffff?style=for-the-badge&logo=jsonwebtokens&logoColor=black">
</picture>


## Feedback

If you have any feedback (always very welcome!), visit my profile and get in touch. I will respond as soon as possible! Thank you.

