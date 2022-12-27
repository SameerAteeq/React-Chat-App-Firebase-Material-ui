import { Box } from '@mui/material'
import React, { useContext } from 'react'
import { ChatContext } from '../../../context/ChatContext'
import { MessagesBox } from '../../../style/chatroom'
import ChatBottom from './bottom'
import EmptyChat from './empty'
import Messages from './messages'
import ChatTop from './top'

const ChatRoom = () => {
    const { data } = useContext(ChatContext);
    return (
        <Box sx={{ background: "#fff", height: "100%", borderRadius: "0 10px 10px 0" }}>
            {data?.user ?
                <>
                    <ChatTop />
                    <Messages />
                    <ChatBottom />
                </> :
                <EmptyChat />


            }
        </Box>
    )
}

export default ChatRoom