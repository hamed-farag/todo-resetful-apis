FROM postgres:latest

# Set environment variables
ENV POSTGRES_DB=todo
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=123456789


# Installs Node.js image
FROM node:alpine as base

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /app

# Copies package.json, pnpm-lock.yaml, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "pnpm-lock.yaml", "tsconfig.json", ".env", "./"]

# Copies everything in the src directory to WORKDIR/src
COPY . .

# Installs all packages
RUN npm install -g pnpm
RUN pnpm install

# Build the application
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3000

# Expose the PostgreSQL port
EXPOSE 5432

# Runs the dev npm script to build & start the server
CMD ["sh", "-c", "pnpm prisma:generate && pnpm prisma:deploy && pnpm start"]
