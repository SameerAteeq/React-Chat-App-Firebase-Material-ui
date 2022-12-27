import React, { useContext, useState } from 'react'
import { SidebarTopBox } from '../../../../style/sidebar'
import { Avatar, Box, Button, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../../firebase'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../../../../context/AuthContext'

const SideBarTop = () => {
    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const handleSearch = async () => {

        const q = query(collection(db, "users"),
            where("displayName", "==", userName))
        try {

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
                console.log(doc.id, " => ", doc.data());
            });
        } catch (err) {
            setErr(true)
            toast.error(err.message)
        }
    }
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }
    const handleSelect = async () => {
        //checking the chat between user exist in firestore, otherwise create
        const combinedId = currentUser.uid > user.uid ?
            currentUser.uid + user.uid :
            user.uid + currentUser.uid;
        try {
            const resp = await getDoc(doc(db, "chats", combinedId))
            if (!resp.exists()) {
                //create the chat in chats collection between users
                await setDoc(doc(db, "chats", combinedId), { messages: [] })

                //create user chat
                await updateDoc(doc(db, "userchats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        // photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
                await updateDoc(doc(db, "userchats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        // photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
            }
        } catch (err) {
            console.log(err.message)
        }
        // setUser(null);
        setUserName("")
    }
    return (
        <>
            <Box sx={{ padding: "14px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <SidebarTopBox>
                    <Typography variant='h4' sx={{ fontWeight: "bold" }} >
                        Chats
                    </Typography>
                    <IconButton size='small'
                        sx={{
                            background: "#fff",
                            "&:hover": { backgroundColor: "#fff" }
                        }} >
                        <Add sx={{ fontSize: "28px", color: '#1379aa' }} />
                    </IconButton>
                </SidebarTopBox>
                <TextField
                    sx={{
                        input: {
                            color: "#fff"
                        }
                    }}
                    placeholder='Search user...'
                    size='small'
                    fullWidth
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onKeyDown={handleKey}
                />

                {err && <p> Not </p>}
                {user &&
                    <>
                        <Box sx={{ cursor: "pointer", }} >
                            <Stack onClick={handleSelect} direction={"row"} alignItems="center" gap="10px" mb={2}>
                                <Avatar src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80' />
                                <Typography sx={{ color: "#fff", fontSize: "18px" }} variant="body2">{user?.displayName}</Typography>
                            </Stack>
                            <Divider />
                        </Box>
                    </>
                }
            </Box>
        </>
    )
}

export default SideBarTop