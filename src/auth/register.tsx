import axios from "axios";
import { authenticationResponse, userCredentials } from "./auth.model";
import { useContext } from "react";
import AuthForm from "./authForm";
import { getClaims, saveToken } from "./handleJWT";
import { useHistory } from "react-router-dom";
import AuthenticationContext from "./authentificationContext";

export default function Register() {
    const {update} = useContext(AuthenticationContext);
    const history = useHistory();

    async function register(credentials: userCredentials) {
            const response = await axios.post<authenticationResponse>("https://localhost:7173/api/accounts/create", credentials);
            saveToken(response.data);
            update(getClaims());
            history.push('/hotels');
    }
    
    return (
        <>
            <h3>Register</h3>
            <AuthForm model={{email: '', password: ''}} onSubmit={async values => await register(values)} />
        </>
    )
}