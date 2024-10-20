#frontend/Dockerfile

# use official node image to build
FROM node:18 AS build

# set the working directory in the container
WORKDIR /app

#Copy package.json and package files
COPY package.json ./

#Install dependencies node_modules
RUN npm Install

# copy entire code to container
COPY . .

#build the vite applciation
RUN app install vite -g

#Create Build
RUN npm run build

#use an official Nginx image to serve the frontend
FROM nginx:1.25-alpine

#copy the build files from stage to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ['nginx', '-g', 'daemon off;']