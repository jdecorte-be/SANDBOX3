import {SignUp} from "../components/SignUp";
import {SignIn} from "../components/SignIn";
import {Code2FA} from "../components/Code2FA";
import Nav from "../components/NavBar";
import Test from "../pages/Test";

const ConnectionPage = () => {
    return (
        <div>
            <SignUp/>
            <SignIn/>
            <Code2FA/>
            <Test/>
        </div>);
}

export default ConnectionPage;