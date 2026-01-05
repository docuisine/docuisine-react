FROM node:18-alpine

WORKDIR /app

COPY index.html .
COPY src ./src
COPY public ./public
COPY vite.config.ts .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY package.json .
COPY package-lock.json .
COPY README.md .

# Make environment variables be defined at runtime (dependency injection)
# Passing in these variables are required to run it, otherwise build process will be a success
# the app will crash
#   -e APP_VERSION=dev \
#   -e BACKEND_URL=https://docuisine.vercel.app \
#   -e IMAGE_HOST=https://pub-d3ef28b83a854575bfa54225e768a452.r2.dev \
RUN apk add --no-cache gettext
COPY env.js .
COPY entrypoint.sh .

RUN npm install
RUN npm i -g serve

RUN npm run build

RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["serve", "-s", "dist"]
