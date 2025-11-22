# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client and run migrations
RUN npx prisma generate
RUN npx prisma migrate deploy --schema=prisma/schema.prisma

# Expose port and start the server
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
