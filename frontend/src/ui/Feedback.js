import { Card } from "@mui/material"
import { CardContent } from "@mui/material"
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";

export default function Feedback(props) {
    return (
        <div>
            <Card sx={{ m: 2, background: '#70B7FF' }}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={'auto'}>
                            <Typography component="legend">{props.username}'s rating:</Typography>
                        </Grid>
                        <Grid item xs={2} sx={{ ml: 1 }}>
                            <Rating
                                value={props.rating}
                                readOnly 
                            />  
                        </Grid>
                    </Grid>
                    <Typography variant="h7" sx={{ ml: 2 }}>
                        {props.feedback}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}