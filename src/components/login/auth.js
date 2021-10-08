import { useContext } from "react";
import { When } from "react-if";
import { LoginContext } from "../../context/user.context";

export default function Auth(props) {
    const loginContext = useContext(LoginContext);
    const capabilityCheck = loginContext.capabilityCheck(props.capability);
    return <When condition={loginContext.loggedIn && capabilityCheck}>{props.children}</When>;
    // return <>{props.children}</>;
}
