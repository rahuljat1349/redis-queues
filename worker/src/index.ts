import { createClient } from "redis";


const client = createClient()

const processData = async (data:any)=>{
    console.log("data: " , data);
    
console.log("processing data...");

await new Promise(resolve=> setTimeout(resolve,2000))
console.log("finished process!");

}

const startWorker = (async()=>{
    try {
    await client.connect()
    console.log("worker conected to redis!");




    while(true){
        try {
            const data = await client.brPop("data",0)
            
            await processData(data)

        } catch (error) {
            console.error("error processing data",error);
            
        }
    }
    } catch (error) {
        console.error("failed to connect to redis",error);
        
    }
    
})()