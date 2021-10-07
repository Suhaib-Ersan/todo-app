import React, { useState } from "react";
export const SettingsContext = React.createContext();

export default function SettingsProvider(props) {
    let [hideCompleted, setHideCompleted] = useState(false);

    function changeHideCompleted() {
        setHideCompleted(!hideCompleted);
    }
    let [itemsPerPage, setItemsPerPage] = useState(5);
    function changeItemsPerPage(num) {
        if (num > 0) setItemsPerPage(num);
    }
    let [defaultSortField, setDefaultSortField] = useState("");

    const state = {
        hideCompleted,
        changeHideCompleted,
        itemsPerPage,
        changeItemsPerPage,
        defaultSortField,
        setDefaultSortField
    };

    return <SettingsContext.Provider value={state}>{props.children}</SettingsContext.Provider>;
}
