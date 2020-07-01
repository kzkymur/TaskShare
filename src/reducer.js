import * as u from './utils.js';

const initState = {
	pageState: 'preSignIn',
};

export default function reducer (state = initState, action) {
	switch(action.type){
		case 'SIGNIN': {
			return u.objectJoiner(
				state,
				{
					pageState: 'home',
					userName: action.userName,
					userId: action.userId,
					tasks: action.tasks,
				}
			)
		}
		case 'SIGNOUT': {
			return initState;
		}
		case 'RELOAD': {
			return u.objectJoiner(
				state,
				{tasks: action.tasks},
			);
		}
		case 'REMOVE_TASK': {
			let newTasks = state.tasks;
			let removeIndex;
			for (let i=0; i<newTasks.length; i++){
				if (newTasks[i].taskId == action.taskId){
					removeIndex = i;
				}
			}
			newTasks.splice(removeIndex, 1);
			return u.objectJoiner(
				state,
				{tasks: newTasks},
			);
		}
	}
	return state;
}
