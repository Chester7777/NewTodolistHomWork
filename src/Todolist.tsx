import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpanPropsType} from "./EditableSpan";
import {Checkbox, FormControlLabel, IconButton, Button, ButtonGroup} from "@material-ui/core";
import {Delete} from "@material-ui/icons";



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
                <div>
                    {
                        props.tasks.map(t => {
                            const onClickHandler = () => props.resultTasks(t.id, props.id);
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);

                            return <div className={t.isDone ? "is-done" : ""}>

                                        <Checkbox
                                            checked={t.isDone}
                                            color="primary"
                                            onChange={onChangeHandler}
                                            name="checkedB"
                                        />

                                {/*// <input*/}
                                {/*//     type="checkbox"*/}
                                {/*//     onChange={onChangeHandler}*/}
                                {/*//     checked={t.isDone}/>*/}

                                <IconButton aria-label="delete">
                                    <Delete onClick={onClickHandler}/>
                                </IconButton>

                            </div>
                        })
                    }
                </div>
                <div>

                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button
                        variant={props.filter === "all" ? "outlined" : "text"}
                        // className={props.filterTask === "all" ? "primary" : "secondary"}
                        onClick={onAllClickHandler}>All
                    </Button>
                    <Button
                        variant={props.filter === "active" ? "outlined" : "text"}
                        // className={props.filterTask === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                    </Button>

                    <Button
                        variant={props.filter === "completed" ? "outlined" : "text"}
                        // className={props.filterTask === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                    </Button>
                </ButtonGroup>
                </div>
            </div>
        </div>
    )
}

export default Todolist;
