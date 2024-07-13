import React, { useState, useContext } from 'react';
import { CommentContext } from './CommentContext';

const CommentForm = () => {
    const [comment, setComment] = useState('');
    const { user, addComment } = useContext(CommentContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() !== '') {
            addComment(comment);
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full py-4">
            <textarea
                placeholder="Your Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="block w-full p-2 mb-2 border border-gray-300 rounded-md "
                rows="3"
                required
                aria-label="Comment"
            ></textarea>
            <button
                type="submit"
                className="w-[200px] bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md max-w-md mx-auto"
            >
                Add Comment
            </button>
        </form>
    );
};

export default CommentForm;