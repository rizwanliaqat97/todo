import { TodoService } from "../../API/services";

export const removeTodo = (_id) => {
  TodoService.remove(_id).catch((error) =>
    console.log("Error in removing todo: ", error)
  );
};
export const updateTodo = (_id, data) => {
  TodoService.patch(_id, data).catch((error) =>
    console.log("Error in updating todo: ", error)
  );
};
