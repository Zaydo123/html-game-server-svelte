

# install pm2
`npm i -g pm2`

# Install Caddy
`
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
`

# Docker build
docker build  --env-file .env -t zaydalzein/svelte-game-server:1.01 --platform=linux/amd64 . 

`DOCKER_BUILDKIT=1 docker build -t zaydalzein/svelte-game-server:1.01 --platform=linux/amd64 .`


# Docker run 
`docker run -dp 3000:3000 \
--env-file ./.env \
zaydalzein/svetle-game-server:1.01`
`
