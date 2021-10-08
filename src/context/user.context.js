import React from "react";
import { useState, useEffect } from "react";
import base64 from "base-64";
import superagent from "superagent";
import jwt from "jsonwebtoken";
import cookie from "react-cookies";

export const LoginContext = React.createContext();

const API = "https://spacefood.herokuapp.com";

export default function LoginProvider(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        handleJWToken(cookie.load("login-token"));
    }, []);

    const serverHandleSignin = async (username, password) => {
        try {
            const encodedUser = base64.encode(`${username}:${password}`);
            const response = await superagent.post(`${API}/signin`).set("authorization", `Basic ${encodedUser}`);
            handleJWToken(response.body.token);
        } catch (error) {
            alert("Invalid username or password");
        }
    };

    const serverHandleSignup = async (username, password, email, role) => {
        try {
            let obj = {
                username: username,
                firstname: "test-firstname",
                lastname: "test-lastname",
                password: password,
                email: email,
                gender: "test-gender",
                adress: "test-adress",
                phone: "12345",
                age: "25",
                role: role,
            };
            // console.log(obj);
            const response = await superagent.post(`${API}/signup`, obj);
            handleJWToken(response.body.token);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleJWToken = (token) => {
        if (token) {
            const user = jwt.decode(token);
            frontEndHandleSignin(true, user);

            cookie.save("login-token", token);
        } else {
            frontEndHandleSignin(false, {});
        }
    };

    const frontEndHandleSignin = (loggedIn, user) => {
        setLoggedIn(loggedIn);
        setUser(user);
    };

    const frontEndHandleLogout = () => {
        frontEndHandleSignin(false, {});
        cookie.remove("login-token");
    };

    const capabilityCheck = (capability) => {
        console.log(user);
        return user?.capabilities?.includes(capability);
    };

    const state = {
        loggedIn,
        serverHandleSignup,
        serverHandleSignin,
        frontEndHandleLogout,
        user,
        capabilityCheck,
    };

    return <LoginContext.Provider value={state}>{props.children}</LoginContext.Provider>;
}
