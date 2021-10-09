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

// const useStyles = makeStyles((theme) => ({
//   main: {
//     width: "60%",
//     [theme.breakpoints.down("md")]: {
//       width: "80%",
//     },
//     [theme.breakpoints.down("xs")]: {
//       width: "100%",
//     },
//     margin: "auto",
//   },
//   searchPaper: {
//     padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
//   },
//   list: {
//     margin: `${theme.spacing(2)}px 0rem ${theme.spacing(2)}px`,
//     padding: `${theme.spacing(1)}px ${theme.spacing(1)}px 0rem`,
//   },
// }));

const todos = [{ id: 1, isDone: false, title: "Do stuff" }];
const TodoList = () => {
  const [text, setText] = useState("");

  return (
    <PageContainer>
      <Container disableGutters style={{
        width: "60%",
        margin: "auto",
      }}>
        <Paper style={{
          padding: "0.25rem 0.5rem",
        }}>
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
            // onKeyPress={(e) => (e.code === "Enter" ? addTodo() : null)}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
        </Paper>
        <Paper hidden={!todos.length} style={{
          margin: "0.5rem 0rem 0.5rem",
          padding: "0.25rem 0.25rem 0rem",
        }}>
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
