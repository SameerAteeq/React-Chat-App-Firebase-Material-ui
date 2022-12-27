import { Box, styled, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const ChatTopBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#ffff",
    borderTopRightRadius: "10px",
    // boxsShadow: "rgba(0, 0, 0, 0.24)",
    boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px"

})
export const MessagesBox = styled(Box)({
    height: "calc(100vh - 200px)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        height: "4px",
        width: "10px",
    },
    '&::-webkit-scrollbar-thumb': {
        background: "gray",
        opacity: "0.8",
        borderRadius: "10px"
    },
    '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    padding: '10px'
})
export const MessageContent = styled(Box)({
    display: "flex",
    flexDirection: "column",
    // gap: "10px",
    marginBottom: "2px",
    // maxWidth: "50%"

})
export const MessageText = styled(Typography)({
    backgroundColor: "#ddd",
    maxWidth: "400px",
    borderRadius: "0 10px 10px 10px",
    // marginBottom: '5px',
    padding: "10px",
    fontSize: "14px",

})

export const MessageImage = styled("img")(({ theme, src }) => ({
    src: `url(${src})`,
    width: "200px",
    height: "300px",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
    objectFit: "contain"
}))