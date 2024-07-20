import express, { json } from "express"
import { createClient } from "redis"


const app = express()
app.use(express.json())



const client = createClient()
client.on("error",(err)=>console.log(err))


app.post("/submit",async(req,res)=>{
    const data  = req.body;


    try {
        await client.lPush("data",JSON.stringify(data))
        res.status(200).json({msg:"data stored."})
    } catch (error) {
        console.error("redis error", error);
        res.status(500).json({msg:"failed to store data."})
        
    }
})


const startServer = (async()=>{
    try {
        await client.connect()
        console.log("connected to redis!");

        app.listen(3000,()=>console.log("listening on port 3000."))
        
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
})();

