import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initialPosts } from '../utils/seedData';

const PostContext = createContext();

const LOCAL_STORAGE_KEY = 'post-management-system-posts';

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState(() => {
        // Initialize state from localStorage or use initial seed data
        const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedPosts) {
            return JSON.parse(storedPosts);
        }
        return initialPosts;
    });

    // Save posts to localStorage whenever the state changes
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
    }, [posts]);

    // CRUD Operations
    const createPost = (newPost) => {
        const now = new Date().toISOString();
        const postWithMetadata = {
            ...newPost,
            id: uuidv4(),
            tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            createdAt: now,
            updatedAt: now,
        };
        setPosts(prevPosts => [postWithMetadata, ...prevPosts]);
        return postWithMetadata.id;
    };

    const getPost = (id) => {
        return posts.find(post => post.id === id);
    };

    const updatePost = (id, updatedFields) => {
        setPosts(prevPosts => 
            prevPosts.map(post => {
                if (post.id === id) {
                    return {
                        ...post,
                        ...updatedFields,
                        tags: updatedFields.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                        updatedAt: new Date().toISOString(),
                    };
                }
                return post;
            })
        );
    };

    const deletePost = (id) => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
    };

    const value = useMemo(() => ({
        posts,
        createPost,
        getPost,
        updatePost,
        deletePost,
    }), [posts]);

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    return useContext(PostContext);
};