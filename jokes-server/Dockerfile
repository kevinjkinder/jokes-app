FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Run seeder first, then start the server
CMD sh -c "node dist/src/seeders/jokeSeeder.js && node dist/index.js"