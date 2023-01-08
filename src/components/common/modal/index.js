import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Stack } from '@mui/material';
import { Delete } from '@mui/icons-material';

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

export default function ConfirmationModal({ userId, setuserId, delUser }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div onClick={handleOpen} >
                <Stack direction="row" alignItems="center" padding={1} sx={{ cursor: "pointer" }}>
                    <IconButton >
                        <Delete />
                    </IconButton>
                    <Typography variant='h6'>Delete</Typography>
                </Stack>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography variant='h6'>Are you sure, You want to delete this chat?</Typography>
                    <Stack direction="row" justifyContent="flex-end" alignItems="center" padding={1} gap="10px" >
                        <Button sx={{
                            backgroundColor: "green", color: "#fff", "&:hover": {
                                background: "green"
                            }
                        }} variant='contained' onClick={handleClose}>
                            No
                        </Button>
                        <Button sx={{
                            backgroundColor: "red", color: "#fff", "&:hover": {
                                background: "red"
                            }
                        }} variant='contained' onClick={(e) => { delUser(userId); handleClose() }}>
                            Yes
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}