import { Box, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { HomeBox, HomeGrid } from '../../style/home'
import Navbar from '../Navbar'
import ChatRoom from './chatRoom'
import EmptyChat from './chatRoom/empty'
import SideBar from './sidebar'

const HomePage = () => {
    const { data } = useContext(ChatContext);
    return (
        <HomeBox>
            <Navbar />
            <HomeGrid >
                <Grid container >
                    <Grid item sx={{ display: { xs: "none", md: 'block' } }} md={4} lg={3} >
                        <SideBar />
                    </Grid>
                    <Grid item xs={12} md={8} lg={9}>
                        {!data?.user.chatId ?
                            <ChatRoom /> : <EmptyChat />
                        }
                    </Grid>
                </Grid>
            </HomeGrid>
        </HomeBox>
    )
}

export default HomePage
