import React from 'react';
import './TodosFooter.scss';

const TODOS_ALL = 'all';
const TODOS_ACTIVE = 'active';
const TODOS_COMPLETED = 'completed';
const TODOS_ALL_LABEL = 'All';
const TODOS_ACTIVE_LABEL = 'Active';
const TODOS_COMPLETED_LABEL = 'Completed';
const CLASS_ACTIVE = 'active';
const EMPTY_ACTIVE = '';
const ITEMS_LEFT_LABEL = ' items left';
const CLEAR_COMPLETED_LABEL = 'Clear completed';

export default class TodosFooter extends React.Component {
    getActiveTodos(todos) {
        return todos.filter(todo => {return todo.completed === false}).length;
    }

    render() {
        const {
            selectTodosToDisplay, 
            todosType, 
            removeAllCompletedTodos, 
            todos,
        } = this.props;

        return (
            <div className='todos-footer'>
                <div className='counter'>{this.getActiveTodos(todos)}{ITEMS_LEFT_LABEL}</div>
                <div className='options'>
                    <div 
                        className={`selectAll ${todosType === TODOS_ALL ? CLASS_ACTIVE : EMPTY_ACTIVE }`} 
                        onClick={e => selectTodosToDisplay(e, TODOS_ALL )}
                    >
                        {TODOS_ALL_LABEL}
                    </div>
                    <div 
                        className={`selectActive ${todosType === TODOS_ACTIVE ? CLASS_ACTIVE : EMPTY_ACTIVE }`} 
                        onClick={e => selectTodosToDisplay(e, TODOS_ACTIVE)}
                    >
                        {TODOS_ACTIVE_LABEL}
                    </div>
                    <div 
                        className={`selectCompleted ${todosType === TODOS_COMPLETED ? CLASS_ACTIVE : EMPTY_ACTIVE }`} 
                        onClick={e => selectTodosToDisplay(e, TODOS_COMPLETED)}
                    >
                        {TODOS_COMPLETED_LABEL}
                    </div>
                </div>
                <div 
                    className='clearCompleted'
                    onClick={() => removeAllCompletedTodos()}
                >
                    {CLEAR_COMPLETED_LABEL}
                </div>
            </div>
        );
    }
}