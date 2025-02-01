# Step 1: Use the official Node.js image as the base
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the React application
RUN npm run build

# Step 7: Use the official Nginx image to serve the app
FROM nginx:alpine

# Step 8: Copy the built React app to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Step 8: Remove the default nginx.conf and copy your custom nginx.conf
#RUN rm /etc/nginx/nginx.conf
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Add an entrypoint script to inject environment variables
COPY ./entrypoint.sh /docker-entrypoint.d/

# Make the entrypoint script executable
RUN chmod +x /docker-entrypoint.d/entrypoint.sh

# Step 9: Expose port 80 to make the app accessible
EXPOSE 80

# Step 10: Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]
