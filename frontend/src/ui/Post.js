import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'



function Post({postInfos}) {
    const [user, setUser] = useState({})

    async function handleDelete() {
        const response = await fetch('http://localhost:4000/api/posts/delete/userDel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: postInfos._id,
            })
        })
        
        const res = await response.json()

        window.location.reload()

        console.log(res)
    }

    useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const userr = jwt.decode(token)
            setUser(userr.email)
        }
	}, [])

    return (
        <div>
            <Card sx={{ m: 3, background: '#3399ff' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                        {postInfos.username}
                    </Typography>
                    <Typography sx={{ fontSize: 25 }} color="text.primary" gutterBottom>
                        {postInfos.title}
                    </Typography>
                    <Typography sx={{ fontSize: 20 }} color="text.primary" variant="h5" component="div">
                        {postInfos.description}
                    </Typography>
                    <Typography sx={{ fontSize: 17 }} color="text.secondary" variant="h5" component="div">
                        {postInfos.price} L.L.
                    </Typography>
                </CardContent>
                <CardActions>
                    { postInfos.author === user ?
                        <Button size="small" onClick={handleDelete} sx={{mr:"auto", color:"red"}}>Delete Post</Button>
                    :
                        <Button size="small" href={"/profile" + postInfos.author} sx={{mr:"auto"}}>Show Profile</Button>
                    }
                    <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
                        {postInfos.date.substring(0, 10)}
                    </Typography>
                </CardActions>
            </Card>
        </div>
    )
}

export default Post
