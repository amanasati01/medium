import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput,signinInput} from '@amanasati09/common-medium'
export const userRouter =new Hono<{
	Bindings: {
		DATABASE_URL: string
        JWT_SECRET : string
	}
}>();   
userRouter.post('/signup',async(c)=>{
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
   const body = await c.req.json()
   
   const {success} = signupInput.safeParse(body);
   if(!success){
    c.status(411)
    return c.json({
      message : "Inputs are incorrect"
    })
   }
   const user = await prisma.user.create({
    data :{
      email : body.username,
      name : body.name,
      password : body.password 
    }
   })
   const token =await sign({id : user.id},c.env.JWT_SECRET)
   console.log(token);
   
   return c.json({
    jwt : token
   })
    
  } catch (error) {
    console.log(error);
    
  }
   
  })
  userRouter.post('/signin',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
   const body = await c.req.json()
   console.log('hi body',body);
   
   const {success} = signinInput.safeParse(body);
   if(!success){
    c.status(411)
    return c.json({
      message : "Inputs are incorrect"
    })
   }
   console.log('hi success',success);
   const user = await prisma.user.findFirst({
    where :{
      email : body.username,
      password : body.password 
    }
   })
   console.log('hi user',user);
   let token = ''
   if(user ){
    token  = await sign({id :user.id },c.env.JWT_SECRET)
    console.log(token);
    return c.json({
    jwt : token
   })
    }
   
    
  })