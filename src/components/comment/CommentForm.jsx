import React, { useState, useContext } from 'react';
import { CommentContext } from './CommentContext';

const CommentForm = () => {
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');

    const { addComment } = useContext(CommentContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() !== '' && comment.trim() !== '') {
            addComment(username, comment);
            setUsername('');
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-1/3 py-4">
            <input
                type="text"
                placeholder="Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
                required
            />
            <textarea
                placeholder="Your Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="block w-full p-2 mt-2 border border-gray-300 rounded-md"
                rows="3"
                required
            ></textarea>
            <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md">
                Add Comment
            </button>
        </form>
    );
};

export default CommentForm;