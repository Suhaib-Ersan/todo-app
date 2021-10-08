import { useContext, useState } from "react";
import { Checkbox, FormControlLabel, Card, TextField, Modal, Tabs, Tab, Button } from "@mui/material";
import { LoginContext } from "../../context/user.context";
import { When } from "react-if";

import "./login.scss";

export default function Login(props) {
    const userContext = useContext(LoginContext);

    // For the login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // For The signup
    const [signUpUserInfo, setSignUpUserInfo] = useState({});

    const [showSignIn, setShowSignIn] = useState(false);

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        userContext.serverHandleSignin(event.target.username.value, event.target.password.value);
        props.modalHandleClose();
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();
        userContext.serverHandleSignup(event.target.username.value, event.target.password.value, event.target.email.value, event.target.role.value);
        props.modalHandleClose();
    };

    return (
        <div className="loginContainer">
            {!showSignIn ? (
                <>
                    <form onSubmit={handleSignupSubmit}>
                        <h4>
                            <span>User Name</span> <TextField name="username"  helperText="" size="small"  />
                        </h4>
                        <h4>
                            <span>Password</span> <TextField name="password" type="password" helperText="" size="small"  />
                        </h4>
                        <h4>
                            <span>Email</span> <TextField name="email"  helperText="" size="small" />
                        </h4>
                        <h4>
                            <span>Role</span> <TextField name="role"  helperText="user, manager or admin" size="small"  />
                        </h4>

                        <Button sx={{ color: "rgb(255, 150, 30)" }}>Sign up</Button>
                    </form>
                    <Button onClick={() => setShowSignIn(true)} sx={{ color: "rgb(10, 10, 10, 0.8)" }}>
                        Sign in
                    </Button>
                </>
            ) : (
                <>
                    <form onSubmit={handleLoginSubmit}>
                        <h4>
                            <span>User Name</span> <TextField name="username"  helperText="" />
                        </h4>
                        <h4>
                            <span>Password</span> <TextField name="password" type="password" helperText="" />
                        </h4>

                        <Button onClick={() => setShowSignIn(false)} sx={{ color: "rgb(10, 10, 10, 0.8)" }}>
                            Sign up
                        </Button>
                    </form>
                    <Button sx={{ color: "rgb(255, 150, 30)" }}>Sign in</Button>
                </>
            )}
        </div>
    );
}
