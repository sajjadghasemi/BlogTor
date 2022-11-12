import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { FaRegCommentDots } from "react-icons/fa";
import { Cookies } from "react-cookie";
import parse from "html-react-parser";
import LoadingLayout from "../layouts/LoadingLayout";
import axios from "axios";

const SingleBlog = () => {
    const [singleBlog, setSingleBlog] = useState(null);
    const [dropdown, setDropdown] = useState(false);
    const [comment, setComment] = useState("");
    const [blogComments, setBlogComments] = useState(null);

    const cookies = new Cookies();
    const myCookie = cookies.get("token");

    const navigate = useNavigate();

    const params = useParams().id;

    const handleDropdown = () => {
        setDropdown(!dropdown);
    };

    const clickDropdownBody = () => {
        setDropdown(!dropdown);
    };

    const showThisPost = async () => {
        const promise1 = axios({
            method: "GET",
            url: `http://localhost:4000/blog/single-blog/${params}`,
        })
            .then(function (response) {
                setSingleBlog(response.data);
            })
            .catch(function () {
                console.log("lol");
            });

        const promise2 = axios({
            method: "GET",
            url: `http://localhost:4000/comment/by-blog/${params}`,
        })
            .then(function (response) {
                setBlogComments(response.data);
            })
            .catch(function () {
                console.log("lol");
            });

        await Promise.all([promise1, promise2]);
    };

    const submitRate = (id, rate) => {
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
        }).then((response) => response.json());
    };

    const changeRating = (rating) => {
        if (myCookie) {
            submitRate(singleBlog._id, rating);
        } else {
            navigate("/sign");
        }
    };

    const submitComment = () => {
        if (myCookie) {
            fetch("http://localhost:4000/comment/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    auth: `ut ${myCookie}`,
                },
                body: JSON.stringify({
                    blogId: params,
                    text: comment,
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

    useEffect(() => {
        showThisPost();
    }, []);

    if (!singleBlog) return <LoadingLayout />;

    return (
        <>
            {singleBlog && (
                <div className="px-3 grid gap-2 grid-cols-1 md:grid-cols-2 my-2">
                    <div className="h-auto w-auto">
                        <img
                            className="object-cover h-full w-full border border-white"
                            src={
                                singleBlog.imgurl
                                    ? singleBlog.imgurl
                                    : "/userAvatar.png"
                            }
                        />
                    </div>
                    <div className="p-3 md:border-l border-gray-400">
                        <div className="flex justify-between items-center relative">
                            <img
                                className="hidden md:block h-20 w-20 border border-gray-400 rounded-full"
                                src={
                                    singleBlog.creator.avatar
                                        ? `http://localhost:4000/${singleBlog.creator.avatar}`
                                        : "/userAvatar.png"
                                }
                            />
                            <div onClick={() => submitRate(singleBlog._id)}>
                                <StarRatings
                                    starRatedColor="orange"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="23px"
                                    starSpacing="2px"
                                    changeRating={changeRating}
                                />
                            </div>
                            {myCookie && (
                                <span
                                    onClick={handleDropdown}
                                    className="cursor-pointer text-3xl mb-5"
                                >
                                    ...
                                </span>
                            )}
                            {dropdown && (
                                <div
                                    onClick={clickDropdownBody}
                                    className="absolute right-1 top-10 my-2 bg-gray-100 rounded divide-y divide-gray-400 shadow-lg"
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
                        <p className="text-xl mt-4 ml-2">{singleBlog.title}</p>
                        <p className="text-md text-gray-700 mt-2 ml-2">
                            {parse(singleBlog.content)}
                        </p>
                    </div>
                </div>
            )}
            {myCookie ? (
                <div className="mt-3 p-2 w-full border text-center border-gray-400 rounded">
                    <FaRegCommentDots className="text-xl block" />
                    <textarea
                        placeholder="Add you comment"
                        required
                        onChange={(e) => setComment(e.target.value)}
                        className="bg-inherit text-sm block w-full mt-1 p-1 outline-none resize-none"
                    ></textarea>
                    <button
                        onClick={() => submitComment(singleBlog._id)}
                        className="text-sm bg-gray-700 py-1 px-3 rounded text-gray-200 mt-1"
                    >
                        Submit
                    </button>
                </div>
            ) : (
                <div className="mt-3 p-2 w-full border text-center border-gray-400 rounded">
                    <FaRegCommentDots className="text-xl inline-block mr-2" />
                    <Link className="text-gray-600 hover:text-black" to="/sign">
                        Login for comment!
                    </Link>
                </div>
            )}
            <div className="grid grid-cols-1 my-3 p-2 w-full">
                {!blogComments ? (
                    <>
                        <h2 className="p-1 text-xl underline">Comments</h2>
                        <span className="text-gray-700 text-md">
                            There is no comment!
                        </span>
                    </>
                ) : (
                    blogComments.map((item, i) => (
                        <div
                            key={i}
                            className="border-b py-1 border-gray-400 px-1"
                        >
                            <b className="text-red-900 text-md">
                                {item.user.username}:
                            </b>
                            <span className="text-gray-700 text-md">
                                {" "}
                                {item.text}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default SingleBlog;
