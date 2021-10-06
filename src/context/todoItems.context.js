import React, { useState } from "react";
import { v4 as uuid } from "uuid";
export const TodoItemsContext = React.createContext();

export default function TodoItemsProvider(props) {
    const [list, setList] = useState([]);

    function toggleComplete(id) {
        const items = list.map((item) => {
            if (item.id == id) {
                item.complete = !item.complete;
            }
            return item;
        });

        setList(items);
    }

    function addItem(e) {
        let item = {
            text: e.target.text.value,
            assignee: e.target.assignee.value,
            difficulty: e.target.difficulty.value,

            id: uuid(),
            complete: false,
        };
        let l = [...list, item];
        setList(l);
    }

    const state = {
        list,
        setList,
        addItem,
        toggleComplete,
    };

    return <TodoItemsContext.Provider value={state}>{props.children}</TodoItemsContext.Provider>;
}
