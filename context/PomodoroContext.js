import { useReducer, createContext,useState } from "react";
import reducer from '../reducer/reducer';
import Tasks from '../datas/Tasks';
const intialState = {
    tasks : Tasks,
    completedTasks :Tasks.filter(task => task.completed==true),
    activeTaskId : -1
}

const init = (intial)=> {
    // get state from db;
    return intial;
}

export const PomoContext = createContext();



const PomodoroProvider = (props) => {

    // timer
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
    const Clock_children = ({ remainingTime }) => {
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

    // Tasks array
    const [state, dispatch] = useReducer(reducer,intialState,init);
    const {tasks,completedTasks,activeTaskId} = state;

    const [pandingTasks, setPandingTasks]= useState(tasks.filter((task)=> !task.completed ));

    return <PomoContext.Provider value={{tasks,activeTaskId,completedTasks,dispatch,
        pomodoro, 
            executing,
            updateExecute, 
            startAnimate, 
            startTimer,
            pauseTimer,
            Clock_children ,
            setCurrentTimer,
            stopAimate,
            pandingTasks,
            setPandingTasks
    }}>
        {props.children}
    </PomoContext.Provider> 
}

export default PomodoroProvider;

