# Svelte Game Server
- [Svelte Game Server](#svelte-game-server)
- [Quick Start](#quick-start)
  - [Step 1 - setup reverse proxy](#step-1---setup-reverse-proxy)
  - [Step 2 - download docker image](#step-2---download-docker-image)
  - [Step 3 - create .env file](#step-3---create-env-file)
  - [Step 4 - run docker image](#step-4---run-docker-image)
  - [Step 5 - add games to the server](#step-5---add-games-to-the-server)
- [Developing](#developing)
- [Building](#building)

# Quick Start

Prerequisites to run this project:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Nginx](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/) or [Caddy](https://caddyserver.com/docs/install)
- [Cloudflare R2 Bucket](https://developers.cloudflare.com/r2/)
- [Adsense Account](https://www.google.com/adsense/start/)

## Step 1 - setup reverse proxy

- [Nginx](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-reverse-proxy-on-ubuntu-22-04) or [Caddy](https://caddyserver.com/docs/quick-starts/reverse-proxy)

## Step 2 - download docker image

```bash
docker pull zaydalzein/svelte-game-server
```

## Step 3 - create .env file 
look at [.env.example](./.env.example) for an example


## Step 4 - run docker image
```bash
docker compose up -d
```

## Step 5 - add games to the server
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




