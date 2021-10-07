import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";

import "./header.scss";

export default function Header() {
    return (
        <header className="header">
            <Link className="headerLogo" to="/">
                TO-DO DO
            </Link>
            <Link className="headerHome" to="/">
                <Button size="large" sx={{color: "white"}}>Home</Button>
            </Link>
            <Link className="headerSettings" to="/settings">
                <Button size="large" sx={{color: "white"}} >Settings</Button>
            </Link>
        </header>
    );
}
