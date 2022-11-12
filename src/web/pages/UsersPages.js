import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingLayout from "../layouts/LoadingLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Error from "../layouts/Error";

const UsersPages = () => {
    const [blogsOfUser, setBlogsOfUser] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const params = useParams().id;
    const username = useParams().username;

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:4000/user/singleUser/${params}`,
        })
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function () {
                console.log("lol");
            });

        fetch("http://localhost:4000/blog/by-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: params,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setBlogsOfUser(data);
            });
    }, []);

    if (!user) return <LoadingLayout />;
    if (!blogsOfUser) return <LoadingLayout />;
    if (user.username !== username || user._id !== params) return <Error />;

    return (
        <>
            <div className="grid grid-cols-1 my-2">
                <div className="flex justify-around items-center py-2 border-b border-gray-400">
                    <img
                        className="h-16 w-16 rounded-full p-1 border border-gray-300 "
                        src={
                            user.avatar
                                ? `http://localhost:4000/${user.avatar}`
                                : "/userAvatar.png"
                        }
                    />
                    <div>
                        <p>{user.name}</p>
                        <p className="text-gray-500">{user.bio}</p>
                    </div>
                </div>
            </div>
            <div className="px-3 z-10 grid grid-cols-1 gap-1 md:grid-cols-3 my-2">
                {blogsOfUser.map((item, i) => (
                    <Link
                        key={i}
                        className="flex flex-col justify-center hover:shadow-2xl"
                        to={`/${item._id}`}
                    >
                        <div className="h-[270px] w-[270px] relative">
                            <img
                                className="p-1 h-full w-full object-cover cursor-pointer"
                                src={
                                    item.imgurl
                                        ? item.imgurl
                                        : "/userAvatar.png"
                                }
                            />
                            <div className="absolute text-center p-1 bottom-1 left-1 bg-black w-[16.3rem] opacity-70">
                                <StarRatings
                                    starRatedColor="orange"
                                    numberOfStars={5}
                                    rating={
                                        item.averageScore
                                            ? item.averageScore
                                            : 0
                                    }
                                    starDimension="23px"
                                    starSpacing="2px"
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default UsersPages;
