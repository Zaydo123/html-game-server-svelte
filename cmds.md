

# install pm2
`npm i -g pm2`

# Install Caddy
`
apt install -y debian-keyring debian-archive-keyring apt-transport-https && \
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | apt-key add - && \
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee -a /etc/apt/sources.list.d/caddy-stable.list && \
apt update && \
apt install caddy && \
touch /home/Caddyfile
`