import { Avatar, Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { ChatContext } from '../../../../context/ChatContext';
import { db } from '../../../../firebase';
import { SideBarchatBox } from '../../../../style/sidebar'

const AllUsers = () => {
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
            return () => {
                unsub();
            }
        }
        currentUser?.uid && getChats()
    }, [currentUser.uid])
    console.log("Current data: ", chats);
    console.log("Current data entries: ", Object?.entries(chats)?.sort((a, b) => b[1] - a[1]));
    const handleSelect = (user) => [
        dispatch({ type: "CHANGE_USER", payload: user })
    ]
    return (
        <>
            <SideBarchatBox>


                <List >
                    {
                        Object?.entries(chats)?.sort((a, b) => b[1] - a[1])?.map((chat) => (
                            <Box sx={{ padding: '5px', width: "100%", cursor: "pointer", "&:hover": { backgroundColor: "skyblue" } }}>

                                <ListItem onClick={() => handleSelect(chat[1]?.userInfo)}
                                    key={chat[0]}
                                    disablePadding
                                    sx={{ display: "flex", direction: "row", gap: "10px", mb: "10px" }}
                                >
                                    <Avatar src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80' />
                                    <Stack direction="column" gap={0}>
                                        <Typography disablePadding sx={{ color: "#fff" }}  >{chat[1]?.userInfo?.displayName}</Typography>
                                        <Typography variant='body2' sx={{
                                            display: "-webkit-box",
                                            "-webkit-box-orient": "vertical",
                                            color: "#333", overflow: "hidden",
                                            "-webkit-line-clamp": "1"
                                        }} >{chat[1]?.lastMessage?.text}</Typography>
                                    </Stack>
                                </ListItem>
                            </Box>

                        ))
                    }
                </List>

            </SideBarchatBox >
        </>

    )
}

export default AllUsers