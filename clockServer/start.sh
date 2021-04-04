cd ./client/

npm run build
serve --listen 8081 ./dist/ & fg

cd ../server/

node main.js