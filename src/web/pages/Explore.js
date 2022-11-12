import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingLayout from "../layouts/LoadingLayout";
import parse from "html-react-parser";
import { Link, Navigate, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Cookies } from "react-cookie";

const Explore = () => {
    const [topBlogs, setTopBlogs] = useState(null);
    const [singleBlog, setSingleBlog] = useState(null);
    const [modal, setModal] = useState(false);
    const [more, setMore] = useState(true);
    const [dropdown, setDropdown] = useState(false);

    const cookies = new Cookies();
    const myCookie = cookies.get("token");

    const navigate = useNavigate();

    const handleDropdown = () => {
        setDropdown(!dropdown);
    };

    const clickDropdownBody = () => {
        setDropdown(!dropdown);
    };

    // const fetchTopBlogs = async () => {
    //     await
    // };

    const showThisPost = async (id) => {
        await axios({
            method: "GET",
            url: `http://localhost:4000/blog/single-blog/${id}`,
        })
            .then(function (response) {
                setSingleBlog(response.data);
            })
            .catch(function () {
                console.log("lol");
            });
    };

    const submitRate = (id, rate) => {
        if (myCookie) {
            fetch("http://localhost:4000/blog/submit-rate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    auth: `ut ${myCookie}`,
                },
                body: JSON.stringify({
                    blogId: id,
                    score: rate,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        } else {
            navigate("sign");
        }
    };

    const changeRating = (rating) => {
        submitRate(singleBlog._id, rating);
    };

    const backdrop = () => {
        setModal(false);
    };

    const showMore = () => {
        setMore(!more);
    };

    useEffect(() => {
        fetch("http://localhost:4000/blog/top-blogs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
        showThisPost();
    }, []);

    if (!topBlogs) return <LoadingLayout />;

    return (
        <>
            <>
                {modal && (
                    <div
                        onClick={backdrop}
                        className="hidden md:block fixed top-0 left-0 z-40 w-full h-full bg-black opacity-30"
                    ></div>
                )}
                {modal && (
                    <div className="hidden md:block fixed mt-5 grid grid-cols-1 z-50 h-auto w-[135vh] bg-white rounded shadow-lg overflow-y-scroll">
                        {singleBlog ? (
                            <div className="grid grid-cols-2">
                                <div>
                                    <img
                                        className="h-full w-full border border-white"
                                        src={
                                            singleBlog.imgurl
                                                ? singleBlog.imgurl
                                                : "/userAvatar.png"
                                        }
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center relative">
                                        <img
                                            className="h-20 w-20 border border-gray-400 rounded-full"
                                            src={
                                                singleBlog.creator.avatar
                                                    ? `http://localhost:4000/${singleBlog.creator.avatar}`
                                                    : "/userAvatar.png"
                                            }
                                        />
                                        <div
                                            onClick={() =>
                                                submitRate(singleBlog._id)
                                            }
                                        >
                                            <StarRatings
                                                starRatedColor="orange"
                                                numberOfStars={5}
                                                name="rating"
                                                rating={singleBlog.averageScore}
                                                starDimension="23px"
                                                starSpacing="2px"
                                                changeRating={changeRating}
                                            />
                                        </div>
                                        <span
                                            onClick={handleDropdown}
                                            className="cursor-pointer text-3xl mb-5"
                                        >
                                            ...
                                        </span>
                                        {dropdown && (
                                            <div
                                                onClick={clickDropdownBody}
                                                className="absolute right-1 top-10 my-2 bg-gray-100 rounded divide-y divide-gray-300 shadow"
                                            >
                                                <ul>
                                                    <li>
                                                        <Link
                                                            to=""
                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li>
                                                        <Link
                                                            to=""
                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xl mt-2">
                                        {singleBlog.title}
                                    </p>
                                    <p className="text-md text-gray-700 mt-2">
                                        {parse(singleBlog.content)}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 place-items-center">
                                <LoadingLayout />
                            </div>
                        )}
                    </div>
                )}
            </>
            <>
                <div className="px-3 grid grid-cols-1 gap-2 md:grid-cols-3 my-2">
                    {topBlogs.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => {
                                showThisPost(item._id);
                                setModal(true);
                            }}
                            className="flex flex-col justify-center hover:shadow-2xl"
                        >
                            <img
                                className="p-1 h-full w-full cursor-pointer"
                                src={
                                    item.imgurl
                                        ? item.imgurl
                                        : "/userAvatar.png"
                                }
                            />
                            <div className="md:hidden p-2">
                                <p className="text-2xl">
                                    {item.creator.username}
                                </p>
                                <p className="text-xl mt-2">{item.title}</p>
                                <p className="overflow-hidden">
                                    <span
                                        className={`text-md text-gray-700 mt-2 ${
                                            more && "truncate"
                                        }`}
                                    >
                                        {parse(item.content)}
                                    </span>
                                    <span
                                        onClick={showMore}
                                        className="cursor-pointer"
                                    >
                                        {more ? "more" : "less"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        </>
    );
};

export default Explore;
