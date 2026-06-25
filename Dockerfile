FROM node:22-slim

# Install ffmpeg
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Create necessary directories
RUN mkdir -p temp merged logs

EXPOSE 3000

CMD ["npm", "start"]
