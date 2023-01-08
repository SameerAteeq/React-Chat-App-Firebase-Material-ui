import { MoreVert, VerticalAlignBottom } from '@mui/icons-material';
import { Avatar, Box, IconButton, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import { deleteDoc, deleteField, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { ChatContext } from '../../../../context/ChatContext';
import { db } from '../../../../firebase';
import { LastMessage, SideBarchatBox } from '../../../../style/sidebar'
import PopOver from '../../../common/popover';

const AllUsers = () => {
    const [chats, setChats] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [userId, setuserId] = useState("");
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

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
    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user })
    }
    const handleClick = (id, event) => {
        setAnchorEl(event.currentTarget);
        setuserId(id)
    };
    const delUser = async (userId) => {
        try {
            await deleteDoc(doc(db, "chats", userId));
            await updateDoc(doc(db, "userchats", currentUser.uid), {
                [userId]: deleteField()
            });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <SideBarchatBox>
                <List >
                    {
                        Object?.entries(chats)?.sort((a, b) => b[1] - a[1])?.map((chat) => (
                            <Box
                                key={chat[0]}
                                sx={{
                                    width: "100%",
                                    cursor: "pointer",
                                    "&:hover": { backgroundColor: "#154c79" },
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <ListItem onClick={() => handleSelect(chat[1]?.userInfo)}
                                    sx={{ display: "flex", direction: "row", gap: "10px", mb: "10px" }}
                                >
                                    <Avatar src={chat[1]?.userInfo?.photoURL} />
                                    <Stack direction="column" gap={0}>
                                        <Typography disablePadding sx={{ color: "#fff" }}  >
                                            {chat[1]?.userInfo?.displayName}
                                        </Typography>
                                        <LastMessage variant='body2'  >{chat[1]?.lastMessage?.text}</LastMessage>
                                    </Stack>
                                </ListItem>
                                <IconButton onClick={(e) => handleClick(chat[0], e)}>
                                    <MoreVert sx={{ color: "#fff", fontSize: "18px" }} />
                                </IconButton>
                            </Box>
                        ))
                    }
                </List>
                <PopOver {...{ anchorEl, setAnchorEl, userId, setuserId, delUser }} />

            </SideBarchatBox >
        </>

    )
}

export default AllUsers