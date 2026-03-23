import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    return (
        <div className="w-full min-h-screen py-8 sm:py-10 lg:py-12 bg-gray-50">
            <Container>
                
                
                <div className="mb-8 sm:mb-10 max-w-2xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        All Posts
                    </h1>
                    <p className="mt-2 text-base text-gray-600">
                        Browse and manage all published content across the platform.
                    </p>
                </div>

                
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {posts.map((post) => (
                            <div key={post.$id} className="w-full h-full">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    
                    <div className="w-full flex flex-col items-center justify-center py-20 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                            <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l1 2h5a2 2 0 012 2v10a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No posts found</h3>
                        <p className="mt-1 text-sm text-gray-500 text-center max-w-sm">
                            Get started by creating your first post to share your ideas.
                        </p>
                    </div>
                )}
                
            </Container>
        </div>
    );
}

export default AllPosts;