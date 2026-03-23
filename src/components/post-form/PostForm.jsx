import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-") 
                .replace(/\s/g, "-")             
                .replace(/^-+/, "")              
                .substring(0, 36);               

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start w-full">
            
            
            <div className="w-full lg:w-2/3 flex flex-col gap-6 bg-white p-5 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <Input
                    label="Post Title"
                    placeholder="Enter an engaging title"
                    {...register("title", { required: true })}
                />
                <Input
                    label="URL Slug"
                    placeholder="custom-url-slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                
                
                <div className="mt-2">
                    <RTE 
                        label="Post Content" 
                        name="content" 
                        control={control} 
                        defaultValue={getValues("content")} 
                    />
                </div>
            </div>

            
            <div className="w-full lg:w-1/3 flex flex-col gap-6 bg-gray-50/50 p-6 rounded-2xl border border-gray-200">
                
                
                <div className="flex flex-col gap-4">
                    <Input
                        label="Featured Image"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    
                    {post && (
                        <div className="w-full relative overflow-hidden rounded-xl border border-gray-200 shadow-sm bg-gray-100 aspect-[16/10]">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none"></div>
                        </div>
                    )}
                </div>

                <Select
                    options={["active", "inactive"]}
                    label="Visibility Status"
                    {...register("status", { required: true })}
                />

                
                <div className="pt-4 mt-2 border-t border-gray-200">
                    <Button 
                        type="submit" 
                        bgColor={post ? "bg-emerald-600" : "bg-blue-600"} 
                        className="w-full py-3 text-base shadow-md"
                    >
                        {post ? "Update Post" : "Publish Post"}
                    </Button>
                </div>
                
            </div>
        </form>
    );
}