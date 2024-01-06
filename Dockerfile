# Installs Node.js image
FROM node:20-alpine3.18

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app

# Copies package.json, pnpm-lock.yaml, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "pnpm-lock.yaml", "tsconfig.json", ".env", "./"]

# Copies everything in the src directory to WORKDIR/src
COPY ./src ./src

# Installs all packages
RUN npm install -g pnpm
RUN pnpm install

# Runs the dev npm script to build & start the server
CMD pnpm run dev