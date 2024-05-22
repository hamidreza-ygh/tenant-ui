#!/bin/sh

# Replace the placeholder in the config.js with the actual environment variable
sed -i "s|%%VUE_APP_USER_API_URL%%|${VUE_APP_USER_API_URL}|g" /usr/share/nginx/html/config.js
sed -i "s|%%VUE_APP_TENANT_PROVISION_URL%%|${VUE_APP_TENANT_PROVISION_URL}|g" /usr/share/nginx/html/config.js
sed -i "s|%%VUE_APP_GH_TOKEN%%|${VUE_APP_GH_TOKEN}|g" /usr/share/nginx/html/config.js
sed -i "s|%%VUE_APP_CLUSTER_ENDPOINT%%|${VUE_APP_CLUSTER_ENDPOINT}|g" /usr/share/nginx/html/config.js
# Start the nginx server
nginx -g 'daemon off;'
