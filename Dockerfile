FROM node:22



WORKDIR /app


COPY . .

RUN npm install
RUN npx prisma generate 



EXPOSE 3000
 
CMD [ "npx" , "tsx" , "./src/index.ts" ]