import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingLayout from "../layouts/LoadingLayout";
import { Link } from "react-router-dom";

const Writers = () => {
    const [users, setUsers] = useState(null);

    const fetchUsers = async () => {
        await axios({
            method: "GET",
            url: "http://localhost:4000/user/",
        })
            .then(function (response) {
                setUsers(response.data);
            })
            .catch(function () {
                console.log("lol");
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (!users) return <LoadingLayout />;

    return (
        <div className="px-3 grid grid-cols-1 md:grid-cols-2 place-content-end">
            {users.map((item, i) => (
                <div
                    key={i}
                    className="ring-1 grid grid-cols-2 place-items-center ring-gray-300 hover:shadow-lg p-2"
                >
                    <div className="p-3">
                        <img
                            className="rounded-full border border-gray-300 p-1 h-16 md:h-36 w-16 md:w-36"
                            src={
                                item.avatar
                                    ? `http://localhost:4000/${item.avatar}`
                                    : "/userAvatar.png"
                            }
                        />
                    </div>
                    <div className="text-[.7rem] md:text-[1.1rem] p-3 ml-5">
                        <p className="text-gray-800">{item.name}</p>
                        <Link
                            className="text-gray-600"
                            to={`/${item._id}/${item.username}`}
                        >
                            <p>@{item.username}</p>
                        </Link>
                        <p className="text-gray-700 mt-2 text-[.8rem]">
                            {item.bio ? item.bio : "No info"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Writers;
