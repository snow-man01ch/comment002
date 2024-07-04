import React from 'react';
import CommentContextProvider from './CommentContext';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
export default function Comment(){
    return(
        <CommentContextProvider>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Comments</h1>
                <CommentForm />
                <CommentList />
            </div>
        </CommentContextProvider>
    );
}