import React, { useContext, useState } from 'react';
import { CommentContext } from './CommentContext';

const CommentList = () => {
    const { comments, updateLikes, updateDislikes, editComment, deleteComment } = useContext(CommentContext);
    const [editMode, setEditMode] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [likedComments, setLikedComments] = useState([]);
    const [dislikedComments, setDislikedComments] = useState([]);

    const handleEditChange = (e) => {
        setEditedComment(e.target.value);
    };

    const handleEditSubmit = (id) => {
        if (editedComment.trim() !== '') {
            editComment(id, editedComment);
            setEditMode(null);
            setEditedComment('');
        }
    };

    const handleCancelEdit = () => {
        setEditMode(null);
        setEditedComment('');
    };

    const handleLike = (id) => {
        if (!likedComments.includes(id)) {
            updateLikes(id);
            setLikedComments([...likedComments, id]);
            if (dislikedComments.includes(id)) {
                setDislikedComments(dislikedComments.filter((item) => item !== id));
            }
        }
    };

    const handleDislike = (id) => {
        if (!dislikedComments.includes(id)) {
            updateDislikes(id);
            setDislikedComments([...dislikedComments, id]);
            if (likedComments.includes(id)) {
                setLikedComments(likedComments.filter((item) => item !== id));
            }
        }
    };

    const formatTime = (time) => {
        return new Date(time).toLocaleString();
    };

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div key={comment.id} className="p-4 border border-gray-300 rounded-md">
                    <div className="flex justify-between">
                        <h3 className="font-semibold">{comment.username}</h3>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleLike(comment.id)}
                                className={`text-sm text-gray-500 hover:text-blue-500 ${
                                    likedComments.includes(comment.id) ? 'font-semibold' : ''
                                }`}
                                disabled={likedComments.includes(comment.id)}
                            >
                                Like ({comment.likes})
                            </button>
                            <button
                                onClick={() => handleDislike(comment.id)}
                                className={`text-sm text-gray-500 hover:text-red-500 ${
                                    dislikedComments.includes(comment.id) ? 'font-semibold' : ''
                                }`}
                                disabled={dislikedComments.includes(comment.id)}
                            >
                                Dislike ({comment.dislikes})
                            </button>
                            <button
                                onClick={() => {
                                    setEditMode(comment.id);
                                    setEditedComment(comment.body);
                                }}
                                className="text-sm text-gray-500 hover:text-green-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteComment(comment.id)}
                                className="text-sm text-gray-500 hover:text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    {editMode === comment.id ? (
                        <div className="mt-2">
                            <textarea
                                value={editedComment}
                                onChange={handleEditChange}
                                className="block w-full p-2 border border-gray-300 rounded-md"
                                rows="3"
                                required
                            ></textarea>
                            <div className="flex space-x-2 mt-2">
                                <button
                                    onClick={() => handleEditSubmit(comment.id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-600 mt-2 break-words whitespace-pre-wrap">{comment.body}</p>
                            <p className="text-gray-400 text-sm mt-1">{formatTime(comment.timestamp)}</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentList;
