# Static marketing site. Separate from the dashboard image on purpose: it ships
# no API client, no auth and no polling, so it can be cached hard at the edge.
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --spider -q http://127.0.0.1:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
