# Introduction

This page dicusses how to contribute on the frontend component of Docuisine. We write using JavaScript with the [ReactJS](https://react.dev/) framework due to its mature ecosystem and is familiar to many developers.

The frontend is written in JavaScript (TypeScript) using ReactJS. We use [shadcn](https://ui.shadcn.com/) for the UI components and [TailwindCSS](https://tailwindcss.com/) for CSS. We use Node.js for running JavaScript and [Vite](https://vite.dev/) for project bootstrapping, building and running a development server.

# Getting Started

> [!IMPORTANT]
> Installing [git](https://git-scm.com/install/) and [npm](https://github.com/npm/cli?tab=readme-ov-file#installation) are essential requirements to work with this project.

The project is in this [repository](https://github.com/docuisine/docuisine-react).

1. Clone that repo using your favorite terminal
```bash
git clone https://github.com/docuisine/docuisine-react
```

2. Enter the project directory and open it using your IDE or simply use a text editor.
```bash
cd docuisine-react
code .                  # Example: Using Visual Studio Code
```

3. Install dependencies with npm
```bash
npm i
```

4. Setup environment variables by duplicating `.env.example` and rename it to `.env`.
```bash
cp .env.example .env
```
Make sure edit the variables to your liking, and they must match together. For example, `S3_ENDPOINT_URL=http://s3:9000` must match `S3_PORT=9000`.

`VITE_BACKEND_URL` - This is where we access the backend. `VITE_IMAGE_HOST` - This the S3 bucket and images are stored. `VITE_APP_VERSION` - Optional, but is used to display the version hash on production, we do not set this manually on production.

Now you are ready to write code.

## Development Process

When writing code, you should run a development server, so you have direct feedback from your changes.
```bash
npm run dev
```

When you run that command, it should look like this.
```bash
❯ npm run dev

> docuisine-react@0.0.0 dev
> vite


  VITE v7.3.0  ready in 379 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

This means that you can now access the frontend on http://localhost:5173/.
