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
import { useLocation } from 'react-router-dom'
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

  const location = useLocation()
  const concerned = location.pathname.substring(8, location.pathname.length)
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState<number | null>(0)
  const [author, setAuthor] = useState('')

  async function handleSubmit() {

    console.log('hhihihihi')
  
    const response = await fetch('http://localhost:4000/api/feedback/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author,
        feedback, 
        rating,
        concerned,
      })
    })
  
    const data = await response.json()

    setFeedback('')
    setRating(0)
    setAuthor('')
    window.location.reload()

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
            <Grid container spacing={2} direction="column" justifyContent="center">
                <Grid item xs={12} sx={{ mx: "auto", mt: 5 }}>
                  <TextField required value={feedback} onChange={(event) => {setFeedback(event.target.value)}} label="Feedback" multiline rows={6} sx={{ backgroundColor: 'white', width: 320, borderRadius: 2 }}/>
                </Grid>
                <Grid item xs={12} sx={{ mx: "auto" }}>
                  <Typography component="legend">Rating:</Typography>
                  <Rating
                    precision={0.5}
                    value={rating}
                    onChange={(event, newValue: number | null) => {
                      setRating(newValue);
                    }}
                  />
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
