import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    return post ? (
        <div className="min-h-screen py-8 sm:py-10 lg:py-12 bg-gray-50 transition-all duration-300">
            <Container>
                
                <div className="mb-8 sm:mb-10 max-w-2xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Edit Post
                    </h1>
                    <p className="mt-2 text-base text-gray-600">
                        Make changes to your content, update the featured image, or adjust visibility.
                    </p>
                </div>
                
                
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
        
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-gray-200 border-t-blue-600"></div>
                <p className="animate-pulse text-sm font-medium tracking-wide text-gray-500">
                    Loading post data...
                </p>
            </div>
        </div>
    );
}

export default EditPost;