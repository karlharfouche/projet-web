import React, { useEffect, useState } from 'react'
import AppHeader from "./modules/views/AppHeader"
import AppFooter from "./modules/views/AppFooter"
import withRoot from "./modules/withRoot"
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Post from "./Post"
import '../App.css'
import { CardonContainer } from "cardon"
import AddRequest from './popupForm/Button'
import AddRequest1 from './popupForm1/Button'
import { useHistory } from 'react-router-dom'
import jwt from 'jsonwebtoken'

let jsons = [
  {
    id: 1,
    username: 'Karl Harfouche',
    title: 'Help in CAN',
    description: 'Need help in CAN for a TC next monday',
    price: "100,000 LBP",
    date: '14/11/2021'
  },
  {
    id: 2,
    username: 'Maroun Ghossain',
    title: 'Web development',
    description: 'Need a web developer for a small project 2-3 weeks',
    price: "1,000,000 LBP",
    date: '10/11/2021'
  },
  {
    id: 3,
    username: 'Karl Gharios',
    title: 'Programmation Fonctionelle',
    description: 'Need help for a TP ',
    price: "200,000 LBP",
    date: '9/11/2021'
  },
  {
    id: 4,
    username: 'Ralph Hallal',
    title: 'Graphic Design',
    description: 'Graphic Designer needed to make a logo for a startup',
    price: "200,000 LBP",
    date: '9/11/2021'
  }
]

let jsons1 = [
  {
    id: 1,
    username: 'Karl Harfouche',
    title: 'I can help in web',
    description: 'Experience in web development',
    price: "500,000 LBP",
    date: '14/11/2021'
  },
  {
    id: 2,
    username: 'Maroun Ghossain',
    title: 'Can help in python',
    description: 'Contact me if you need any help in info1, info2 and info3',
    price: "150,000 LBP",
    date: '13/11/2021'
  },
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

function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  let need = props.posts.map(
    (json) => {
      if (json.type === "need") {
        return(
          <div key={json.id}>
            <Post postInfos={{username: json.username, title: json.title, description: json.description, price: json.fees, date: json.createdOn}}></Post>
          </div>
        )
      }
    }
  )

  let able = props.posts.map(
    (json) => {
      if (json.type === "able") {
        return(
          <div key={json.id}>
            <Post postInfos={{username: json.username, title: json.title, description: json.description, price: json.fees, date: json.createdOn}}></Post>
          </div>
        )
      }
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
          {need}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddRequest1 />
        <CardonContainer /> 
        <div className='posts'>
          {able}
        </div>
      </TabPanel>
    </Box>
  );
}


function MainView() {
  const history = useHistory()
  const [posts, setPosts] = React.useState([])

  async function getPosts() {
    const response = await fetch('http://localhost:4000/api/posts/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

    const data = await response.json()

    setPosts(data)
  }

  useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const userLoggedIn = jwt.decode(token)
			if (!userLoggedIn) {
				localStorage.removeItem('token')
				history.replace('/sign-in')
      }
		}
    getPosts()
    console.log(posts)
	}, [])
  
  return(
      <>
          <AppHeader />
            <div style={{minHeight: '100vh'}}>
                <BasicTabs posts={posts}/>
            </div>
          <AppFooter />
          
      </>
  );
}

export default withRoot(MainView);