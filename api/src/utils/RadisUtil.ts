import chalk from "chalk";
import { createClient } from "redis"

export default class RadisUtil{
    private static radisUrl=process.env.REDIS_URL
    private static    client= createClient({
            url:this.radisUrl
        })
    static{
      this.client.on("error",(err)=>{
        console.log(err); 
      })

      this.client.connect().then((res)=>{
        console.log(chalk.green("redis connected"),res);
      }).catch(err=>console.log(chalk.red("Redis connection failed!"),err))
    }

    static async blacklistToken(token:string,exp:number):Promise<void>{
        await this.client.set(`blacklist:${token}`,'true',{EX:exp})
    }

    static  async isTokenBlacklisted(token:string|null):Promise<boolean>{
      if(!token){
        throw new Error("token not found!")
      }
        const result =await this.client.get(`blacklist:${token}`)
        return result==='true'
    }

    static async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.disconnect();
      console.log(chalk.yellow("⚠️ Redis disconnected"));
    }
  }
}