import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CommentContext = createContext();

const CommentContextProvider = (props) => {
    const [user, setUser] = useState('');

    const [comments, setComments] = useState([
        {
            id: uuidv4(),
            username: 'Leanne Graham',
            body: 'Multi-tiered zero tolerance productivity',
            timestamp: new Date(), // เวลาปัจจุบันที่สร้างคอมเมนต์
            likes: 0,
            dislikes: 0,
        },
        {
            id: uuidv4(),
            username: 'Ervin Howell',
            body: 'Face to face bifurcated interface',
            timestamp: new Date(), // เวลาปัจจุบันที่สร้างคอมเมนต์
            likes: 0,
            dislikes: 0,
        },
    ]);

    const [likedComments, setLikedComments] = useState([]);
    const [dislikedComments, setDislikedComments] = useState([]);

    useEffect(() => {
        setUser(userName(parseInt(Math.random() * 10) + 1));
    }, []);

    const userName = (index) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${index}`)
            .then((res) => res.json())
            .then((data) => setUser(data.name));
    };

    const addComment = (username, body) => {
        setComments([
            ...comments,
            {
                id: uuidv4(),
                username: username,
                body: body,
                timestamp: new Date(), // เวลาปัจจุบันที่สร้างคอมเมนต์
                likes: 0,
                dislikes: 0,
            },
        ]);
    };

    const updateLikes = (id) => {
        if (!likedComments.includes(id)) {
            const updatedComments = comments.map((comment) => {
                if (comment.id === id) {
                    return { ...comment, likes: comment.likes + 1 };
                }
                return comment;
            });
            setComments(updatedComments);
            setLikedComments([...likedComments, id]);
        }
    };

    const updateDislikes = (id) => {
        if (!dislikedComments.includes(id)) {
            const updatedComments = comments.map((comment) => {
                if (comment.id === id) {
                    return { ...comment, dislikes: comment.dislikes + 1 };
                }
                return comment;
            });
            setComments(updatedComments);
            setDislikedComments([...dislikedComments, id]);
        }
    };

    const editComment = (id, newBody) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === id) {
                return { ...comment, body: newBody, timestamp: new Date() }; // เวลาปัจจุบันที่แก้ไขคอมเมนต์
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
            value={{ comments, addComment, updateLikes, updateDislikes, editComment, deleteComment }}
        >
            {props.children}
        </CommentContext.Provider>
    );
};

export default CommentContextProvider;