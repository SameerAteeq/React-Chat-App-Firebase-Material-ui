import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const EmptyChat = () => {
    return (
        <>
            <Box
                sx={{
                    display: "flex", justifyContent: "center", alignItems: "center"
                }}
            >
                <Typography variant='h6'>Click any user to chat</Typography>
                {/* <Button variant='contained'></Button> */}
            </Box>
        </>
    )
}

export default EmptyChat