import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";



export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    title: string
    tasks: Array<TaskType>
    resultTasks: (id: string) => void
    allFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filterTask: FilterValuesType
}

const Todolist = (props: TodolistType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const addTask = () => {
        debugger
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onAllClickHandler = () => props.allFilter("all")
    const onActiveClickHandler = () => props.allFilter("active")
    const onCompletedClickHandler = () => props.allFilter("completed")

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <ul>
                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => props.resultTasks(t.id);
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked);

                            return <li className={t.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onClickHandler}>x</button>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <input
                        type="text"
                        className={error ? "error" : ""}
                        value={newTaskTitle}
                        onChange={onChangeTitleHandler}
                        onKeyPress={onKeyPressHandler}/>
                    <button onClick={addTask}>+</button>
                    <br/>
                    {error && <div className="error-message">{error}</div>}

                    <button
                        className={props.filterTask === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                    </button>
                    <button
                        className={props.filterTask === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                    </button>
                    <button
                        className={props.filterTask === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;
