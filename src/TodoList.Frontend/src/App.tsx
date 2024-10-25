import {FC} from "react";
import Layout from "@/pages/layout/layout.tsx";
import Home from "@/pages/layout//home.tsx";
import NotFound from "@/pages/layout/not-found.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "@/pages/auth/login/page.tsx";
import Register from "@/pages/auth/register/page.tsx";

const App: FC = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;