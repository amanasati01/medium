import BlogsCard from '../Components/BlogsCard'
import AppBar from '../Components/AppBar'
import { useBlogs } from '../hooks'
function Blogs(){
  const {loading , blogs} =  useBlogs()
  if(loading){
    return (
      <>
      <div>Loading..</div>
      </>
    )
  }
    return(<>
         < AppBar/>
         <div className='flex justify-center'>
        <div className=' max-w-xl'> 
        {blogs.map((blog)=> 
            <BlogsCard 
            author={blog.author.name} 
            title={blog.title}
            content={blog.content}
          publishedDate='12 march 2024'/>
        )}
            {/* <BlogsCard 
                      author='Aman' 
                      title='How an ugly Single-Page Website Makes $5,000 a Month with Affilliate Marketing'
                    content='How an ugly Single-Page Website Makes $5,000 a Month with Affilliate Marketing How an ugly Single-Page Website Makes $5,000 a Month with Affilliate Marketing How an ugly Single-Page Website Makes $5,000 a Month with Affilliate Marketing'
                    publishedDate='12 march 2024'/> */}
        </div>
        </div>
    </>)
}
export default Blogs