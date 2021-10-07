import React, { useState, useEffect } from "react";
export const SettingsContext = React.createContext();

export default function SettingsProvider(props) {
    let [hideCompleted, setHideCompleted] = useState(false);

    async function changeHideCompleted() {
        let h = !hideCompleted;
        setHideCompleted(h);
        localStorage.setItem("hideCompleted", `${h}`);
    }

    let [itemsPerPage, setItemsPerPage] = useState(5);
    function changeItemsPerPage(num) {
        if (num > 0) {
            setItemsPerPage(num);
            localStorage.setItem("toDoItemsPerPage", `${num}`);
        }
    }
    let [defaultSortField, setDefaultSortField] = useState("");

    useEffect(() => {
        let llHideCheck = localStorage.getItem("hideCompleted");
        // console.log("~ llHideCheck", llHideCheck)
        if (llHideCheck === "true") {
            // console.log(`llHideCheck RAN`);
            let z = true;
            if (llHideCheck === "false") z = false;
            setHideCompleted(z);
        }

        let llPerPageCheck = localStorage.getItem("toDoItemsPerPage");
        // console.log("~ llPerPageCheck", llPerPageCheck)
        if (llPerPageCheck) {
            // console.log(`llPerPageCheck RAN`);
            setItemsPerPage(parseInt(llPerPageCheck));
        }
    }, []);

    const state = {
        hideCompleted,
        changeHideCompleted,
        itemsPerPage,
        changeItemsPerPage,
        defaultSortField,
        setDefaultSortField,
    };

    return <SettingsContext.Provider value={state}>{props.children}</SettingsContext.Provider>;
}
