import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AuthContext } from '../../context/AuthContext';
import { Avatar, Stack, TextField } from '@mui/material';
import { db, storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { async, uuidv4 } from '@firebase/util';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3
};

export default function Profile({ openProfile, setOpenProfile }) {
    const { currentUser } = React.useContext(AuthContext);
    const [userImg, setUserImg] = React.useState('');
    const [btnLoad, setbtnLoad] = React.useState(null);
    const handleClose = () => setOpenProfile(false);
    const uploadImage = async (e) => {
        e.preventDefault();
        const date = new Date().getTime();
        const storageRef = ref(storage, `${currentUser.displayName + date} `);
        const uploadTask = uploadBytesResumable(storageRef, userImg);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setbtnLoad(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;

                    // ...

                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    try {
                        await updateProfile(currentUser, {
                            photoURL: downloadURL,
                        });
                    } catch (err) {
                        console.log(err);
                    }
                });
            }
        );

    }
    console.log(userImg, "img")
    console.log(currentUser, "user")
    return (
        <div>
            <Modal
                open={openProfile}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={uploadImage}>
                        <Stack direction="column" gap="20px">
                            <Typography variant='h6'>Your Profile</Typography>

                            <Stack direction="row" alignItems="center" gap="10px">
                                <Avatar sx={{ width: "70px", height: "70px" }} src={currentUser?.photoURL} />
                                <Button variant='text' size='small' component="label">
                                    Update profile
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => setUserImg(e.target.files[0])}
                                    />
                                </Button>
                            </Stack>
                            <TextField
                                value={currentUser?.displayName}
                                size="small"
                                fullWidth
                            />
                            <TextField
                                value={currentUser?.email}
                                size="small"
                                fullWidth
                            />
                            {/* <p>{}</p> */}
                            <Button disabled={btnLoad !== null && btnLoad < 100} type='submit' variant='contained' align="left">
                                Update Profile
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}