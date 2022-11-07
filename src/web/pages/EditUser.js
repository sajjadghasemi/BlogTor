import axios from "axios";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Error from "../layouts/Error";
import LoadingLayout from "../layouts/LoadingLayout";

const EditUser = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const { register: register2, handleSubmit: handleSubmit2 } = useForm();

    const navigate = useNavigate();

    const params = useParams().username;

    const cookies = new Cookies();
    const myCookie = cookies.get("token");

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
                setName(response.data.name);
                setBio(response.data.bio);
            })
            .catch(function (error) {
                console.log(error);
            });
        setLoading(false);
    }, []);

    if (loading) return <LoadingLayout />;

    const submitAvatar = async (data) => {
        try {
            if (!data.file[0]) return;

            const formData = new FormData();
            formData.append("avatar", data.file[0]);

            await fetch("http://localhost:4000/user/update-avatar", {
                method: "POST",
                headers: {
                    auth: `ut ${myCookie}`,
                },
                body: formData,
            }).then((res) => {
                console.log(res);
            });
        } catch (error) {
            console.log("lol");
        }
    };

    const edit = (data) => {
        axios({
            method: "post",
            url: "http://localhost:4000/user/edit",
            data: {
                name: data.name,
                bio: data.bio,
            },
            headers: {
                auth: `ut ${myCookie}`,
            },
        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        navigate("/dashbord");
    };

    if (params !== user.username) return <Error />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
            <div className="flex flex-col">
                <div className="form--heading md:text-2xl flex justify-center">
                    Edit your profile!
                </div>
                <div className="flex justify-center">
                    <form autoComplete="off" onSubmit={handleSubmit(edit)}>
                        <input
                            {...register("name", {
                                required: true,
                                minLength: 1,
                                maxLength: 25,
                                onChange: (e) => setName(e.target.value),
                            })}
                            type="text"
                            placeholder="Name"
                            className="placeholder:text-gray-400 border-bottom-4 border-red-500/75"
                            value={name}
                        />
                        <textarea
                            {...register("bio", {
                                required: true,
                                maxLength: 200,
                                onChange: (e) => setBio(e.target.value),
                            })}
                            className="w-[90%] text-gray-500 outline-none focus:border-gray-400/75 border-2 border-red-400/75 p-1 text-[.8rem] resize-none"
                            placeholder="Add you bio, Max 200 Chars"
                            value={bio}
                        ></textarea>
                        <div className="w-40 md:w-60">
                            <button className="button">Edit</button>
                        </div>
                        <div className="w-40 md:w-60 flex">
                            <Link
                                to="./../"
                                className="w-full h-[30px] bg-red-500 hover:bg-red-400 text-white rounded py-1 text-center"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex flex-col mt-4 md:mt-0">
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit2(submitAvatar)}>
                        <div className="flex justify-center">
                            <img
                                className="w-48 h-48 rounded-full border-2 border-gray-300"
                                src={
                                    user.avatar
                                        ? `http://localhost:4000/${user.avatar}`
                                        : "/userAvatar.png"
                                }
                            />
                        </div>
                        <div className="flex justify-center mt-3">
                            <input
                                {...register2("file")}
                                type="file"
                                className="cursor-pointer w-48 px-2 py-1.5 text-[.7rem] text-gray-700 outline-none"
                            />
                        </div>
                        <div className="flex justify-center mt-3">
                            <button className="w-48 h-[30px] bg-gray-900 hover:bg-gray-600 text-white rounded py-1 text-center">
                                Update Avatar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
