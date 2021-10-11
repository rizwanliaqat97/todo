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
  Snackbar,
  Alert,
  Slide,
} from "@mui/material";
import { Delete, PostAdd } from "@mui/icons-material";
import PageContainer from "../layouts/PageContainer";
import { TodoService } from "../../API/services";
import { useQuery, useQueryClient } from "react-query";

const TodoList = () => {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");
  const [message, setMessage] = useState({
    text: "",
    open: false,
    severity: "warning",
  });

  const addTodo = () => {
    TodoService.create({ title: text }).then(
      (res) => {
        setText("");
        console.log("Todo created: ", res);
      },
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
  const fetchQueries = () => TodoService.find();

  const { data: todos = {} } = useQuery("todos", fetchQueries, {
    onError: (e) =>
      setMessage({
        open: true,
        text: "Could not fetch todos",
        severity: "error",
      }),
  });
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
    <>
      <PageContainer>
        <Container
          disableGutters
          style={{
            width: "60%",
            margin: "5rem auto",
          }}
        >
          <Paper
            style={{
              padding: "0.5rem",
            }}
          >
            <InputBase
              placeholder="What you want to do?"
              endAdornment={
                <InputAdornment position="end" onClick={addTodo}>
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
                <ListItem key={_id}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isDone}
                      onChange={() => updateTodo(_id, { isDone: !isDone })}
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

      <Snackbar
        autoHideDuration={2000}
        open={message.open}
        onClose={() => setMessage((old) => ({ ...old, open: false }))}
        TransitionComponent={Slide}
      >
        <Alert severity={message.severity} elevation={6} variant="filled">
          {message.text}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TodoList;
