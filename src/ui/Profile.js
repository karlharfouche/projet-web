import AppFooter from "./modules/views/AppFooter";
import AppHeader from "./modules/views/AppHeader";
import withRoot from "./modules/withRoot";
import React, { Component } from 'react'
import UserProfile from 'react-user-profile'



function Profile() {
  
    return(
        <>
            <AppHeader />
            <AppFooter />
            
        </>
    );
}

export default withRoot(Profile);