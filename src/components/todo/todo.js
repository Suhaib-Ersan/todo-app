import React, { useEffect, useState, useContext } from "react";

import Auth from "../login/auth";
import AuthNot from "../login/authNot";

import { TodoItemsContext } from "../../context/todoItems.context";
import { SettingsContext } from "../../context/settings.context";

import { Pagination, Card, Button, FormControlLabel, TextField, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";

import "./todo.scss";
import { Login } from "@mui/icons-material";

const ToDo = () => {
    const toDoList = useContext(TodoItemsContext);
    const settings = useContext(SettingsContext);

    const [page, setPage] = useState(1);
    const [pageContent, setPageContent] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [paginationPage, setPaginationPage] = useState(1);
    const [tasksNumber, setTasksNumber] = useState(0);

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
        let startItem = itemsCount * page - itemsCount;
        // console.log("~ page", page);
        let arr = [...toDoList.list];
        if (settings.hideCompleted) {
            arr = arr.filter((task) => {
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
    useEffect(async () => {
        if (pageContent.length < 1) {
            let num = Math.ceil(tasksNumber / settings.itemsPerPage);
            setPaginationPage(num);
            setPage(num);
        }
        if (pageContent.length > 0 && page < 1) {
            // console.log("ran here");
            setPage(1);
            setPaginationPage(1);
        }
    }, [[pageContent]]);

    function createColorBtn(item) {
        const ColorButton = styled(Button)(({ theme }) => ({
            color: item.complete ? "rgba(255, 233, 191, 0.8)" : "rgba(255, 255, 255, 0.88)",
            backgroundColor: item.complete ? "rgb(37, 20, 0)" : "rgb(255, 178, 90)",
            "&:hover": {
                backgroundColor: item.complete ? "rgb(67, 50, 20)" : "rgb(255, 200, 130)",
            },
        }));
        return (
            <ColorButton onClick={() => handleStatusChange(item.id)} className="changeCompleteStatusBtn" variant="contained">
                {item.complete ? "Not completed?" : "Completed?"}
            </ColorButton>
        );
    }

    return (
        <div className="todoPage">
            <Card className="addFormContainer">
                <div className="toDoHeader" >
                    <h1>{incomplete} tasks pending</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <h2>Add a task</h2>

                    <label>
                        <span>Task name</span>
                        <TextField name="text" placeholder="Task Details" size="small" />
                    </label>

                    <label>
                        <span>Assigned To</span>
                        <TextField name="assignee" placeholder="Assignee Name" size="small" />
                    </label>

                    <label className="difficultyLabel">
                        <span>Difficulty</span>
                        <Slider aria-label="Difficulty" defaultValue={3} valueLabelDisplay="auto" step={1} marks min={1} max={10} name="difficulty" sx={{ color: "rgb(255, 178, 90)" }} />
                    </label>
                    <Auth capability="create">
                        <label className="btnLabel">
                            <Button style={{ backgroundColor: "rgb(255, 178, 90)", color: "white", maxWidth: "80%" }} type="submit">
                                Add Item to your to do list
                            </Button>
                        </label>
                    </Auth>
                    <AuthNot capability="create">
                        <label className="btnLabel">
                            <Button type="button" style={{ backgroundColor: "rgb(253, 43, 78)", color: "white", maxWidth: "80%" }}>
                                Please login with an account that has a create permission
                            </Button>
                        </label>
                    </AuthNot>
                </form>
            </Card>
            <Card className="toDoItemsContainer">
                <div className="toDoItemsPaginationHeader">
                    <Pagination onChange={handlePageChange} style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }} count={Math.ceil(tasksNumber / settings.itemsPerPage)} page={paginationPage} />
                </div>
                <div className="toDoItemsList">
                    <Auth capability="read">
                        {pageContent.map((item) => {
                            return (
                                <Card elevation={3} className="toDoItem" key={item.id}>
                                    <p>{item.text}</p>
                                    <p>
                                        <small>Assigned to: {item.assignee}</small>
                                    </p>
                                    <p>
                                        <small>Difficulty: {item.difficulty}</small>
                                    </p>
                                    <div className={item.complete ? "toDoItemCompletedText toDoItemCompletedText-yes" : "toDoItemCompletedText toDoItemCompletedText-no"}>{item.complete ? "Completed 🗹" : "Awaiting completion ☒"}</div>
                                    {createColorBtn(item)}
                                </Card>
                            );
                        })}
                    </Auth>
                    <AuthNot capability="read">
                        <Card elevation={3} className="toDoItem" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            Please login with an account that has a read permission
                        </Card>
                    </AuthNot>
                </div>
                {/* {pageContent.length > 0 ? <Pagination onChange={handlePageChange} style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }} count={Math.ceil(tasksNumber / settings.itemsPerPage)} page={paginationPage} /> : null} */}
            </Card>
        </div>
    );
};

export default ToDo;
