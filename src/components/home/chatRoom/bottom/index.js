import { AddPhotoAlternate, Send } from '@mui/icons-material'
import { Box, IconButton, Stack, TextField, Tooltip } from '@mui/material'
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { ChatContext } from '../../../../context/ChatContext';
import { db, storage } from '../../../../firebase';
import { v4 as uuid } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ChatBottom = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const handleSend = async () => {
        if (text === "") {
            return
        }
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                async () => {
                    await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }
        await updateDoc(doc(db, "userchats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, "userchats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        })
        setText("");
        setImg(null);
    }
    const handleKey = (e) => {
        e.code === "Enter" && handleSend();
    }

    return (
        <Stack direction="row"
            sx={{
                p: "10px",
                backgroundColor: "#ddd"
            }}
        >
            <TextField
                placeholder='Type Message...'
                fullWidth
                variant='standard'
                InputProps={{ disableUnderline: true }}
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyDown={handleKey}
            />
            <Stack direction="row" alignItems="center" gap="5px">
                <Tooltip title="Image">
                    <IconButton
                        component="label"
                        sx={{ color: "green" }}>
                        <input
                            onChange={(e) => setImg(e.target.files[0])}
                            type="file"
                            hidden
                            id='file'

                        />
                        <AddPhotoAlternate />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Send">
                    <IconButton onClick={handleSend} sx={{ color: "#1379aa" }}>
                        <Send />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Stack>
    )
}

export default ChatBottom