#!/bin/sh

# Replace placeholders in nginx.conf.template
envsubst '$REACT_APP_API_URL' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Step 1: Generate runtime environment variables
cat <<EOF > /usr/share/nginx/html/config.json
{
  "REACT_APP_API_URL": "${REACT_APP_API_URL}",
  "REACT_APP_API_GATEWAY_URL": "${REACT_APP_API_GATEWAY_URL}"
}
EOF

# Step 2: Continue with Nginx startup
exec "$@"
