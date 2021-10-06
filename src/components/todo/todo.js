import React, { useEffect, useState, useContext } from "react";

import { TodoItemsContext } from "../../context/todoItems.context";
import { SettingsContext } from "../../context/settings.context";

import { Pagination } from "@mui/material";

const ToDo = () => {
    const toDoList = useContext(TodoItemsContext);
    const settings = useContext(SettingsContext);

    const [page, setPage] = useState(1);
    const [pageContent, setPageContent] = useState([])
    const [incomplete, setIncomplete] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        toDoList.addItem(e);
    }

    function handlePageChange(num) {
      setPage(num);
    }
    useEffect(() => {
      let itemsCount = settings.itemsPerPage;
      let startItem = itemsCount*page;
      let arr = toDoList.list.splice(startItem,itemsCount);
      setPageContent(arr)
    }, [page,toDoList.list])
    // function deleteItem(id) {
    //     const items = list.filter((item) => item.id !== id);
    //     setList(items);
    // }

    function handleStatusChange(id) {
        toDoList.toggleComplete(id);
    }
    useEffect(() => {
        let incompleteCount = toDoList.list.filter((item) => !item.complete).length;
        setIncomplete(incompleteCount);
        document.title = `To Do List: ${incomplete}`;
    }, [toDoList.list]);
    return (
        <>
            <header>
                <h1>To Do List: {incomplete} items pending</h1>
            </header>

            <form onSubmit={handleSubmit}>
                <h2>Add To Do Item</h2>

                <label>
                    <span>To Do Item</span>
                    <input name="text" type="text" placeholder="Item Details" />
                </label>

                <label>
                    <span>Assigned To</span>
                    <input name="assignee" type="text" placeholder="Assignee Name" />
                </label>

                <label>
                    <span>Difficulty</span>
                    <input defaultValue={5} type="range" min={1} max={10} name="difficulty" />
                </label>

                <label>
                    <button type="submit">Add Item to your to do list</button>
                </label>
            </form>

            {toDoList.list.map((item) => (
                <div key={item.id}>
                    <p>{item.text}</p>
                    <p>
                        <small>Assigned to: {item.assignee}</small>
                    </p>
                    <p>
                        <small>Difficulty: {item.difficulty}</small>
                    </p>
                    <div onClick={() => handleStatusChange(item.id)}>Complete: {item.complete.toString()}</div>
                    <hr />
                </div>
            ))}
            <Pagination onClick={handlePageChange} style={{ display: "flex", justifyContent: "center" }} count={10} />
        </>
    );
};

export default ToDo;
