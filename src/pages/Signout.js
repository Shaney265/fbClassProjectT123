import { useContext, useEffect } from "react"
import { FBAuthContext } from "../contexts/FBAuthContext"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"


export function SignOut (props){
    const FBAuth = useContext (FBAuthContext)
    const navigate = useNavigate()

    const SignOutHandler = () => {
        signOut(FBAuth)
        .then( () => {
            //do sign out procedure
            navigate("/")
        })
        .catch ( (error) => {
            console.log (error.code, error.message)
        })
    }
        useEffect(() => SignOutHandler ())
    
    return (
        <div>
            <h1> Sign Out</h1>
        </div>
    )
}
// currently returns a signout heading but later we will add props