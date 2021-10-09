import React, { useEffect, useState } from "react";
import {
  Checkbox,
  IconButton,
  InputBase,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  ListItemSecondaryAction,
  Container,
} from "@mui/material";
import { Delete, PostAdd } from "@mui/icons-material";
import PageContainer from "./Layouts/PageContainer";
import { TodoService } from "../API/services";

const TodoList = () => {
  const [todos, setTodos] = useState({});
  const [text, setText] = useState("");
  const { data = [] } = todos;

  const addTodo = () => {
    TodoService.create({ title: text }).then(
      (res) => console.log("Todo created: ", res),
      (error) => console.log("Error in creating todo: ", error)
    );
  };
  const updateTodo = (_id, data) => {
    TodoService.patch(_id, data).catch((error) =>
      console.log("Error in updating todo: ", error)
    );
  };
  const removeTodo = (_id) => {
    TodoService.remove(_id).catch((error) =>
      console.log("Error in removing todo: ", error)
    );
  };

  useEffect(() => {
    TodoService.find().then((res) => setTodos(res));
  }, []);

  useEffect(() => {
    const handleCreate = (todo) => {
      setTodos((old) => ({ ...old, data: [todo, ...old.data] }));
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
    <PageContainer>
      <Container
        disableGutters
        style={{
          width: "60%",
          margin: "auto",
        }}
      >
        <Paper
          style={{
            padding: "0.25rem 0.5rem",
          }}
        >
          <InputBase
            placeholder="What you want to do?"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <PostAdd />
                </IconButton>
              </InputAdornment>
            }
            value={text}
            onKeyPress={(e) => (e.code === "Enter" ? addTodo() : null)}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
        </Paper>
        <Paper
          hidden={!data.length}
          style={{
            margin: "0.5rem 0rem 0.5rem",
            padding: "0.25rem 0.25rem 0rem",
          }}
        >
          <List>
            {data.map(({ _id, isDone, title }) => (
              <ListItem
                key={_id}
                button
                divider
                onClick={(e) => updateTodo(_id, { isDone: !isDone })}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isDone}
                    onChange={() => updateTodo(_id, !isDone)}
                  />
                </ListItemIcon>
                <ListItemText primary={title} />
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
      </Container>
    </PageContainer>
  );
};

export default TodoList;
