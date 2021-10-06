import React from "react";

import ToDo from "./components/todo/todo.js";
import TodoItemsProvider from "./context/todoItems.context.js";
import SettingsProvider from "./context/settings.context.js";

export default class App extends React.Component {
    render() {
        return (
            <SettingsProvider>
                <TodoItemsProvider>
                    <ToDo />
                </TodoItemsProvider>
            </SettingsProvider>
        );
    }
}
