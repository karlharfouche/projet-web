import { withCardon } from "cardon";
import { makeStyles } from "@mui/styles";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Rating } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: "white",
    border: "2px solid #000",
  },
  customBorderRadius: {
    borderRadius: 20,
    width: '20%',
    margin: 'auto',
    marginTop: '10%'
  }
}));

interface Props {
  title: string;
}


export default withCardon<Props, boolean>(function ModalCard({
  visible,
  get,
}) {
  const classes = useStyles();
  return (
    <Modal
      open={visible}
      onClose={get()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper className={classes.customBorderRadius} elevation={15} sx={{ backgroundColor: '#0066cc' }}>
        <Box p={1} >
            <Grid container spacing={2} direction="column" justifyContent="center" sx={{  }}>
                <Grid item xs={12} sx={{ mx: "auto", mt: 3 }}>
                  <TextField required label="Feedback" multiline rows={6} sx={{ backgroundColor: 'white', width: 320, borderRadius: 2 }}/>
                </Grid>
                <Grid item xs={12} sx={{ mx: "auto" }}>
                  <Typography component="legend">Rating:</Typography>
                  <Rating
                    precision={0.5}
                    //value={value}
                    //onChange={(event, newValue) => {setValue(newValue);}}
                  />
                </Grid>
                <Grid item xs={12} sx={{ mx: "auto" }}>
                  <Button variant="contained" color="secondary" sx={{ mx: "auto", mb: 2 }}>Submit</Button>
                </Grid>
            </Grid>
        </Box>
      </Paper>
    </Modal>
  );
});
