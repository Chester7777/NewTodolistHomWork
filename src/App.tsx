import React, {useState} from "react";
import { v1 } from "uuid";
import "./App.css";
import Todolist, {TaskType} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let task1Init: Array<TaskType> = [
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "TSX", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ]

    let task2Init: Array<TaskType> = [
        {id: v1(), title: "Terminator", isDone: true},
        {id: v1(), title: "XXX", isDone: false},
        {id: v1(), title: "Ice", isDone: true},
    ]

    let [tasks1, setTasks1] = useState<Array<TaskType>>(task1Init)
    let [tasks2, setTasks2] = useState<Array<TaskType>>(task2Init)


    const resultTasks1 = (id: string) => {

       let filteredTasks = tasks1.filter(t => t.id !== id);
        setTasks1(filteredTasks);
    }

    const resultTasks2 = (id: string) => {

        let filteredTasks = tasks2.filter(t => t.id !== id);
        setTasks2(filteredTasks);
    }

   let [filterTask, setFilterTask] = useState<FilterValuesType>("all");



    const allFilter = (value: FilterValuesType) => {
        setFilterTask(value);
    }

    let taskForTodolist = tasks1;
            if(filterTask === "completed") {
                taskForTodolist = tasks1.filter(t => t.isDone === true)
            }
            if (filterTask === "active") {
                taskForTodolist = tasks1.filter(t => t.isDone === false)
    }


    return (
        <div className="App">
            <Todolist
                tasks={tasks1}
                title="What i  learn"
                resultTasks={resultTasks1}
                allFilter={allFilter}
            />
            <Todolist
                tasks={tasks2}
                title="What i  now"
                resultTasks={resultTasks2}
                allFilter={allFilter}
            />
        </div>
    );
}

export default App;
