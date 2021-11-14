import AppFooter from "./modules/views/AppFooter";
import AppHeader from "./modules/views/AppHeader";
import withRoot from "./modules/withRoot";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Feedback from "./Feedback";
import Rating from '@mui/material/Rating';
import { Grid } from "@mui/material";
import AddFeedbackButton from "./addFeedback/AddFeedbackButton"
import { CardonContainer } from "cardon";
import Box from "@mui/material/Box"

let feedbacks = [
    {
        username: "Maroun Ghossain",
        rating: 5,
        feedback: "Best teacher ever!"
    },
    {
        username: "Karl Gharios",
        rating: 4,
        feedback: "Helped me in C++"
    },
    {
        username: "Ralph Hallal",
        rating: 5,
        feedback: "Without him I can't do anything by myself"
    },
]

function Profile() {

    let getOverallRating = (list) => {
        let acc = 0
        let nb = 0
        list.map((json) => {
            nb += 1
            acc += json.rating
        })
        return acc/nb
    }
  
    return(
        <>
            <AppHeader />
                <Card sx={{ mx: '20%', my: '3%', minHeight: '75vh', background: '#3399ff', borderRadius: 4 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 50, textAlign: 'center' }} color="text.primary" gutterBottom>
                            Karl Harfouche's Profile
                        </Typography>
                        <Typography sx={{ fontSize: 20, textAlign: 'center' }} color="text.secondary" gutterBottom>
                            Majoring in: GIC 
                        </Typography>
                        <Typography sx={{ m: 3 }} variant="h5" component="div">
                            Mail: karl.harfouche@net.usj.edu.lb
                        </Typography>
                        <Typography sx={{ m: 3 }} variant="h5" component="div">
                            Phone Number: +961 76 198 781
                        </Typography>
                        { feedbacks.length != 0 &&
                        <Grid container>
                            <Grid item xs={'auto'}>
                                <Typography sx={{ ml: 3 }} variant="h5" component="div">Overall rating: </Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ ml: 1 }}>
                                <Rating value={getOverallRating(feedbacks)} precision={0.5} readOnly/> 
                            </Grid>
                        </Grid> 
                        }
                        <Grid container spacing={5} sx={{ mb: 3 }}>
                            <Grid item xs sx={{ mt: 2 }}>
                                <Typography sx={{ m: 3, display: "inline" }} variant="h5" component="div">Feedbacks:</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <AddFeedbackButton />
                                <CardonContainer /> 
                            </Grid>
                        </Grid>
                        { feedbacks.length == 0 &&
                        <Typography sx={{ m: 3, ml: 5, fontSize: 20 }} color="text.secondary" component="div">
                            No feedback for this user ...
                        </Typography>     
                        }{
                            feedbacks.map((x) => {
                                return(
                                    <Feedback username={x.username} rating={x.rating} feedback={x.feedback}/>
                                )
                            })   
                        }
                    </CardContent>
                </Card>
            <AppFooter />
        </>
    );
}

export default withRoot(Profile);