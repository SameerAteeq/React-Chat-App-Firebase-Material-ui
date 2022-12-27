import { createTheme, responsiveFontSizes } from "@mui/material";

export const Colors = {
    primary: "#70cbde"
}

let theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        }
    }
})
theme = responsiveFontSizes(theme);
export default theme