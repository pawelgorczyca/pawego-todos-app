import React from "react";
import './TodosHeader.scss';

const ARROW_DOWN = String.fromCharCode(8964);
const PLACEHOLDER_LABEL = 'What needs to be done?';

export default class TodosHeader extends React.Component {
    render() {
        const { selectAllTodos, handleKeyDown } = this.props;

        return (
        <div className='todos-header'>
            <div className='checked-all' onClick={selectAllTodos}>{ARROW_DOWN}</div>
            <input type="text" onKeyDown={handleKeyDown}  placeholder={PLACEHOLDER_LABEL}/>
        </div>
        )
    }
}
