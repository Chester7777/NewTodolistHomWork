import React, {useState} from "react";
import {v1} from "uuid";
import "./App.css";
import Todolist, {TaskType} from "./Todolist";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();


    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What i  learn", filter: "all"},
        {id: todolistId2, title: "What i  byu", filter: "all"}
    ])

    let [tasks1, setTasks1] = useState({
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "TSX", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Terminator", isDone: true},
            {id: v1(), title: "XXX", isDone: false},
            {id: v1(), title: "Ice", isDone: true},
        ]
    })


    // let [tasks2, setTasks2] = useState<Array<TaskType>>(task2Init)

    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
        let todolistTasks = tasks1[todolistId]

        let task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks1({...tasks1})
    }

    let addTask = (title: string, todolistId: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks1[todolistId];
        tasks1[todolistId] = [newTask, ...todolistTasks]
        setTasks1({...tasks1})
    }
    const resultTasks1 = (id: string, todolistId: string) => {
        let todolistTasks = tasks1[todolistId]
        tasks1[todolistId] = todolistTasks.filter(t => t.id != id)
        setTasks1({...tasks1});
    }

    // const resultTasks2 = (id: string) => {
    //
    //     let filteredTasks = tasks2.filter(t => t.id !== id);
    //     setTasks2(filteredTasks);
    // }


    const allFilter = (value: FilterValuesType, todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id != id))
        delete tasks1[id]
        setTasks1({...tasks1})
    }
const addTodolist = (title: string) => {
let newTodolistID = v1();
    let newTodolist: TodolistType = {id: newTodolistID, title: title, filter: "all"};
    setTodolists([newTodolist, ...todolists]);
    setTasks1({...tasks1, [newTodolistID]: []})

}

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {todolists.map(tl => {
                // <AddItemForm addItem={addTodolis} />

                let allTodolistTasks = tasks1[tl.id]
                let tasksForTodolist = allTodolistTasks;

                if (tl.filter === "completed") {
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
                }
                if (tl.filter === "active") {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
                }

                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    tasks={tasksForTodolist}
                    title={tl.title}
                    changeTaskStatus={changeTaskStatus}
                    addTask={addTask}
                    filter={tl.filter}
                    resultTasks={resultTasks1}
                    allFilter={allFilter}
                    filterTask={tl.filter}
                    removeTodolist={removeTodolist}
                    onClick={EditableSpan}
                />
            })}

        </div>
    );
}

export default App;
