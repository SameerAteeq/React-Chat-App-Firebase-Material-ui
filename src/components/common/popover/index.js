import Popover from '@mui/material/Popover';
import { useState } from 'react';
import ConfirmationModal from '../modal';

export default function PopOver({ anchorEl, setAnchorEl, userId, setuserId, delUser }) {
    const [openModal, setOpenModal] = useState(false);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleClose = () => {
        setAnchorEl(null);

    };
    const handleOpenModal = () => {
        setOpenModal(true);
    };
    return (
        <div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            // anchorPosition={{ right: 800, top: 300 }}
            >
                <div onClick={handleOpenModal} onClose={() => setOpenModal(false)}>

                    <ConfirmationModal {...{ userId, setuserId, delUser }} />
                </div>
            </Popover>
        </div >
    );
}