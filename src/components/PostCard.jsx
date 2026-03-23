import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block h-full outline-none">
        <div className="h-full bg-white rounded-2xl p-3 sm:p-4 border border-gray-100 shadow-sm transition-all duration-300 ease-out hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 hover:border-gray-200 flex flex-col focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
            
            
            <div className="w-full overflow-hidden rounded-xl mb-4 aspect-[4/3] bg-gray-50 relative shrink-0">
                <img 
                  src={appwriteService.getFilePreview(featuredImage)} 
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                />
                
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none"></div>
            </div>

            
            <div className="flex-grow flex flex-col justify-start px-1">
                <h2 className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                  {title}
                </h2>
            </div>
            
        </div>
    </Link>
  );
}

export default PostCard;