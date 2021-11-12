import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Post({postInfos}) {
    return (
        <div>
            <Card sx={{ m: 3, background: '#3399ff' }}>
                <CardContent>
                <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                        {postInfos.username}
                    </Typography>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        {postInfos.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {postInfos.description}
                    </Typography>
                    
                </CardContent>
                <CardActions>
                    <Button size="small">Show Profile</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Post
