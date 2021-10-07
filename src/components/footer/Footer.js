import React, { useContext } from "react";

import { Button } from "@mui/material";

import "./footer.scss";

export default function Footer() {
    return (
        <footer className="footer">
            <div>
                <h1>TO-DO DO</h1>
                <h5>for your every do-to need</h5>
            </div>
            <div>
                <h2>All Rights Reserved ASAC® 2021</h2>
            </div>
            <div className="footerContactUs">
                <Button size="small" sx={{color: "rgba(255, 233, 191, 0.582)"}}>
                    Fa
                </Button>
                <Button size="small" sx={{color: "rgba(255, 233, 191, 0.582)"}}>
                    In
                </Button>
                <Button size="small" sx={{color: "rgba(255, 233, 191, 0.582)"}}>
                    Git
                </Button>
            </div>
        </footer>
    );
}
