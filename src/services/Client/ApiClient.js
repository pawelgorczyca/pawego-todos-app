import axios from "axios";
import TodosConfig from "../../configs/TodosConfig";

export default class ApiClient {

    static async getItemsList(publisherId, todosType) {
        try {
            const response = await axios.get(`${TodosConfig.API_HOST}${TodosConfig.API_GET_ALL}${publisherId}${TodosConfig.API_TODOS_TYPE}${todosType}`);
            
            return response?.data?.data;
        } catch(error) {
            console.error(error);
        }
        
        return [];
    }

    static async removeItem(e, publisherId) {
        try {
            const response = await axios.post(`${TodosConfig.API_HOST}${TodosConfig.API_REMOVE}`, { id: e.currentTarget.getAttribute("name"), publisherId: publisherId });
            
            return response?.data;
        } catch (error) {
            console.error(error);
        }

        return {}
    }

    static async addItem(e, publisherId) {
        const value = e.currentTarget.value;
        e.currentTarget.value = '';

        try {
            const response = await axios.post(`${TodosConfig.API_HOST}${TodosConfig.API_ADD}`, { value: value, publisherId: publisherId });
            
            return response?.data;
        } catch (error) {
            console.error(error);
        }

        return {};
    }

    static async selectAllTodos(todosList) {
        const updateCompleted = todosList.find((todo) => todo.completed === false) === undefined ? false : true;

        try {
            const responseList = [];
            if (todosList) {
                todosList.map( async (todo) => {
                    const response = await axios.post(`${TodosConfig.API_HOST}${TodosConfig.API_UPDATE}`,{publisherId: todo.publisherId, value:todo.value, id: todo._id, completed: updateCompleted});
                    responseList.push(response?.data);
                });

                return responseList;
            }
        } catch (error) {
            console.error(error);
        }

        return [];
    }

    static async removeAllCompletedTodos(publisherId) {
        try {
            const response = await axios.post(`${TodosConfig.API_HOST}${TodosConfig.API_REMOVE_ALL_COMPLETED}`, { publisherId: publisherId });
            
            return response?.data;
        } catch (error) {
            console.error(error);
        }

        return {};

    }

    static async updateTodo(e, todo, type) {
        const TODOS_UPDATE_TYPE = {
            'value': this.updateTodoValue,
            'complete': this.updateTodoComplete,
        }

        TODOS_UPDATE_TYPE[type](e, todo);
    }

    static async updateTodoComplete(e, todo) {
        try {
            const response = await axios.post(`${TodosConfig.API_HOST}${TodosConfig.API_UPDATE}`,{ publisherId: todo.publisherId, value:todo.value, id: todo._id, completed: !todo.completed });

            return response?.data;
        }catch (error) {
            console.error(error);
        }

        return {};
    }

    static async updateTodoValue(e, todo) {
        const value = e.currentTarget.value;

        try {
            const response = await axios.post(`${TodosConfig.API_HOST}${TodosConfig.API_UPDATE}`,{ publisherId: todo.publisherId, id: todo._id, completed: todo.completed, value: value });

            return response?.data;
        }catch (error) {
            console.error(error);
        }

        return {};
    }
}

