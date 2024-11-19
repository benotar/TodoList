import {FC} from "react";
import LayoutPage from "@/pages/layout/LayoutPage.tsx";
import HomePage from "@/pages/layout/HomePage.tsx";
import NotFoundPage from "@/pages/layout/NotFoundPage.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "@/pages/auth/login/LoginPage.tsx";
import RegisterPage from "@/pages/auth/register/RegisterPage.tsx";
import LogoutPage from "@/pages/auth/logout/LogoutPage.tsx";
import TodoPage from "@/pages/todo/TodoPage.tsx";
import ProtectedRoute from "@/components/nav-routing/ProtectedRoute.tsx";

const App: FC = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutPage/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route path="logout" element={<LogoutPage/>}/>
                    <Route path="todo" element={<ProtectedRoute element={<TodoPage/>}/> }/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;