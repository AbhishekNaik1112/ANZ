# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./

# Update npm and install dependencies
RUN npm install -g npm@latest && \
    npm cache clean --force && \
    npm ci --legacy-peer-deps --prefer-offline

COPY . .
RUN npm run build

# Production stage 
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
