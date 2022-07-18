import React from "react";
import './TodosItem.scss';

const COMPLETED_CLASS = 'completed';

export default class TodosItem extends React.Component {
    render() {
        const { todo, updateTodo, removeTodo } = this.props;

        return (
            <li className='todos-item'>
                <div className="completed"><input type="checkbox" onChange={(e) => updateTodo(e, todo, 'complete')} checked={todo.completed}/></div>
                <input className={`value ${todo.completed ? COMPLETED_CLASS : ''}`} type="text" onChange={e =>updateTodo(e, todo, 'value')}  defaultValue={todo.value}/>
                <div className="delete" onClick={removeTodo} name={todo._id}>&times;</div>
            </li>
        )
    }
};