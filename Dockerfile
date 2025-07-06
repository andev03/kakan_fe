# Stage 1: Build React với Vite
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

COPY . .

RUN echo "BACKEND_URL=$BACKEND_URL" > .env && npm run build

# Stage 2: Chạy Nginx để serve static files
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]