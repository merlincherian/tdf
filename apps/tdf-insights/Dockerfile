# Stage 1: Build the React app
FROM node:18-alpine AS build

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build

# Debugging: List contents of /app
RUN ls -l /app > /app_contents.txt

# Debugging: List contents of /app/dist
RUN ls -l /app/dist > /app_dist_contents.txt

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app_contents.txt /usr/share/nginx/html/app_contents.txt
COPY --from=build /app_dist_contents.txt /usr/share/nginx/html/dist_contents.txt

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]