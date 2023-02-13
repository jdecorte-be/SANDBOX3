import {SignUp} from "../components/SignUp";
import {SignIn} from "../components/SignIn";
import {Code2FA} from "../components/Code2FA";
import Nav from "../components/NavBar";

const ConnectionPage = () => {
    return (
        <div>
            <SignUp/>
            <SignIn/>
            <Code2FA/>
        </div>);
}

export default ConnectionPage;