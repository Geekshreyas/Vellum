import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="w-full min-h-screen py-8 sm:py-12 bg-gray-50 transition-all duration-300">
            <Container>
                
                
                <div className="max-w-4xl mx-auto mb-6">
                    <Link 
                        to="/" 
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg pr-2"
                    >
                        <svg className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to posts
                    </Link>
                </div>

                
                <article className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    
                    <div className="w-full relative aspect-[16/9] sm:aspect-[2/1] bg-gray-100 overflow-hidden">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none"></div>
                    </div>

                    
                    <div className="px-6 sm:px-10 lg:px-12 pt-10 pb-8 border-b border-gray-100">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
                            {post.title}
                        </h1>

                        
                        {isAuthor && (
                            <div className="flex flex-wrap items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                <span className="text-sm font-semibold text-blue-800 mr-auto flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Author Controls
                                </span>
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-emerald-600" className="py-2 text-sm shadow-sm">
                                        Edit Post
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-600" onClick={deletePost} className="py-2 text-sm shadow-sm">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    
                    <div className="px-6 sm:px-10 lg:px-12 py-10 prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed browser-css">
                        {parse(post.content)}
                    </div>
                    
                </article>
            </Container>
        </div>
    ) : (
        
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-blue-600"></div>
                <p className="animate-pulse text-sm font-medium tracking-wide text-gray-500">
                    Loading article...
                </p>
            </div>
        </div>
    );
}