import {FC} from "react";
import {Route, Routes} from "react-router-dom";
import RootPage from "./pages/RootPage/RootPage.tsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.tsx";
import HomePage from "./pages/HomePage/HomePage.tsx";

const App: FC = () => {
    return(
        <Routes>
            <Route path='/' element={<RootPage/>}>
                <Route index element={<HomePage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
};

export default App;