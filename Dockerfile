FROM node:22-alpine AS base
WORKDIR /app
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

FROM base AS dev
COPY frontend ./frontend
EXPOSE 5173
CMD ["npm", "run", "dev", "--prefix", "frontend", "--", "--host", "0.0.0.0"]

FROM base AS build
COPY frontend ./frontend
RUN cd frontend && npm run build

FROM nginx:alpine AS prod
COPY --from=build /app/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
