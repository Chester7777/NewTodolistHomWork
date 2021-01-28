import React from "react";
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
}

const Todolist = (props: TodolistType) => {


    return (
        <div className="App">
            <div><h3>{props.title}</h3></div>
            <div>
                <ul>
                    {
                        props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/><span>{t.title}</span><button onClick={() => {props.resultTasks(t.id)}}>x</button></li>)
                    }
                </ul>
            </div>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <div>
                <button onClick={() => {props.allFilter("all")}}>All</button>
                <button onClick={() => {props.allFilter("active")}}>Active</button>
                <button onClick={() => {props.allFilter("completed")}}>Completed</button>
            </div>
            <div>
            </div>
        </div>
    );
}

export default Todolist;
