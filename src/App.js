import Rigestration from "./components/Auth/register";
import "./index.css"
import { ThemeProvider } from "@emotion/react";
import theme from "./style/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/login";
import Pages from "./pages";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { useContext } from "react";
function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <ThemeProvider theme={theme}>
      <Toaster />
      <Pages />
    </ThemeProvider>
  );
}

export default App;
