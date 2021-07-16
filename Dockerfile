FROM node
WORKDIR /usr/app
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production (GOOGLE THIS)
# RUN npm install --production (I ADDED THIS BUT NOT CHECKED IF IT WORKS OR NOT)

# Bundle app source
COPY . .

# The port our app is gonna use
EXPOSE 8080 
CMD [ "node", "server.js" ]
