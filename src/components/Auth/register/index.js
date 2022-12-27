import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../../firebase'
import { CenterBox, ContentBox, RegHeading, RegistrationContentBox } from '../../../style/registeration'
import { doc, setDoc } from "firebase/firestore";
import Loading from '../../common/loading'
const Rigestration = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({ name: "", email: "" })
    const [paswrd, setPswrd] = useState("")
    const handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        try {
            const resp = await createUserWithEmailAndPassword(auth, email, password)

            //updating user profile...

            try {
                await updateProfile(resp.user, {
                    displayName
                })

                //uploading user to the firestore.....

                await setDoc(doc(db, "users", resp.user.uid), {
                    uid: resp.user.uid,
                    displayName,
                    email
                });

                //Empty user on userChat
                await setDoc(doc(db, "userchats", resp.user.uid), {})
                toast.success("Account successfully created")
                setLoader(false);
                navigate("/login")
                console.log(resp)
            } catch (err) {
                console.log(err);
            }
        }
        catch (err) {
            setLoader(false);
            toast.error(err.message)
        }
    }
    if (loader) return <Loading />
    return (
        <CenterBox>
            <ContentBox  >
                <RegHeading align='center' variant='h6' mb={2}> Registration</RegHeading>
                <form onSubmit={handleSubmit} >
                    <Stack direction="column" gap="10px">
                        <TextField
                            placeholder=' Name'
                            type="text"
                            variant='standard'
                            margin='normal'
                        // value={data.name}
                        // onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
                        />
                        <TextField
                            placeholder='Email'
                            type="email"
                            variant='standard'
                            margin='normal'
                        // value={data.email}
                        // onChange={(e) => setData(pre => ({ ...pre, email: e.target.value }))}
                        />
                        <TextField
                            placeholder=' Password'
                            type="password"
                            variant='standard'
                            margin='normal'
                        // value={paswrd}
                        // onChange={(e) => setPswrd(e.target.value)}
                        />
                        <Button type='submit' variant='contained'>
                            Sign up
                        </Button>
                        <Typography variant='body2'>Already have an account?
                            <Link to={"/login"}>Login</Link>
                        </Typography>
                    </Stack>
                </form>
            </ContentBox>
        </CenterBox>
    )
}

export default Rigestration
