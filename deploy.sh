echo "Pulling from git..."
git pull

read -p "Enter the domains you're deploying to (separated by commas): " domains

IFS=',' read -ra domain_array <<< "$domains"

for domain in "${domain_array[@]}"; do
    echo "$domain {
        reverse_proxy svelte-app:3000 {
            header_down Strict-Transport-Security max-age=31536000;
            header_up X-Real-IP {remote}
        }
    }" >> Caddyfile
done

echo "Building..."
docker compose up -d --build

echo "Done."