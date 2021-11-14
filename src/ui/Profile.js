import AppFooter from "./modules/views/AppFooter";
import AppHeader from "./modules/views/AppHeader";
import withRoot from "./modules/withRoot";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Feedback from "./Feedback";
import { ResetTvRounded } from "@mui/icons-material";

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
                        {
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