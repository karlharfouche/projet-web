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
import { useEffect, useState } from 'react'


function PostProfile({match}) {
    const [user, setUser] = useState({})
    const [feedbacks, setFeedbacks] = useState([])
    const [fetched, setFetched] = useState(false)

    const { params: { name } } = match

    async function getUser(email) {
        const response = await fetch('http://localhost:4000/api/users/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                })
            })
    
        const data = await response.json()
    
        setUser(data)
        setFetched(true)
    }

    async function getFeedbacks() {
        const response = await fetch('http://localhost:4000/api/feedback/get', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

        const data = await response.json()

        console.log(data)

        setFeedbacks(data)
    }

    useEffect(() => {
        getUser(match.params.name)
        getFeedbacks()
	}, [])

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
                        { fetched ? (
                            <div>
                                <Typography sx={{ fontSize: 50, textAlign: 'center' }} color="text.primary" gutterBottom>
                                    {user.firstName} {user.lastName}'s Profile
                                </Typography>
                                <Typography sx={{ fontSize: 20, textAlign: 'center' }} color="text.secondary" gutterBottom>
                                    Majoring in: {user.major} 
                                </Typography>
                                <Typography sx={{ m: 3 }} variant="h5" component="div">
                                    Mail: {user.email}
                                </Typography>
                                <Typography sx={{ m: 3 }} variant="h5" component="div">
                                    Phone Number: {user.number}
                                </Typography>
                                { feedbacks.length != 0 &&
                                <Grid container>
                                    <Grid item xs={'auto'}>
                                        <Typography sx={{ ml: 3 }} variant="h5" component="div">Overall rating: </Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ ml: 1 }}>
                                        <Rating value={getOverallRating(feedbacks.filter(x => x.concerned === match.params.name))} precision={0.5} readOnly/> 
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
                                { feedbacks.filter(x => x.concerned === match.params.name).length == 0 &&
                                <Typography sx={{ m: 3, ml: 5, fontSize: 20 }} color="text.secondary" component="div">
                                    No feedback for this user ...
                                </Typography>
                                }{
                                    feedbacks.map((x) => {
                                        if (x.concerned === match.params.name) {
                                            return(
                                                <Feedback username={x.author} rating={x.rating} feedback={x.feedback}/>
                                            )
                                        }
                                    })   
                                }
                                </div>
                            ):(
                                <Typography sx={{ fontSize: 50, textAlign: 'center' }} color="text.primary" gutterBottom>
                                    Loading ...
                                </Typography>
                            )
                        }
                        
                    </CardContent>
                </Card>
            <AppFooter />
        </>
    );
}

export default withRoot(PostProfile);