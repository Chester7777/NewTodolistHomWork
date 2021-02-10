import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpanPropsType} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    filter: string
    title: string
    tasks: Array<TaskType>
    resultTasks: (id: string, todolistId: string) => void
    allFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filterTask: FilterValuesType
    removeTodolist: (id: string) => void
    onClick: (props: EditableSpanPropsType) => void


}

const Todolist = (props: TodolistType) => {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onTodolistRemoveClickHandler = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.allFilter("all", props.id)
    const onActiveClickHandler = () => props.allFilter("active", props.id)
    const onCompletedClickHandler = () => props.allFilter("completed", props.id)


    return (
        <div className="App">
            <div>
                <h3>{props.title}
                    <button onClick={onTodolistRemoveClickHandler}>x</button>
                </h3>
                <AddItemForm addItem={addTask} />
                <ul>
                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => props.resultTasks(t.id, props.id);
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);

                            return <li className={t.isDone ? "is-done" : ""}>
                                <input
                                    type="checkbox"
                                    onChange={onChangeHandler}
                                    checked={t.isDone}/>

                                <button onClick={onClickHandler}>x</button>
                            </li>
                        })
                    }
                </ul>
                <div>

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
