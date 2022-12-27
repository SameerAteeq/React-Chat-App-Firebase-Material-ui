import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { Colors } from "../theme";

export const CenterBox = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    height: "100vh",
    width: "100%",
})


export const ContentBox = styled(Box)(({ theme }) => ({
    width: "400px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    [theme.breakpoints.down("md")]: {
        padding: "20px"
    }
}))
export const RegHeading = styled(Typography)({
    fontSize: "30px",
    marginBottom: "10px"

})