import {SignUp} from "../components/SignUp";
import {SignIn} from "../components/SignIn";
import {Code2FA} from "../components/Code2FA";

const HomePage = () => {
    return (
        <div>
            <SignUp />
            <SignIn />
            <Code2FA />
        </div>);
}

export default HomePage;