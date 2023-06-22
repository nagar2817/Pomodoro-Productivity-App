"use client"
import { useState, createContext ,useEffect} from "react";
import { gql, useQuery } from '@apollo/client'
import type { Task } from '@prisma/client'
import Tasks from "../datas/Tasks";

const AllTasksQuery = gql`
    query{
        tasks{
            id
            title
            description
            priority
            completed
            dueDate
            tomato
        }
    }
`


export const SettingsContext = createContext()

function SettingsContextProvider(props) {

    const [pomodoro, setPomodoro] = useState(0)
    const [executing, setExecuting] = useState({
        work: 25,
        short: 5,
        long: 10,
        active: 'work'
    })
    const [startAnimate, setStartAnimate] = useState(false)

    function setCurrentTimer (active_state) {
        updateExecute({
            ...executing,
            active: active_state
        })
        setTimerTime(executing)
    }

    // start animation fn 
    function startTimer() {
        setStartAnimate(true)
    }
    // pause animation fn 
    function pauseTimer() {
    setStartAnimate(false)
    }
    // pass time to counter 
    const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
    
    return `${minutes}:${seconds}`
    }

    const updateExecute = updatedSettings => {
        setExecuting(updatedSettings)
        setTimerTime(updatedSettings)
    }

    const setTimerTime = (evaluate) => {
        switch (evaluate.active) {
            case 'work':
                setPomodoro(evaluate.work)
                break;
            case 'short':
                setPomodoro(evaluate.short)
                break;
            case 'long':
                setPomodoro(evaluate.long)
                break;
            default:
                    setPomodoro(0)
                break;
        }
    }

    function stopAimate() {
        setStartAnimate(false)
    }


    // const {data,loading,error} = useQuery(AllTasksQuery);
    // useEffect(() => {
    //     if (!loading && data) {
    //       setTodos(data.tasks);
    //     const x = data.tasks.filter((todo)=> todo.completed);
    //         setCompletedTodo(x);
    //     const y = data.tasks.filter((todo)=> !todo.completed);
    //         setPandingTodo(y);
    //     }
    //   }, [loading, data]);

    
    const [todos, setTodos] = useState(Tasks);
    const [completedTodo,setCompletedTodo] = useState([]);
    const [pandingTodo,setPandingTodo]= useState([]);
    const [newTodoText, setNewTodoText] = useState('');
    const [initPriority, setInitPriority] = useState(0);
    const [direction , setDirection] = useState(0); 
    const [pomo, setPomo] =  useState(0);
    const [activeTaskId, setActiveTaskId] = useState(-1);


    const addNewTodo = (event) => {
        event.preventDefault();
        if (newTodoText.trim() === '') return;
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
        const dateString = formattedDate.toString();
        for(let i=1;i<=pomo;i++){
            const newTodo = {
                id: todos.length + 1,
                title: newTodoText,
                description: "",
                completed: false,
                dueDate:dateString,
                priority: initPriority,
                tomato : pomo ,
                taskCount : i
              };
            setTodos([...todos,newTodo]);
        setPandingTodo([...pandingTodo,newTodo]);
        }
        setNewTodoText('');
        setPomo(0);
      };
    
      const updateTodo= ()=>{
        const a = todos.filter(task => task.completed);
        const b = todos.filter(task => !task.completed);
        setCompletedTodo(a);
        setPandingTodo(b);
      }
    
      const completeTodo = (Id) => {
        setTodos(todos.map(task => {
            if(task.id != Id) return task;
            return {...task, completed:true};
        }))
        updateTodo();
      }; 
    
      const removeTodo = (Id) => {
        const updateTodos = todos.filter((task)=> {if(task.id!= Id) return task});
        setTodos(updateTodos);
        const b = updateTodos.filter(task => !task.completed);
        setPandingTodo(b);
      };

      const removeSuccessTodos = (Id)=>{
        setCompletedTodo(completedTodo.map(task =>{
            if(task.id != Id) return task;
        }))
      }

    return (
        <SettingsContext.Provider value={{
            pomodoro, 
            executing,
            updateExecute, 
            startAnimate, 
            startTimer,
            pauseTimer,
            children,
            setCurrentTimer,
            stopAimate,
            addNewTodo,
            updateTodo,
            completeTodo,
            removeTodo,
            todos,
            completedTodo,
            pandingTodo,
            newTodoText,
            initPriority,
            setNewTodoText,
            setInitPriority,
            removeSuccessTodos,
            direction,
            setDirection,
            pomo,
            setPomo,
            activeTaskId,
            setActiveTaskId
        }}>
            {props.children}
        </SettingsContext.Provider>
    )

}

export default SettingsContextProvider;