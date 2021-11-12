import AppHeader from "./modules/views/AppHeader";
import AppFooter from "./modules/views/AppFooter";
import withRoot from "./modules/withRoot";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Post from "./Post";
import '../App.css'
import { CardonContainer } from "cardon";
import AddRequest from './popupForm/Button'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%',flex: 1, bgcolor: 'primary.light' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'primary.main' }}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" variant="fullWidth">
          <Tab label="Need Help" {...a11yProps(0)} />
          <Tab label="Able to Help" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AddRequest />
        <CardonContainer /> 
        <div className='posts'>
          <Post postInfos={{username:'Username', title:'Title',description:'Description'}} />
          <Post postInfos={{username:'Username', title:'Title',description:'Description'}} />

        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <AddRequest />
      <CardonContainer /> 
        <div className='posts'>
          <Post postInfos={{username:'Username', title:'Title',description:'Description'}} />
          
        </div>
      </TabPanel>
    </Box>
  );
}


function MainView() {
    return(
        <>
            <AppHeader />
            <div style={{minHeight: '100vh'}}>
                <BasicTabs />
            </div>
            <AppFooter />
            
        </>
    );
}

export default withRoot(MainView);