import {FC} from "react";
import Layout from "./pages/Layout/Layout.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import Home from "./pages/Home/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "@/pages/LoginPage/LoginPage.tsx";

const App: FC = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='login' element={<LoginPage/>}/>
                </Route>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;