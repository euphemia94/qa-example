# Coding Interview Exercise
## Overview

Welcome to our coding interview exercise! This task is designed to evaluate your ability to understand and navigate an existing project, use the tools within it, and deliver quality code. It's representative of the day-to-day tasks we work on at Nexits.

## Evaluation Criteria

Your performance will be evaluated based on:
1. The tasks you manage to deliver
2. The quality and manner of delivery
3. Your ability to test and debug errors
4. Your knowledge of the frameworks and tools used

We will dig into the details, so make sure your work is thorough and well-thought-out.

> [!NOTE] 
> 
> About the use of AI tools:
>
> You are allowed to use AI tools during this exercise. However, please be aware that if we detect accepted prompts that were not well evaluated by you, it will be considered a disqualifying factor. Use AI responsibly and ensure you understand and can explain any code you submit.

## Tasks

The exercise repository is similar to the architecture we use internally at Nexits. We deal extensively with tables and aim to deliver the best possible experience to our users. This exercise reflects that spirit. You'll 
have to understand the existing codebase, and consult the documentation of the tools used to complete the tasks.

### Main Task

1. Add a new page `/posts` that displays a Post table.
2. The Post table should show the following columns:
   - Title
   - Status
   - Creation date
   - Author name
   - Number of comments
3. Implement filtering and sorting functionality for all columns.
4. Figure out how to add the posts schema and generate seed data.
5. Ensure that the new Post table maintains the same functionality as the existing Tasks table.

### Extra Tasks (Optional)

These tasks are not required but will give you an edge against other candidates:

1. Make the data table interface more abstract and use tRPC server calls instead.
2. There are some hidden errors and bad practices within the code. Can you find and fix them?

## How to Submit

1. Clone (do not fork) the project.
2. Push your copy to your GitHub account.
3. Make the changes and open Pull Requests (PRs). Do not merge them yet!
   - You can use a stacked PRs approach to split tasks if you prefer.
4. Once you're ready, email us the link to your PRs as a response to the email you received containing this exercise.
5. Make sure the repository is not set to private.

Good luck, and we look forward to reviewing your work!

## How to Run

> [!Note]
> System Wide Dependencies:
>
> Make sure you have node lts (v20.16.0) installed on your machine. We are using pnpm as the package manager. If you don't have it installed, you can install it by running `npm install -g pnpm` (sudo may be required).
> You also need to have docker and docker-compose installed on your machine to run the database locally.

1. Clone the repo

```bash
git clone
```

2. Change directory and install dependencies (Do not worry about the deprecation warning, some packages are in beta and will be updated soon)

```bash
pnpm install
```

3. Copy the `.env.example` file to `.env`

```bash
cp .env.example .env
```

4. Build the project (required to build workspace dependencies)

```bash
pnpm build
```

5. Start the local database

```bash
docker-compose up -d
```

6. Push the schema to the database

```bash
pnpm db:push
```

7. Seed the database

```bash
pnpm db:seed
```

You can now explore the db using `pnpm db:studio` or any other database client of you choice.

8. Start the project

```bash
pnpm dev
```

### Having problems?

1. Make sure you have run `pnpm build` before starting the project.
2. Try restarting the typescript and eslint servers
3. Clean workspace and reinstall dependencies
```bash
pnpm clean:workspaces
pnpm install
```