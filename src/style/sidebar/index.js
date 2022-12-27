import { Box, styled } from "@mui/material";

export const SideBarBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    backgroundColor: "#1379aa",
    height: "100%",
    borderRadius: "10px 0 0 10px",
    padding: "0px"
})

export const SidebarTopBox = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // height: "10%",
    borderTopLeftRadius: "10px",
    color: '#fff',
    // padding: "14px"
})
export const SideBarchatBox = styled(Box)({
    padding: "0",

    height: "calc(100vh - 230px)",
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