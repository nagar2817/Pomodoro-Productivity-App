import { AiFillCheckSquare, AiOutlineCheckSquare } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import  ButtonComponent from './MainTask/Button';
import { Button } from "@material-tailwind/react";
import { useContext } from 'react';
import { PomoContext } from '../context/PomodoroContext';
import TaskComponent from './TaskComponent';

const SingleTask = ({task,itr})=>{

    const priorityColor = (value)=>{
        if(value == 1) {
          return 'green';
        }else if(value==2){
          return 'yellow';
        }
        return "blue";
      }
      const priorityValue = (value)=> {
        if(value==1) return 'Low';
        else if(value==2) return 'High';
        return 'No';
      }

    return(
        <>
        <li classname={`todo-item ${task.completed} ? done: undone `}>
                  
                  <div class="todo-info">
                    <span class="label todo-title">{task.title}</span>
                    {/* <!-- <span class="label todo-description" v-if="todo.description">
                      <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    </span>--> */}
                    {/* <!-- <span class="label todo-tags" v-if="todo.tags">
                      <span
                        class="badge badge-pill badge-info"
                        :style="{background:tag.color, color:'#fff'}"
                        v-for="(tag, key) in todo.tags"
                        :key="key"
                      >
                        <i class="fa fa-tag" aria-hidden="true"></i>
                        {{tag.name}}
                      </span>
                    </span>--> */}
                  </div>
                  <div class="todo-priority">
                    <div class="priority-dot" className={`bg-${priorityColor(task.priority)}-500`} ></div>
                    <span>{task.priority} Priority</span>
                  </div>
                 
                

                  <span class="todo-date">{todo.dueDate}</span>
                  <div class="actions">
                    <button
                      type="button"
                      class="btn-picto"
                      onClick={completeHandler}
                      aria-label={ task.completed ? 'Undone' : 'Done'}
                      title={task.completed ? 'Undone' : 'Done'}
                    >
                      <i
                        aria-hidden="true"
                        class="material-icons"
                      >{ task.completed ? 'check_box' : 'check_box_outline_blank' }</i>
                    </button>
                    <button
                      onClick={deleteHandler}
                      type="button"
                      aria-label="Delete"
                      title="Delete"
                      class="btn-picto"
                    >
                      <i aria-hidden="true" class="material-icons">delete</i>
                    </button>
                  </div>
                </li></>
    )
}
export default SingleTask;