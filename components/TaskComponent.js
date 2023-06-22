import {GiTomato} from 'react-icons/gi';
import {PomoContext} from '../context/PomodoroContext';
import { useContext,useState ,memo} from 'react';
import SingleTask from './Task';
const TaskComponent = ({direction})=>{
  const {
    tasks,
  } = useContext(PomoContext);

  const [show, setShow] = useState(true);

  const sortedTodos = tasks.slice().sort((a, b) => {
    if (direction == 1) {
      return a.priority - b.priority;
    } else if (direction == 2) {
      return b.priority - a.priority;
    }
    return 0;
  });
  const PrintTomato = (num)=>{
    for(let i=0;i<num;i++){
     <GiTomato />
    }
  }
  const toggler = (id) =>{
    setShow(!show);
    setActiveTaskId(id);
    if(show){
      startTimer();
    }else{
      pauseTimer();
    }
  }
  
    return (
      <>
        {
          sortedTodos.map((task)=> <SingleTask key={task.id} todo={task} itr={task.taskCount}/>)
        }
      </>
    )
}
export default memo(TaskComponent);



