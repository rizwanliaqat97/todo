import React from "react";
import { Container } from "@mui/material";
import PageContainer from "../layouts/PageContainer";
import TodoList from "./TodoList";
import EditTodo from "./EditTodo";

const Todos = () => (
  <PageContainer>
    <Container
      disableGutters
      style={{
        width: "60%",
        margin: "3rem auto",
      }}
    >
      <EditTodo saveBtn onSave={() => null} />
      <TodoList />
    </Container>
  </PageContainer>
);

export default Todos;
