import React, { useState } from "react";
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

const todos = [{ id: 1, isDone: false, title: "Do stuff" }];
const TodoList = () => {
  const [text, setText] = useState("");

  const addTodo = () => {
    TodoService.create({ title: text }).then(
      (res) => console.log("Todo created: ", res),
      (error) => console.log("Error in creating todo: ", error)
    );
  };

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
          hidden={!todos.length}
          style={{
            margin: "0.5rem 0rem 0.5rem",
            padding: "0.25rem 0.25rem 0rem",
          }}
        >
          <List>
            {todos.map(({ id, isDone, title }) => (
              <ListItem
                key={id}
                button
                divider
              // onClick={(e) => updateState(id, !isDone)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isDone}
                  // onChange={() => updateState(id, !isDone)}
                  />
                </ListItemIcon>
                <ListItemText primary={title} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                  // onClick={() => doRemoveTodo(id)}
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
