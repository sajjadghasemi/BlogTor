import { useRef } from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Sign from "./Sign";

const NewPost = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const editorRef = useRef(null);

    const navigate = useNavigate();

    const cookies = new Cookies();
    const myCookie = cookies.get("token");

    const newPost = async (data) => {
        await fetch("http://localhost:4000/blog/write", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                auth: `ut ${myCookie}`,
            },
            body: JSON.stringify({
                title: data.title,
                content: editorRef.current.getContent(),
                imgurl: data.imageUrl,
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data));
        navigate("/");
    };

    if (!myCookie) return <Sign />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 mt-5">
            <div className="flex flex-col">
                <div className="form--heading md:text-2xl flex justify-center">
                    Add New Post!
                </div>
                <div className="flex justify-center">
                    <form autoComplete="off" onSubmit={handleSubmit(newPost)}>
                        <input
                            {...register("title", {
                                required: true,
                            })}
                            type="text"
                            placeholder="Title"
                            className="placeholder:text-gray-400 border-bottom-4 border-red-500/75"
                        />
                        <input
                            {...register("imageUrl", {
                                required: true,
                            })}
                            type="text"
                            placeholder="Image"
                            className="placeholder:text-gray-400 border-bottom-4 border-red-500/75"
                        />
                        <div className="w-[90%] text-gray-500">
                            <Editor
                                onInit={(evt, editor) =>
                                    (editorRef.current = editor)
                                }
                                initialValue="<p>Your content.</p>"
                                init={{
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                        "advlist autolink lists link image charmap print preview anchor",
                                        "searchreplace visualblocks code fullscreen",
                                        "insertdatetime media table paste code help wordcount",
                                    ],
                                    toolbar:
                                        "undo redo | formatselect | " +
                                        "bold italic backcolor | alignleft aligncenter " +
                                        "alignright alignjustify | bullist numlist outdent indent | " +
                                        "removeformat | help",
                                    content_style:
                                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                }}
                            />
                        </div>
                        <div className="w-40 md:w-60">
                            <button className="button">Add Post</button>
                        </div>
                        <div className="w-40 md:w-60 flex">
                            <Link
                                to="/"
                                className="w-full h-[30px] bg-red-500 hover:bg-red-400 text-white rounded py-1 text-center"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
