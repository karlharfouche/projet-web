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
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import { InputAdornment } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",

    // width: 400,
    backgroundColor: "white",
    border: "2px solid #000",

    // padding: theme.spacing(2, 4, 3)
  },
  customBorderRadius: {
    borderRadius: 20,
    width: '30%',
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
      <Paper className={classes.customBorderRadius} elevation={15} sx={{ backgroundColor: '#0066cc' }}>
        <Box p={1} >
            <Grid container spacing={2} direction="column" justifyContent="center" sx={{  }}>
                <Grid item xs={12} sx={{ mx: "auto", mt: 3 }}>
                    <TextField required label="Title" sx={{ backgroundColor: 'white', width: 300, borderRadius: 2 }}/>
                </Grid>
                <Grid item xs={12} sx={{ mx: "auto" }}>
                    <TextField required label="Description" multiline rows={6} sx={{ backgroundColor: 'white', width: 300, borderRadius: 2 }}/>
                </Grid>
                <Grid item xs={12} sx={{ mx: "auto" }}>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount" sx={{ color: 'white' }}>Fees (Optional)</InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      //value={values.amount}
                      //onChange={handleChange('amount')}
                      startAdornment={<InputAdornment position="start">&nbsp;$</InputAdornment>}
                      sx={{ width: 300, backgroundColor: 'white', borderRadius: 2 }}
                    />
                  </FormControl>
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
