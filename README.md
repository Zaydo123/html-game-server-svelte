# Svelte Game Server
- [Svelte Game Server](#svelte-game-server)
- [Quick Start](#quick-start)
  - [Step 1 - Create MariaDB Database and Make Tables](#step-1---create-mariadb-database-and-make-tables)
  - [Step 2 - Clone Repo](#step-2---clone-repo)
  - [Step 3 - Create .env File](#step-3---create-env-file)
  - [Step 4 - Run Deploy Script](#step-4---run-deploy-script)
  - [Step 5 - Add Games To The Server](#step-5---add-games-to-the-server)
- [Developing](#developing)
- [Building](#building)

# Quick Start

Prerequisites to run this project:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Cloudflare R2 Bucket](https://developers.cloudflare.com/r2/)
- [Adsense Account](https://www.google.com/adsense/start/)
- [MariaDB Database](https://mariadb.org/download/)
- [Domain Name Pointing To Your Server](https://www.namecheap.com/support/knowledgebase/article.aspx/319/2237/how-can-i-set-up-an-a-address-record-for-my-domain)

## Step 1 - Create MariaDB Database and Make Tables
- [Create DB](./DB.md)

## Step 2 - Clone Repo
```bash
docker pull zaydalzein/svelte-game-server
```

## Step 3 - Create .env File 
look at [.env.example](./.env.example) for an example

## Step 4 - Run Deploy Script
```bash
chmod +x deploy.sh
./deploy.sh
```

## Step 5 - Add Games To The Server
- [localhost:3000/admin](http://localhost:3000/admin)
- Click on the "+" button to add a new game and fill in the details


# Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

# Building

To create a production version of your app (without docker):

```bash
npm run build
```

With docker build:
```bash
docker build -t zaydalzein/svelte-game-server --platform=linux/amd64 .
```

Run with docker-compose (recommended):
```bash
docker-compose up -d --build
```



