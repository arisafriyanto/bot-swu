FROM node:slim AS app

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy your application files into the container
COPY package.json package-lock.json ./

RUN npm install

ENV process.env.PUPPETEER_EXECUTABLE_PATH = '/usr/bin/google-chrome';

# Copy the rest of your application files
COPY . .

# Expose the port your application runs on
EXPOSE 8080

# Start your Node.js application
CMD ["node", "app.js"]