import { Quote } from "../Components/Quote"
import SignupInputs from "../Components/signupInputs"
import Signinputs from '../Components/SigninInputs'
function Signin(){
    return(
    <>
     <div className="w-screen h-screen grid grid-cols-2">
        <Signinputs type ="signin"/>
        <div className="invisible lg:visible ">
        <Quote />
        </div>
    </div>
    </>
    )
}
export default Signin