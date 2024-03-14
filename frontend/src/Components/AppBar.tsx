import { Avatar } from "./BlogsCard"
function AppBar(){
    return(
        <>
        <div className="border-b flex items-center justify-between px-10">
           <div>Medium</div>
           <div>
           <Avatar  size={8} name="Aman asati" />
           </div>
        </div>
        
        </>
    )
}
export default AppBar