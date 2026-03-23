import React from 'react';
import { Container, PostForm } from '../components';

function AddPost() {
  return (
    <div className="min-h-screen py-8 sm:py-10 lg:py-12 bg-gray-50">
        <Container>
            
            <div className="mb-8 sm:mb-10 max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Create a new post
                </h1>
                <p className="mt-2 text-base text-gray-600">
                    Draft, format, and publish your latest content.
                </p>
            </div>
            
            
            <PostForm />
        </Container>
    </div>
  );
}

export default AddPost;