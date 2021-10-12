import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { TodoService } from "../../API/services";

const EditTodo = ({ saveBtn = false, record, onSave }) => {
  const [text, setText] = useState("");
  const { _id, ...rest } = record || {};

  const saveTodo = () => {
    const title = text.trim();
    if (_id && title) {
      TodoService.patch(_id, { ...rest, title }).then(
        (res) => {
          setText("");
          console.log("Todo patched: ", res);
          onSave();
        },
        (error) => console.log("Error in updating todo: ", error)
      );
    } else {
      TodoService.create({ title }).then(
        (res) => {
          setText("");
          console.log("Todo created: ", res);
          onSave();
        },
        (error) => console.log("Error in creating todo: ", error)
      );
    }
  };

  useEffect(() => {
    setText(record?.title || "");
  }, [record]);

  return !!_id ? (
    <TextField
      placeholder="What you want to do?"
      value={text}
      onKeyPress={(e) => (e.code === "Enter" ? saveTodo() : null)}
      onChange={(e) => setText(e.target.value)}
      label="Update title"
      variant="filled"
      onBlur={onSave}
      autoFocus
      fullWidth
    />
  ) : (
    <TextField
      label="What you want to do?"
      variant="outlined"
      value={text}
      onKeyPress={(e) => (e.code === "Enter" ? saveTodo() : null)}
      onChange={(e) => {
        const text = e.target.value;
        setText(text);
      }}
      autoFocus
      fullWidth
    />
  );
};

export default EditTodo;
