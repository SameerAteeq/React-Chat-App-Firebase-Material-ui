import { Box, Typography } from '@mui/material'
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { ChatContext } from '../../../../context/ChatContext';
import { db } from '../../../../firebase';
import { MessageContent, MessageImage, MessagesBox, MessageText } from '../../../../style/chatroom'

const Messages = () => {
    const [msgs, setMsgs] = useState([]);
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({
            behavior: "smooth"
        })
    }, [msgs])
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMsgs(doc.data().messages);
        })

        return () => {
            unSub();
        }
    }, [data.chatId])
    return (
        <>
            <MessagesBox >
                {msgs?.map((m) => (
                    <MessageContent ref={ref} sx={{ alignItems: `${m.senderId === currentUser.uid ? "flex-end" : "flex-start"}` }}>
                        <MessageText
                            sx={{
                                borderRadius: `${m.senderId === currentUser.uid ? "10px 10px 0px 10px" :
                                    "0 10px 10px 10px"}`,
                                backgroundColor: `${m.senderId === currentUser.uid ? "#1379aa" :
                                    "#ddd"}`, color: `${m.senderId === currentUser.uid ? "#ffff" :
                                        "#333"}`
                            }}
                        >
                            {m?.text}
                        </MessageText>
                        {m?.img && <MessageImage src={m?.img} />}
                    </MessageContent>
                ))}
            </MessagesBox>
        </>
    )
}

export default Messages