import { Button, Stack, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CenterBox, ContentBox, RegHeading } from '../../../style/registeration'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import Loading from '../../common/loading';
const Login = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;

                setLoader(false)
                toast.success("You are logged in")
                navigate("/")
            })
            .catch((error) => {
                setLoader(false)
                toast.error(error.message)
            });


    }
    if (loader) return <Loading />
    return (
        <CenterBox>
            <ContentBox>
                <RegHeading variant='h4' align='center'>Login</RegHeading>
                <form onSubmit={handleSubmit} >

                    <Stack direction="column" gap="10px">
                        <TextField
                            placeholder=' Email'
                            type="email"
                            variant='standard'
                            margin='normal'
                        />
                        <TextField
                            placeholder=' Password'
                            type="password"
                            variant='standard'
                            margin='normal'
                        />
                        <Button type="submit" variant='contained'>
                            Sign up
                        </Button>
                        <Typography variant='body2'>Don't have an account?
                            <Link to={"/registration"}>
                                Sign up
                            </Link>
                        </Typography>
                    </Stack>
                </form>
            </ContentBox>
        </CenterBox>
    )
}

export default Login
