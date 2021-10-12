import client from "./client";

const USER_SERVICE_PATH = "users";
const TODO_SERVICE_PATH = "todos";
export const TodoService = client.service(TODO_SERVICE_PATH);
export const UserService = client.service(USER_SERVICE_PATH);
