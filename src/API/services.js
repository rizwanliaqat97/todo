import client from './client'

const TODO_SERVICE_PATH = "todos";
export const TodoService = client.service(TODO_SERVICE_PATH);
