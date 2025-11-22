# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port and start the server
ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
