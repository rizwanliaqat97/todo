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
} from "@mui/material";
import { useEffect, useState } from "react";
import { TodoService } from "../../API/services";
import EditTodo from "./EditTodo";
import { removeTodo, updateTodo } from "./todos_api";

const TodoList = () => {
  const [todos, setTodos] = useState({});
  const [editingId, setEditingId] = useState("");
  const { data = [] } = todos;

  useEffect(() => {
    TodoService.find({ query: { $sort: { createdAt: -1 } } }).then(
      setTodos,
      (error) => console.log("Error in fetching todos")
    );
  }, []);
  useEffect(() => {
    const handleCreate = (todo) => {
      setTodos((old) => ({
        ...old,
        data: [todo, ...old.data],
      }));
    };
    const handlePatched = (todo) => {
      setTodos((old) => ({
        ...old,
        data: old.data.map((item) => (item._id !== todo._id ? item : todo)),
      }));
    };
    const handleRemoved = (todo) => {
      setTodos((old) => ({
        ...old,
        data: old.data.filter((item) => item._id !== todo._id),
      }));
    };

    TodoService.on("created", handleCreate);
    TodoService.on("patched", handlePatched);
    TodoService.on("removed", handleRemoved);
  }, []);

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
