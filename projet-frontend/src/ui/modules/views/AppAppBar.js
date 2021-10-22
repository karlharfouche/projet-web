import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import Button from '../components/Button';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/premium-themes/onepirate/"
            sx={{ fontSize: 24 }}
          >
            {'study buddy'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              color="secondary"
              variant="contained"
              size="medium"
              component="a"
              href="/sign-in"
              sx={{ minWidth: 50, my: 1, mx:1,  borderRadius: 3 }}
            >
              Sign In
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="medium"
              component="a"
              href="/sign-up"
              sx={{ minWidth: 100, my: 1, ml:1, mr: -1, borderRadius: 3 }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
