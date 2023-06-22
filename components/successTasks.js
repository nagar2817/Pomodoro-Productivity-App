import { AiOutlineDelete } from 'react-icons/ai';
import { SettingsContext } from '../app/SettingsContext';
import {useContext,memo} from 'react';

const SuccessTasks = ({priorityColor, priorityValue })=>{
    const {removeSuccessTodos,completedTodo} = useContext(SettingsContext);
    return (
        <>
      {
        completedTodo.map((todo) => (
        <li
          
          key={todo.id}
        >
          <div className="todo-info">
            <span className="label todo-title">{todo.title}</span>
          </div>
          <div className="todo-priority">
          <div className={`priority-dot bg-${priorityColor(todo.priority)}-500`} />
          <span>{priorityValue(todo.priority)} Priority</span>
        </div>
        <span class="todo-date">{todo.dueDate}</span>
          <div className="actions">
            <button
            type="button"
            onClick={() => removeSuccessTodos(todo.id)}
            aria-label="Delete"
            title="Delete"
            className="btn-picto"
          >
            <AiOutlineDelete className="text-red-500" /> 
          </button>
          </div>
        </li>
      )) 
    } </>
    );
}

export default memo(SuccessTasks);