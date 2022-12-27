import { Box, Grid, styled } from "@mui/material";
import { Colors } from "../theme";

export const HomeBox = styled(Box)({

    backgroundColor: "#e2f0f1",
    height: "100%",
    width: "100%",

})

export const HomeGrid = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    padding: "30px",
    boxShadow: " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    [theme.breakpoints.down("md")]: {
        padding: "20px"
    },
    [theme.breakpoints.down("sm")]: {
        padding: "0px",
        marginTop: "20px"
    },
}))
