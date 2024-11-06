# Stage 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all application files and build the app
COPY . .
RUN npm run build --prod

# Stage 2: Serve the Angular app using NGINX
FROM nginx:alpine

# Copy the Angular build output to NGINX's html directory
COPY --from=build /app/dist/user-todo-app/browser /usr/share/nginx/html

# Expose port 80 for serving the application
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
