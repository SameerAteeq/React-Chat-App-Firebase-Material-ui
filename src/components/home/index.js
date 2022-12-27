import { Box, Grid } from '@mui/material'
import React from 'react'
import { HomeBox, HomeGrid } from '../../style/home'
import Navbar from '../Navbar'
import ChatRoom from './chatRoom'
import SideBar from './sidebar'

const HomePage = () => {
    return (
        <HomeBox>
            <Navbar />
            <HomeGrid >
                <Grid container height={"100%"}>
                    <Grid item sx={{ display: { xs: "none", md: 'block' } }} md={4} lg={3} >
                        <SideBar />
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        <ChatRoom />
                    </Grid>
                </Grid>
            </HomeGrid>
        </HomeBox>
    )
}

export default HomePage
