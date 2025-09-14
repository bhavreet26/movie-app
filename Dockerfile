#                        Stage 1’s job = prepare the static website files.

# Use official Node.js image for building
# AS is used to name the build stage 
FROM node:20-alpine AS build
WORKDIR /app

# Copying dependencies -- * means “if package-lock.json exists, copy it too.” --./ means "put them in the current folder"
COPY package.json package-lock.json* ./
# Install dependencies 
RUN npm install

# Copy all files from current directory to working directory in container
COPY . .
# Build the project
RUN npm run build

# Use official Nginx image to serve the build . this is used because nginx is good at serving static files
# alpine is a lightweight version of nginx image 
# static files are files that do not change like html, css, js files 
FROM nginx:alpine

# Copy the build output from the previous stage to the nginx html directory
# --from=build means copy from the build stage  
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world as nginx listens on port 80 by default
EXPOSE 80

# Start nginx when the container launches
# -g means global directive, daemon off means run in foreground so that container does not exit
CMD ["nginx", "-g", "daemon off;"]