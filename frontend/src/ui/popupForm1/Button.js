import ModalCard from "./ModalCard";
import "./styles.css";
import React from "react";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import TextField from "../modules/components/TextField";

export default function AddRequest1() {
  const [result, setResult] = React.useState();
  const [title, setTitle] = React.useState("My Modal Title");

  const onClick = async () => {
    let result = await ModalCard.show({ title });
    setResult(result);
  };

  return (
    <div className="App">
      <Grid container direction="column" justify="center" alignItems="center">
        <br />
        <Button variant="contained" onClick={onClick} color="secondary" alignItems="center" sx={{ borderRadius: 2 }}>
          Add a request
        </Button>
      </Grid>
      <br />
    </div>
  );
}
