import React, { useContext, useState } from 'react';
import { CommentContext } from './CommentContext';

const CommentList = () => {
    const { comments, updateLikes, updateDislikes, editComment, deleteComment } = useContext(CommentContext);
    const [editMode, setEditMode] = useState(null);
    const [editedComment, setEditedComment] = useState('');

    const handleEditChange = (e) => {
        setEditedComment(e.target.value);
    };

    const handleEditSubmit = (id) => {
        editComment(id, editedComment);
        setEditMode(null);
        setEditedComment('');
    };

    const formatTime = (time) => {
        return time.toLocaleString(); // ใช้ toLocaleString() เพื่อแสดงเวลาในรูปแบบที่ต้องการ
    };

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <div key={comment.id} className="p-4 border border-gray-300 rounded-md">
                    <div className="flex justify-between">
                        <h3 className="font-semibold">{comment.username}</h3>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => updateLikes(comment.id)}
                                className="text-sm text-gray-500 hover:text-blue-500"
                            >
                                Like ({comment.likes})
                            </button>
                            <button
                                onClick={() => updateDislikes(comment.id)}
                                className="text-sm text-gray-500 hover:text-red-500"
                            >
                                Dislike ({comment.dislikes})
                            </button>
                            <button
                                onClick={() => setEditMode(comment.id)}
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
                            <button
                                onClick={() => handleEditSubmit(comment.id)}
                                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="text-gray-600 mt-2">{comment.body}</p>
                            <p className="text-gray-400 text-sm mt-1">{formatTime(comment.timestamp)}</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentList;