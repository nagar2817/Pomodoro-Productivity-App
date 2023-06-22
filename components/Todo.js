import React, { useState,useContext ,memo}from 'react';
import '../styles/Todo.css';
import { PomoContext } from '../context/PomodoroContext';
import SuccessTasks from './successTasks';
import TaskComponent from './TaskComponent';
import Link from 'next/link'


const Todo = () => {
  const { 
    tasks,
    completedTasks,
    pandingTasks,
dispatch} =  useContext(PomoContext);

  const [showComponent, setShowComponent] = useState(false);
  const [title,setTitle] = useState("");
  const [tomato,setTomato] = useState(1);
  const [priority,setPriority] = useState(0);
  const [error, setError] = useState(false);
  const [direction,setDirection] = useState(1);

 
  const handleSuccess = (e)=>{
    console.log(e);
    setShowComponent(!showComponent)
  }

  const addHandler  = (e)=>{
    if(title.length < 1){
      setError(true)
    }else{
      for(let i=1;i<=tomato;i++){
        dispatch({type:'added_task', id: tasks.length +1 , title:title, description:"", priority:Priority , tomato:tomato, taskCount: i})
      }
      setError(false);
    }
  }
  return (
    <div className="" id="todolist">
      <div className="row">

        {/* tasks,completed, panding tasks */}
        <div className="flex justify-between">
        <div className="col-4">
          <button className="badge bg-green-500 rounded-full px-4 py-2">Total : {tasks.length}</button> 
        </div>
        <div className="col-4">
          <button className="badge bg-blue-500 rounded-full px-4 py-2" onClick={handleSuccess}>
           Success : {completedTasks.length} 
          </button>
        </div>
        <div className="col-4">
          <span className="badge bg-yellow-500 rounded-full px-4 py-2">
            Pending : {pandingTasks.length}
          </span>
        </div>
        </div>

        {/* Input form */}
      
        <div className="col-md-12 mt-3">
          <form onSubmit={addHandler}>
            <div className="form-group">
              <input
                type="text"
                name="newTodo"
                className="add-todo-field form-control"
                placeholder="Enter New To-Do"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select className="border rounded-r py-2 px-4 bg-white text-grey-800 ml-3 mr-3" value={priority} onChange={(e)=> setPriority(e.target.value)}>
                <option value={0} className='bg-white text-grey-800 ml-3'>No Priority</option>
                <option value={1} className='bg-white text-grey-800'>Low</option>
                <option value={2} className='bg-white text-grey-800' >High</option>
              </select>
              <select className="border rounded-r py-2 px-4 bg-white text-grey-800 ml-3 mr-3" value={tomato} onChange={(e)=> setTomato(e.target.value) } >
                <option value="" className='bg-white text-grey-800 ml-3'>Est. Pomodoro</option>
                <option value={1} className='bg-white text-grey-800 ml-3'>1</option>
                <option value={2} className='bg-white text-grey-800'>2</option>
                <option value={3} className='bg-white text-grey-800' >3</option>
                <option value={4} className='bg-white text-grey-800' >4</option>
              </select>
             

              <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-3 rounded-r">Add Task</button>
            </div>
          </form>

          <select className="border rounded-r py-2 px-4 bg-white text-grey-800 ml-3 mr-3" value={direction} onChange={(e)=> setDirection(e.target.value)}>
          <option value="" className='bg-white text-grey-800 ml-3'>sort task based on priority</option>
          <option value={1} className='bg-white text-grey-800 ml-3'>asc</option>
          <option value={2} className='bg-white text-grey-800'>desc</option>
        </select>
        <button  className="bg-blue-500 text-white px-4 py-2 ml-3 rounded-r">
        <Link href="/admin">
        Save ALl Task 
        </Link>
        </button>
        
        </div>
      </div>

      <ul id="todo-list">
        { showComponent ? <SuccessTasks priorityColor={priorityColor} priorityValue={priorityValue}/> :
          <TaskComponent direction={direction}/> }   
        
      </ul>
    
    </div>
  );
};

export default memo(Todo);



