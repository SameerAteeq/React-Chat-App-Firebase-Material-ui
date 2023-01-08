import { ArrowBack, Close } from '@mui/icons-material'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { ChatContext } from '../../../../context/ChatContext'
import { ChatTopBox } from '../../../../style/chatroom'
import ChatDrawer from '../../../common/drawer'

const ChatTop = () => {
    const { data } = useContext(ChatContext);
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <>
            {data?.user &&
                <>
                    <ChatTopBox>
                        <Stack direction="row" gap="5px" alignItems="center">
                            <IconButton onClick={handleDrawerOpen} sx={{ display: { xs: "block", md: "none" } }}>
                                <ArrowBack />
                            </IconButton>
                            <Avatar src={data?.user?.photoUrl} />
                            <Typography variant='h6'
                                sx={{ color: "#444" }}
                            >
                                {data?.user?.displayName}
                            </Typography>
                        </Stack>
                        <IconButton>
                            <Close />
                        </IconButton>
                    </ChatTopBox>
                    <ChatDrawer {...{ open, setOpen }} />
                </>

            }

        </>
    )
}

export default ChatTop