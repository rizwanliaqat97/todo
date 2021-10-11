import { Delete } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  ListItemSecondaryAction,
  ListItemButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { TodoService } from "../../API/services";
import EditTodo from "./EditTodo";
import { fetchTodos } from "./todos_api";

const TodoList = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState("");

  const removeTodo = (_id) => {
    TodoService.remove(_id).catch((error) =>
      console.log("Error in removing todo: ", error)
    );
  };
  const updateTodo = (_id, data) => {
    TodoService.patch(_id, data).catch((error) =>
      console.log("Error in updating todo: ", error)
    );
  };

  const { data: todos = {} } = useQuery("todos", fetchTodos);
  const { data = [] } = todos;

  useEffect(() => {
    const handleCreate = (todo) => {
      queryClient.setQueryData("todos", (old) => ({
        ...old,
        data: [todo, ...old.data],
      }));
    };
    const handlePatched = (todo) => {
      queryClient.setQueryData("todos", (old) => ({
        ...old,
        data: old.data.map((item) => (item._id !== todo._id ? item : todo)),
      }));
    };
    const handleRemoved = (todo) => {
      queryClient.setQueryData("todos", (old) => ({
        ...old,
        data: old.data.filter((item) => item._id !== todo._id),
      }));
    };

    TodoService.on("created", handleCreate);
    TodoService.on("patched", handlePatched);
    TodoService.on("removed", handleRemoved);
  }, [queryClient]);

  return (
    <Paper
      hidden={!data.length}
      style={{
        margin: "0.5rem 0rem 0.5rem",
        padding: "0.25rem 0.25rem 0rem",
      }}
    >
      <List>
        {data.map(({ _id, isDone, title }) => (
          <ListItem key={_id} onClick={() => setEditingId(_id)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={isDone}
                onChange={() => updateTodo(_id, { isDone: !isDone })}
              />
            </ListItemIcon>
            {editingId === _id ? (
              <EditTodo
                record={{ _id, isDone, title }}
                onSave={() => setEditingId("")}
              />
            ) : (
              <ListItemText primary={title} style={{ cursor: "pointer" }} />
            )}
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => removeTodo(_id)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TodoList;
