import axios from "axios";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";
import Error from "../layouts/Error";
import LoadingLayout from "../layouts/LoadingLayout";

const Dashbord = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("");

    const cookies = new Cookies();
    const myCookie = cookies.get("token");

    const params = useParams().username;

    useEffect(() => {
        axios({
            method: "post",
            url: "http://localhost:4000/user/me",
            headers: {
                auth: `ut ${myCookie}`,
            },
        })
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        setLoading(true);
    }, []);

    if (!loading) return <LoadingLayout />;

    if (user.username === params) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-1 mt-5">
                <div className="flex justify-center">sdsd</div>
            </div>
        );
    } else {
        return <Error />;
    }
};

export default Dashbord;
