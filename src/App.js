import { Route, Routes } from "react-router-dom";
import LoadingLayout from "./web/layouts/LoadingLayout";
import Sign from "./web/pages/Sign";
import WebLayout from "./web/layouts/WebLayout";
import Home from "./web/pages/Home";
import { CookiesProvider } from "react-cookie";
import EditUser from "./web/pages/EditUser";
import Dashbord from "./web/pages/Dashbord";
import Error from "./web/layouts/Error";
import NewPost from "./web/pages/NewPost";

function App() {
    return (
        <CookiesProvider>
            <Routes>
                <Route path="/" element={<WebLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="sign" element={<Sign />} />
                    <Route path="top-writers" element={<LoadingLayout />} />
                    <Route path="explore" element={<LoadingLayout />} />
                    <Route path=":username" element={<Dashbord />} />
                    <Route path=":username/edit" element={<EditUser />} />
                    <Route path=":username/new-post" element={<NewPost />} />
                    <Route path="*" element={<Error />} />
                </Route>
            </Routes>
        </CookiesProvider>
    );
}

export default App;
