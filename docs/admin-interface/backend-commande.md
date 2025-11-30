cd backend
npm init -y

# Installation dépendances
npm install express cors helmet dotenv
npm install pg pg-hstore prisma
npm install redis ioredis
npm install jsonwebtoken bcryptjs
npm install joi express-validator
npm install winston
npm install socket.io

# Dev dependencies
npm install --save-dev nodemon
npm install --save-dev eslint @eslint/js
npm install --save-dev prettier eslint-config-prettier
npm install --save-dev jest supertest
npm install --save-dev @types/node @types/express

