import { TodoService } from "../../API/services";

export const fetchTodos = () => TodoService.find();
