import React from 'react';
import { instanceOf } from "prop-types";
import TodosHeader from '../TodosHeader/TodosHeader';
import TodosItem from '../TodosItem/TodosItem';
import TodosFooter from '../TodosFooter/TodosFooter';
import ApiClient from '../../services/Client/ApiClient';

import { withCookies, Cookies } from "react-cookie";
import { v4 as uuidv4 } from 'uuid';

import './TodosList.scss';

const COOKIE_PUBLISHER = 'publisherId';
const TODOS_ALL = 'all';
const ENTER_KEY = 'Enter'

class TodosList extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        const { cookies } = props;
        
        this.state = {
            todos: [],
            publisherId: cookies.get(COOKIE_PUBLISHER) ?? cookies.set(COOKIE_PUBLISHER, uuidv4()),
            todosType: TODOS_ALL
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.selectAllTodos = this.selectAllTodos.bind(this);
        this.selectTodosToDisplay = this.selectTodosToDisplay.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.removeAllCompletedTodos = this.removeAllCompletedTodos.bind(this);
    }

    async handleKeyDown(e) {
        if (e.key === ENTER_KEY) {
            await ApiClient.addItem(e, this.state.publisherId);

            const itemsList = await ApiClient.getItemsList(this.state.publisherId, this.state.todosType);
            this.setState({todos: itemsList});
        }
    }

    async removeTodo(e){
        await ApiClient.removeItem(e, this.state.publisherId);
        const itemsList = await ApiClient.getItemsList(this.state.publisherId, this.state.todosType);

        this.setState({todos: itemsList});
    }

    async selectAllTodos() {
        await ApiClient.selectAllTodos(this.state.todos);

        const itemsList = await ApiClient.getItemsList(this.state.publisherId, this.state.todosType);

        this.setState({todos: itemsList});
    }

    async removeAllCompletedTodos() {
        await ApiClient.removeAllCompletedTodos(this.state.publisherId);

        const itemsList = await ApiClient.getItemsList(this.state.publisherId, this.state.todosType);

        this.setState({todos: itemsList});
    }

    async updateTodo(e, todo , type) {
        await ApiClient.updateTodo(e, todo, type);

        const itemsList = await ApiClient.getItemsList(this.state.publisherId, this.state.todosType);

        this.setState({todos: itemsList});
    }

    async selectTodosToDisplay(e, type) {
        const itemsList = await ApiClient.getItemsList(this.state.publisherId, type);

        this.setState({todos: itemsList, todosType: type});
    }

    generateItemsList() {
        const todosList = this.state.todos;

        return(
            <div className='todos-body'>
                <ul className='todos-items-list'>
                    {todosList.map( (todo) => (
                        <TodosItem 
                            todo={todo} 
                            updateTodo={this.updateTodo} 
                            removeTodo={this.removeTodo} 
                            key={todo._id}
                        />
                    ))}
                </ul>
            </div>
        );
    }

    async componentDidMount() {
        const itemsList = await ApiClient.getItemsList(this.state.publisherId, this.state.todosType);
        this.setState({todos: itemsList});
    }

    render() {
        return (
            <div className='todos-list'>
                <TodosHeader 
                    selectAllTodos={this.selectAllTodos} 
                    handleKeyDown={this.handleKeyDown}
                />
                {this.generateItemsList()}
                <TodosFooter 
                    todos={this.state.todos}
                    todosType={this.state.todosType}
                    selectTodosToDisplay={this.selectTodosToDisplay}
                    removeAllCompletedTodos={this.removeAllCompletedTodos}
                /> 
            </div>
        )
    }
}

export default withCookies(TodosList);