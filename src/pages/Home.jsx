import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);
  
    
    if (posts.length === 0) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center py-12 bg-gray-50 px-4 sm:px-6">
                <Container>
                    <div className="max-w-md mx-auto text-center bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                        {authStatus ? (
                            
                            <>
                                <div className="mx-auto h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-5">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                    It's quiet here...
                                </h1>
                                <p className="mt-3 text-sm text-gray-500 mb-8 leading-relaxed">
                                    There are no posts published yet. Be the first to share your thoughts!
                                </p>
                                <Link 
                                    to="/add-post" 
                                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95"
                                >
                                    Create a Post
                                </Link>
                            </>
                        ) : (
                            
                            <>
                                <div className="mx-auto h-12 w-12 bg-gray-50 text-gray-600 rounded-full flex items-center justify-center mb-5">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                    Welcome to Vellum
                                </h1>
                                <p className="mt-3 text-sm text-gray-500 mb-8 leading-relaxed">
                                    Discover amazing content, learn new concepts, and share your own stories. Sign in to access the full experience.
                                </p>
                                <Link 
                                    to="/login" 
                                    className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-95"
                                >
                                    Sign in to read posts
                                </Link>
                            </>
                        )}
                    </div>
                </Container>
            </div>
        );
    }
    
    
    return (
        <div className="w-full min-h-screen py-8 sm:py-10 lg:py-12 bg-gray-50">
            <Container>
                
               
                <div className="mb-8 sm:mb-12 text-center sm:text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Latest Content
                    </h1>
                    <p className="mt-2 text-base text-gray-600">
                        Discover what's new and trending from our creators.
                    </p>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full h-full">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>

            </Container>
        </div>
    );
}

export default Home;