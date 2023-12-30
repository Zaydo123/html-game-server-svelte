# Svelte Game Server
- [Svelte Game Server](#svelte-game-server)
- [Quick Start](#quick-start)
  - [Step 1 - Setup Reverse Proxy](#step-1---setup-reverse-proxy)
  - [Step 2 - Create DB Tables (use sql client of your choice)](#step-2---create-db-tables-use-sql-client-of-your-choice)
  - [Step 3 - Download Docker Image](#step-3---download-docker-image)
  - [Step 4 - Create .env File](#step-4---create-env-file)
  - [Step 5 - Run Docker Container](#step-5---run-docker-container)
  - [Step 6 - Add Games To The Server](#step-6---add-games-to-the-server)
- [Developing](#developing)
- [Building](#building)

# Quick Start

Prerequisites to run this project:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/) or [Caddy](https://caddyserver.com/docs/install)
- [Cloudflare R2 Bucket](https://developers.cloudflare.com/r2/)
- [Adsense Account](https://www.google.com/adsense/start/)
- [MariaDB Database](https://mariadb.org/download/)
  

## Step 1 - Setup Reverse Proxy

- [Nginx](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-reverse-proxy-on-ubuntu-22-04) or [Caddy](https://caddyserver.com/docs/quick-starts/reverse-proxy)

## Step 2 - Create DB Tables (use sql client of your choice)
- [Create DB](./DB.md)

## Step 3 - Download Docker Image

```bash
docker pull zaydalzein/svelte-game-server
```

## Step 4 - Create .env File 
look at [.env.example](./.env.example) for an example


## Step 5 - Run Docker Container
```bash
docker compose up -d
```

## Step 6 - Add Games To The Server
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

With docker (recommended):
```bash
docker build -t zaydalzein/svelte-game-server --platform=linux/amd64 .
```




