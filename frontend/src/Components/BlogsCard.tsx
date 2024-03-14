interface BlogCardProp{
   author : string,
   title : string,
   content : string,
   publishedDate : string 
}
function BlogsCard({author, title,content,publishedDate}:BlogCardProp){
    return (
       <>
       <div className="p-4 border-b border-slate-200 pb-4">
       <div className="flex items-center">
           <div className="flex justify-center flex-col"> <Avatar name={author }/></div>
           <div className="font-extralight text-base mr-1">{author} </div> 
           <div className="flex justify-center items-center flex-col mt-1"><Circle /></div>
           
          <div className="  text-base font-thin font-slate-200">{publishedDate}</div>
        </div>
       <div className="font-bold text-xl mt-2">{title}</div>
       <div className="mt-2 font-normal">{content}</div>
       <div className=" text-base font-thin font-slate-200 mt-6">{`${Math.ceil(content.length)/100} min read`}</div>
       
       </div>
       </>
    )
}
function Circle(){
    return(
       <div className="bg-slate-400 rounded-full   w-1 h-1"></div>
    )
}
export function Avatar( {name,size=8,}:{name : string, size?:number}){
    return( 
    <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-3`}>
        <span className={`font-medium text-gray-600 dark:text-gray-300 `}>{name[0]}</span>
     </div>)
}
export default BlogsCard