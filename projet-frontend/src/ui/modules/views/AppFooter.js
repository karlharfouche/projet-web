import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';

function Copyright() {
  return (
    <React.Fragment>
      <Box component='img' src="https://cdn-icons-png.flaticon.com/512/733/733609.png" sx={{maxWidth: '10%', mx:1, my:-0.6}}/>
      <Link color="inherit" href="https://github.com/karlharfouche/projet-web">
        Github Repo
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}


export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ display: 'flex', bgcolor: 'primary.main' }}
    >
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 30 }}
            >
              
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </Container>
    </Typography>
  );
}
