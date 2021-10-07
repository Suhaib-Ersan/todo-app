import React, { useContext, useState } from "react";

import { SettingsContext } from "../../context/settings.context";

import { Checkbox, FormControlLabel, Card,TextField  } from "@mui/material";

import "./settings.scss";

export default function Settings() {
    const settings = useContext(SettingsContext);
    // hideCompleted, changeHideCompleted = true/false
    // itemsPerPage, changeItemsPerPage = number

    const [hideCheck, setHideCheck] = useState(false);

    function handleHideCheck(event, status) {
        settings.changeHideCompleted(status);
    }
    function handlePageCheck(event) {
      if (event.target.value > 99 || event.target.value <1) {
        console.error("tasks per page accepts numbers between 1 and 99 only")
        return;
      }
    }

    return (
        <div className="settingsPage">
            <Card>
                <h3>
                    <span>Hide completed tasks</span>
                    <FormControlLabel control={<Checkbox onChange={handleHideCheck} defaultChecked={true} />} label={settings.hideCompleted ? "Hidden" : "Shown"} />
                </h3>
                <h3>
                    <span>Tasks per page</span> <TextField onChange={handlePageCheck} type="number" helperText="1 - 99 only" />
                </h3>
            </Card>
        </div>
    );
}
