FROM arm32v7/node:10.15

RUN apt-get update && apt-get install -y arp-scan

WORKDIR /app

COPY package.json package.json
RUN npm install --production

COPY docker/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

COPY src/ src/
COPY *.js ./

EXPOSE 3000
CMD ["node", "server.js" ]
ENTRYPOINT ["/app/entrypoint.sh"]
