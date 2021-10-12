import {
  AssignmentLateOutlined,
  AssignmentTurnedInTwoTone,
  Delete,
} from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  ListItemSecondaryAction,
  Typography,
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

    return () => {
      TodoService.off("created", handleCreate);
      TodoService.off("patched", handlePatched);
      TodoService.off("removed", handleRemoved);
    };
  }, []);

  return (
    <Paper
      style={{
        margin: "0.5rem 0rem",
      }}
    >
      {data.length > 0 ? (
        <List>
          {data.map(({ _id, isDone, title }) => (
            <ListItem key={_id}>
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
                <ListItemText
                  primary={title}
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditingId(_id)}
                />
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
      ) : (
        <Typography
          variant="h5"
          height="200px"
          color="GrayText"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          gutterBottom
        >
          <AssignmentLateOutlined sx={{ fontSize: 100, display: "block" }} />
          <div>You have not planned to do anything yet!</div>
        </Typography>
      )}
    </Paper>
  );
};

export default TodoList;
