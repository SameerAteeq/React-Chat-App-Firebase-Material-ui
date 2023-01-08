import { Box, styled } from "@mui/material";

export const SideBarBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    backgroundColor: "#1379aa",
    height: "calc(100vh - 80px)",
    borderRadius: "10px 0 0 10px",
    padding: "0px"
})

export const SidebarTopBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: "10px",
    color: '#fff',
})
export const SideBarchatBox = styled(Box)({
    padding: "0",

    height: "calc(100vh - 200px)",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
        height: "4px",
        width: "8px",
    },
    '&::-webkit-scrollbar-thumb': {
        background: "#fdfdfd",
        opacity: "0.8",
        borderRadius: "10px"
    },
    '&::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
})

export const LastMessage = styled(Box)({
    display: "-webkit-box",
    "-webkit-box-orient": "vertical",
    color: "#333", overflow: "hidden",
    "-webkit-line-clamp": "1"
})