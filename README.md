# About the task

Demonstrate your knowledge of web app development through a take-home or paired development task (whichever works best for your time needs).

We're looking for evidence of critical and creative thinking as well as general aptitude for development.

Before you start, you should have Node/NPM and a text editor/IDE set up on your machine (RAD Team mostly uses VSCode).

## The task

Adapt this boilerplate repo to match the final designs and functionality described in the [Figma design file](https://www.figma.com/file/kzGQYkYd9TzA23Iq7PDgzj/Pokedex-Frontend-task?type=design&node-id=0-1&mode=design&t=uucQrf9a4YuCQUkz-0).

The boilerplate is set up with a similar stack to how RAD works on web projects currently, so we'd love to see how you use these tools. However, if you think you can demonstrate your ability better by using a different stack, feel free to start fresh.
This boilerplate consists of:

- NextJS
- Typescript
- ESLint Prettier config
- Tailwind CSS Framework
- Header + Background styling
- Basic typography setup
- Pokemon API proxied through a NextJS API route at `/api/pokemon?page={number}`
- First page of Pokemon preloaded on index page with `getStaticProps`

To run the local development server, open a terminal and `cd` to this folder, then run the following command

```
npm install && npm run dev
```

This should set up a dev server with hot reload at `http://localhost:3000`

## What you can do with this repo

This repo includes a solid base to build the app from, but it still has some incomplete parts. Choose one (or a couple) of tasks from the table below to show what you can do.
These tasks are generally marked with a `TODO` comment in the code.

| #   | Task Details                                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------------------ |
|     | **Front End**                                                                                                      |
| 1   | Set up "infinite scroll" pagination on the index page                                                              |
| 2   | When a Pokemon is clicked, add or remove them from the party. (Party Pokemon appear in the sidebar and party page) |
| 3   | Implement the Pokemon card styling from the Figma designs                                                          |
| 4   | Implement styling of the party page as per Figma designs                                                           |
|     | **Dependent Tasks**                                                                                                |
|     | These tasks depend on having completed one or more of the previous tasks above                                     |
| 1   | Set and save party Pokemon nicknames                                                                               |
| 2   | Persist party contents through a page reload                                                                       |
| 3   | Show the number of Pokemon that have been loaded below the Pokemon grid                                            |
| 4   | Keep track of the number of times a Pokemon has been added to a party in an external database                      |

### Notes

- Feel free to extend the task by adding your own features
- While it's not necessary, making a public repository and/or deploying this app online may earn you bonus points.
