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

let jsons = [
  {
    id: 1,
    username: 'Karl Harfouche',
    title: 'Help me in CAN IM DYING',
    description: 'Sawaya is destroying us !!!!!!!!!!'
  },
  {
    id: 2,
    username: 'Maroun Ghossain',
    title: 'AO Help',
    description: '        !!!!!!!!!'
  },
  {
    id: 3,
    username: 'Karl Gharios',
    title: 'Help me in ProgFun',
    description: '!!!!!!!!!!'
  },
  {
    id: 4,
    username: '',
    title: 'Help me in Sem 3',
    description: '   !!!!!!!!!!'
  }
]

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

function BasicTabs({props}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let displayJsons = props.map(
    (json) => {
      return(
        <div key={json.id}>
          <Post postInfos={{username: json.username, title: json.title, description: json.description}}></Post>
        </div>
      )
    }
  )

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
          {displayJsons}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <AddRequest />
      <CardonContainer /> 
        <div className='posts'>
          {displayJsons}
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
                <BasicTabs props={jsons} />
            </div>
            <AppFooter />
            
        </>
    );
}

export default withRoot(MainView);