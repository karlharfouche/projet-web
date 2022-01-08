import { withCardon } from "cardon";
import { makeStyles } from "@mui/styles";
import { Modal } from "@mui/material";
import { Button } from "@mui/material";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Grid } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Input } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: "white",
    border: "2px solid #000",
  },
  customBorderRadius: {
    borderRadius: 20,
    width: '25%',
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

  const type = 'need'
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fees, setFees] = useState(0)
  const [author, setAuthor] = useState('')

  async function handleSubmit() {
  
    const response = await fetch('http://localhost:4000/api/posts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author,
        title,
        description,
        fees,
        type,
      })
    })
  
    const data = await response.json()

    console.log(data)

  }

  useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const userr: any = jwt.decode(token)
      setAuthor(userr.email)
        }
	}, [])

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
                    <TextField required value={title} onChange={(event) => {setTitle(event.target.value)}} label="Title" sx={{ backgroundColor: 'white', width: 300, borderRadius: 2 }}/>
                </Grid>
                <Grid item xs={12} sx={{ mx: "auto" }}>
                    <TextField required value={description} onChange={(event) => {setDescription(event.target.value)}} label="Description" multiline rows={6} sx={{ backgroundColor: 'white', width: 300, borderRadius: 2 }}/>
                </Grid>
                <Grid item xs={12} sx={{ mx: "auto" }}>
                  <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount" sx={{ color: 'white' }}>Fees (Optional)</InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      value={fees}
                      onChange={(event) => {setFees(parseInt(event.target.value))}}
                      startAdornment={<InputAdornment position="start">&nbsp;LBP</InputAdornment>}
                      sx={{ width: 300, backgroundColor: 'white', borderRadius: 2 }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ mx: "auto" }}>
                  <Button onClick={handleSubmit} variant="contained" color="secondary" sx={{ mx: "auto", mb: 2 }}>Submit</Button>
                </Grid>
            </Grid>
        </Box>
      </Paper>
    </Modal>
  );
});
