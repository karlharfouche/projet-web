import { withCardon } from "cardon";
import { makeStyles } from "@mui/styles";
import { Modal } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import Typography from "../modules/components/Typography";
import { Box, maxWidth, width } from "@mui/system";
import { Padding } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",

    // width: 400,
    backgroundColor: "white",
    border: "2px solid #000",

    // padding: theme.spacing(2, 4, 3)
  },
  customBorderRadius: {
    borderRadius: 25,
    width: '60%',
    margin: 'auto',
    marginTop: '20%'
  }
}));

interface Props {
  title: string;
}

export default withCardon<Props, boolean>(function ModalCard({
  visible,
  get,
  title
}) {
  const classes = useStyles();
  return (
    <Modal
      open={visible}
      onClose={get()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper className={classes.customBorderRadius} elevation={15}>
        <Box p={1}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField required id="outlined-required" label="Title" />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-multiline-static" label="Multiline" multiline rows={4} />
                </Grid>
            </Grid>
        </Box>
      </Paper>
    </Modal>
  );
});
