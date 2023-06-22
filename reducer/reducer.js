const reducer = (state = {},action) =>{
    switch(action.type){
        case 'started_timer':
        case 'stopped_timer':
        case 'added_task':
            const currentDate = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
            const dateString = formattedDate.toString();
            return {
                ...state,
                tasks: [...state.tasks, {
                    id: action.id,
                    title: action.title,
                    tomato: action.tomato,
                    taskCount: action.taskCount,
                    priority: action.priority,
                    description:action.description,
                    completed: false,
                    dueDate:dateString,
                    authorId:1
                }]
            }

        case 'deleted_task':
        case 'completed_task':
        case 'reset_active_task':
        default:
            return state;
    }
}

export default reducer;