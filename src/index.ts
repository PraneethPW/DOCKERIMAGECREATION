import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'
import express from 'express'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })


const app=express();
const port = 3000;
app.use(express.json())

app.get("/" , async (req , res)=>{
    const email = await req.body.email


        await prisma.user.findFirst({
            where : {
                email 
            }
        })

        res.json({
            message : `DATA FETCHED WITH EMAIL ${email}`
        })
})

app.post("/insert" , async (req , res)=>{
    

    const email = await req.body.email ; 
    const password = await req.body.password;

 const user_id =  await  prisma.user.create({
        data:{
            email , 
            password 
        } , select:{
            id : true 
        }
    })

  res.json({
      user_id
  })
})

app.listen(port)
console.log(`LISTINING ON PORT ${port}`)


