import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";


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
}

const Todolist = (props: TodolistType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    
const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {if(e.charCode === 13){
        props.addTask(newTaskTitle);
        setNewTaskTitle("")
    }}
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("")
    }
    const onAllClickHandler = () => props.allFilter("all")
    const onActiveClickHandler = () => props.allFilter("active")
    const onCompletedClickHandler = () => props.allFilter("completed")

    return (
        <div className="App">
            <div><h3>{props.title}</h3></div>
            <div>
                <ul>
                    {
                        props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/><span>{t.title}</span>
                            <button onClick={() => {
                                props.resultTasks(t.id)
                            }}>x
                            </button>
                        </li>)
                    }
                </ul>
            </div>
            <div>
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={onChangeTitleHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}
                >+</button>
            </div>
            <div>
                <button onClick={onAllClickHandler}>All
                </button>
                <button onClick={onActiveClickHandler}>Active
                </button>
                <button onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Todolist;
