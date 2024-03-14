import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt'
import { string } from "zod";
export const blogRouter = new Hono<{
  Bindings: {
	   	DATABASE_URL: string
        JWT_SECRET : string
	   },
     Variables : {
      userId : string
     }
  }>();
  blogRouter.use('/*', async (c, next) => {
    try {
      const authHeader = c.req.header('authorization') || '';
      console.log(authHeader); // This should show the complete header. Ensure it starts with 'Bearer '
      const token = authHeader.split(' ')[1]; // Split and take the token part
      const user = await verify(token, c.env.JWT_SECRET); // Verify using the extracted token
      console.log(user.id);
      if (user) {
        c.set("userId", user.id);
        return next();
      } else {
        c.status(403);
        return c.json({
          "message": "You are not logged in"
        });
      }
    } catch (error) {
      c.status(401);
      return c.json({ error}); // Ensure to return a meaningful error message
    }
  });
  
  blogRouter.post('/posts',async(c)=>{
    try {
      console.log('hi');
      
      const body = await c.req.json()
      const authorId = c.get("userId")
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
        const blog =  await prisma.post.create({
           data:{
            title : body.title,
            content : body.content,
            authorId : authorId
           }
         })
        return c.json({
          id : blog.id
        })
      
    } catch (error) {
      c.status(400);
      return c.json({
        message : error
      })
    }
   
  })
  blogRouter.put('/',async(c)=>{
    const body = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
     const blog =  await prisma.post.update({
      where :{
          id : body.id
      },
         data:{
          title : body.title,
          content : body.content,
          
         }
       })
       return c.json({
        id : blog.id
      })
  })
  blogRouter.get('api/v1/user/blog/:id',async(c)=>{
    const body = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
     const blog =  await prisma.post.findFirst({
        where :{
            id : body.id
           }
       })
      return c.json({
        blog
      })
  })

// Todo : Add pagination
  blogRouter.get('/bulk',async(c)=>{
    console.log('hi header ' + Headers);
    
    // const body = await c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
     const blog =  await prisma.post.findMany({
      select:{
        title : true,
        content : true,
        id : true,
        author :{
          select :{
            name  : true,
           }
      }
    }
    
    })
    console.log('hi blog ' + blog);
      return c.json({
        blog
      })
  })
  