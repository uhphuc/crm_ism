import  { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
const Header = () => { 
    const { user, logout} = useAuth();

    return ( 
        <header className="header p-0 m-0 flex flex-col bg-gray-300"> 

        <h1 className="font-bold text-center">CUSTOMER RELATIONSHIP MANAGEMENT</h1> 

        <nav> 
            <ul className="flex flex-row justify-between px-5"> 
            <li>
                <Link to="/">Home</Link>    
            </li> 
            <li>
                <Link to="/signup">Register</Link>
            </li>
            { user ? (
                <li>
                    <button onClick={() => {
                        logout()
                        window.location.reload();
                    }} className="hover:bg-amber-300" >
                        Logout
                    </button>
                </li>
            ) : (
                <li>
                    <Link to="/login">Login</Link>
                </li>
            )}
            </ul> 
        </nav> 

        </header> 

    ); 

}

export default Header;