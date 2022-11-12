import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingLayout from "../layouts/LoadingLayout";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const Home = () => {
    const [blogs, setBlogs] = useState(null);

    const fetchBlogs = async () => {
        await axios({
            method: "GET",
            url: "http://localhost:4000/blog",
        })
            .then(function (response) {
                setBlogs(response.data);
            })
            .catch(function () {
                console.log("lol");
            });
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    if (!blogs) return <LoadingLayout />;

    return (
        <div className="px-3 z-10 grid grid-cols-1 gap-1 md:grid-cols-3 my-2">
            {blogs.map((item, i) => (
                <Link
                    key={i}
                    className="flex flex-col justify-center hover:shadow-2xl"
                    to={`${item._id}`}
                >
                    <div className="h-[270px] w-[270px] relative">
                        <img
                            className="p-1 h-full w-full object-cover cursor-pointer"
                            src={item.imgurl ? item.imgurl : "/userAvatar.png"}
                        />
                        <div className="absolute text-center p-1 bottom-1 left-1 bg-black w-[16.3rem] opacity-70">
                            <StarRatings
                                starRatedColor="orange"
                                numberOfStars={5}
                                rating={
                                    item.averageScore ? item.averageScore : 0
                                }
                                starDimension="23px"
                                starSpacing="2px"
                            />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Home;
