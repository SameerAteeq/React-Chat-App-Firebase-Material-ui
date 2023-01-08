import { Logout } from '@mui/icons-material';
import { Avatar, Box, Icon, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { auth } from '../../firebase';
import { NavbarBox } from '../../style/navbar'
import { AuthContext } from "../../context/AuthContext"
import Profile from '../profile';
const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openProfile, setOpenProfile] = React.useState(false);
    const handleOpenProfile = () => setOpenProfile(true);
    const handleCloseProfile = () => setOpenProfile(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box>
            <NavbarBox>
                <Typography variant='h6' sx={{ color: '#fff' }}>
                    {currentUser?.displayName}
                </Typography>
                <IconButton onClick={handleClick}>
                    <Avatar src={currentUser?.photoURL} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleOpenProfile}>
                        <Stack direction="row" alignItems="center" >
                            <Avatar sx={{ height: "100px", width: "70px" }} src={currentUser?.photoURL} />
                            <Stack direction="column" >
                                <Typography variant='h6'>
                                    {currentUser?.displayName}
                                </Typography>
                                <Typography variant='p'> {currentUser?.email}</Typography>
                            </Stack>
                        </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => signOut(auth)}>

                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </NavbarBox>
            <Profile {...{ openProfile, setOpenProfile }} />
        </Box>
    )
}

export default Navbar
