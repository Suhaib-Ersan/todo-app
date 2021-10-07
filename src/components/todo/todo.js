import React, { useEffect, useState, useContext } from "react";

import { TodoItemsContext } from "../../context/todoItems.context";
import { SettingsContext } from "../../context/settings.context";

import { Pagination } from "@mui/material";

import "./todo.scss"

const ToDo = () => {
    const toDoList = useContext(TodoItemsContext);
    const settings = useContext(SettingsContext);

    const [page, setPage] = useState(1);
    const [pageContent, setPageContent] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [paginationPage, setPaginationPage] = useState(1);
    const [tasksNumber, setTasksNumber] = useState(0)

    function handleSubmit(e) {
        e.preventDefault();
        toDoList.addItem(e);
    }

    function handlePageChange(event, pageNum) {
        setPage(pageNum);
        setPaginationPage(pageNum);
    }
    useEffect(() => {
        let itemsCount = settings.itemsPerPage;
        let startItem = itemsCount * page - 5;
        // console.log("~ page", page);
        let arr = [...toDoList.list];
        if (settings.hideCompleted) {
            arr = arr.filter(task => {
                return !task.complete;
            });
        }
        setTasksNumber(arr.length);
        // console.log("~ arr", arr);
        // console.log(`startItem ${startItem}, itemsCount ${itemsCount}`);
        let newArr = arr.splice(startItem, itemsCount);
        // console.log("newArr >> ", newArr);
        setPageContent(newArr);
        // console.log("pageContent >> ", pageContent);
    }, [page, toDoList.list, settings.hideCompleted]);
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
        <div className="todoPage" >
            <div>
                <h1>To Do List: {incomplete} items pending</h1>
            </div>

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
            <Pagination onChange={handlePageChange} style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }} count={Math.ceil(tasksNumber / settings.itemsPerPage)} page={paginationPage} />
            {pageContent.map((item) => {
                return (
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
                );
            })}
            {pageContent.length > 0 ? <Pagination onChange={handlePageChange} style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }} count={Math.ceil(tasksNumber / settings.itemsPerPage)} page={paginationPage} /> : null}
        </div>
    );
};

export default ToDo;
