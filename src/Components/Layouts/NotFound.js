import { Alert } from "@mui/material";

const NotFound = () => {
  return (
    <div
      style={{
        marginTop: "10rem",
      }}
    >
      <Alert severity="warning" variant="filled" style={{ margin: "1.5rem" }}>
        404 - Not Found
      </Alert>
    </div>
  );
};

export default NotFound;
