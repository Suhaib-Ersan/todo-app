import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Button, Modal, Typography,Box } from "@mui/material";
import Login from "../login/login";

import "./header.scss";

export default function Header() {
    const [modalOpen, setModalOpen] = React.useState(false);
    const modalHandleOpen = () => setModalOpen(true);
    const modalHandleClose = () => setModalOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: 'none',
        borderRadius:"0.25rem",
        boxShadow: 24,
        p: 4,
      };
      
    return (
        <header className="header">
            <Link className="headerLogo" to="/">
                TO-DO DO
            </Link>
            <Link className="headerHome" to="/">
                <Button size="large" sx={{ color: "white" }}>
                    Home
                </Button>
            </Link>
            <Link className="headerSettings" to="/settings">
                <Button size="large" sx={{ color: "white" }}>
                    Settings
                </Button>
            </Link>
            <Button className="headerLogin" onClick={modalHandleOpen} size="large" sx={{ color: "white" }}>
                Login
            </Button>
            <Modal open={modalOpen} onClose={modalHandleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Login modalHandleClose={modalHandleClose} />
                </Box>
            </Modal>
        </header>
    );
}
