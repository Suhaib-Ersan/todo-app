import React from "react";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ToDo from "./components/todo/todo.js";
import Settings from "./components/settings/settings";

import TodoItemsProvider from "./context/todoItems.context.js";
import SettingsProvider from "./context/settings.context.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./app.scss";
export default class App extends React.Component {
    render() {
        return (
            <div className="appJs" >
                <SettingsProvider>
                    <TodoItemsProvider>
                        <Router>
                            <Header />
                            <div className="main">
                                <Switch>
                                    <Route exact path="/">
                                        <ToDo />
                                    </Route>
                                    <Route path="/settings">
                                        <Settings />
                                    </Route>
                                </Switch>
                            </div>
                            <Footer />
                        </Router>
                    </TodoItemsProvider>
                </SettingsProvider>
            </div>
        );
    }
}

