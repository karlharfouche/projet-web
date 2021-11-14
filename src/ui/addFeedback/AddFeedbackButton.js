import ModalCard from "./AddFeedbackForm";
import "./styles.css";
import React from "react";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import TextField from "../modules/components/TextField";

export default function AddFeedbackButton() {
  const [result, setResult] = React.useState();
  const [title, setTitle] = React.useState("My Modal Title");

  const onClick = async () => {
    let result = await ModalCard.show({ title });
    setResult(result);
  };

  return (
    <div>
      <Button variant="contained" onClick={onClick} color="secondary" alignItems="center" sx={{ borderRadius: 2 }}>
        Add a feedback
      </Button>
    </div>
  );
}
