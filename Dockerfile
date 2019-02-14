# Step 1 : Builder image
FROM node:10-alpine AS builder

# Create app user
RUN addgroup -S app && adduser -S -G app -s /bin/false app
ENV HOME=/home/app

# Create app directory
COPY --chown=app:app package.json $HOME/node/

# Install app dependencies
USER app
WORKDIR $HOME/node
RUN npm install yarn && rm package-lock.json && yarn install

# Bundle app source
USER root
COPY --chown=app:app . $HOME/node/

USER app
RUN npm run build

# Step 2 : Run image
FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx

# Copy of build directory
COPY --from=builder /home/app/node/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
