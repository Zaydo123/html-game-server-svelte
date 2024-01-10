
echo "Pulling from git..."
git pull

read -p "Enter the domain you're deploying to: " domain

echo "$domain {
    reverse_proxy svelte:app:3000 {
        header_down Strict-Transport-Security max-age=31536000;
        header_up X-Real-IP {remote}
    }
}" > Caddyfile

echo "Building..."
docker-compose up -d --build

echo "Done."