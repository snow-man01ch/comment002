import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CommentContext = createContext();

const CommentContextProvider = (props) => {
    const [user, setUser] = useState(null); // Initialize as null to handle async fetch

    const [comments, setComments] = useState([
        {
            id: uuidv4(),
            username: 'Leanne Graham',
            body: 'Multi-tiered zero tolerance productivity',
            timestamp: new Date(),
            likes: 0,
            dislikes: 0,
        },
        {
            id: uuidv4(),
            username: 'Ervin Howell',
            body: 'Face to face bifurcated interface',
            timestamp: new Date(),
            likes: 0,
            dislikes: 0,
        },
    ]);

    useEffect(() => {
        fetchUser(parseInt(Math.random() * 10) + 1);
    }, []);

    const fetchUser = async (index) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${index}`);
            const data = await response.json();
            setUser(data.name);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    const addComment = (body) => {
        setComments([
            ...comments,
            {
                id: uuidv4(),
                username: user, // Use fetched user name
                body: body,
                timestamp: new Date(),
                likes: 0,
                dislikes: 0,
            },
        ]);
    };

    const updateLikes = (id) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === id && comment.dislikes > 0) {
                return { ...comment, likes: comment.likes + 1, dislikes: comment.dislikes - 1 };
            } else if (comment.id === id) {
                return { ...comment, likes: comment.likes + 1 };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const updateDislikes = (id) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === id && comment.likes > 0) {
                return { ...comment, dislikes: comment.dislikes + 1, likes: comment.likes - 1 };
            } else if (comment.id === id) {
                return { ...comment, dislikes: comment.dislikes + 1 };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const editComment = (id, newBody) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === id) {
                return { ...comment, body: newBody, timestamp: new Date() };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const deleteComment = (id) => {
        const updatedComments = comments.filter((comment) => comment.id !== id);
        setComments(updatedComments);
    };

    return (
        <CommentContext.Provider
            value={{ user, comments, addComment, updateLikes, updateDislikes, editComment, deleteComment }}
        >
            {props.children}
        </CommentContext.Provider>
    );
};

export default CommentContextProvider;
