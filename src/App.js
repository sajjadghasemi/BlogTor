import { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Sign from "./web/pages/Sign";
import WebLayout from "./web/layouts/WebLayout";
import Home from "./web/pages/Home";
import EditUser from "./web/pages/EditUser";
import UsersPages from "./web/pages/UsersPages";
import Error from "./web/layouts/Error";
import NewPost from "./web/pages/NewPost";
import Writers from "./web/pages/Writers";
import Explore from "./web/pages/Explore";
import SingleBlog from "./web/pages/SingleBlog";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store/auth-slice";

function App() {
    const dispatch = useDispatch();

    const myCookie = useSelector((state) => state.auth.myCookie);
    const user = useSelector((state) => state.auth.user);

    const me = async () => {
        if (myCookie) {
            await axios({
                method: "post",
                url: "http://localhost:4000/user/me",
                headers: {
                    auth: `ut ${myCookie}`,
                },
            })
                .then(function (response) {
                    dispatch(authAction.setUser(response.data));
                })
                .catch(function () {
                    console.log("*******");
                });
        }
    };
    console.log(user);
    useEffect(() => {
        me();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<WebLayout />}>
                <Route path="sign" element={<Sign />} />
                <Route path="" element={<Home />} />
                <Route path=":id" element={<SingleBlog />} />
                <Route path="writers" element={<Writers />} />
                <Route path="explore" element={<Explore />} />
                <Route path=":id/:username" element={<UsersPages />} />
                <Route path=":username/edit" element={<EditUser />} />
                <Route path="new-post" element={<NewPost />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
}

export default App;
