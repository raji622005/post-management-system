import React from 'react';
import { Container } from 'react-bootstrap';
import PostForm from '../components/PostForm';
import { usePosts } from '../hooks/usePostStore';

function PostCreate() {
    const { createPost } = usePosts();

    return (
        <Container className="my-5">
            <h1 className="mb-4 text-primary">➕ Create New Post</h1>
            <PostForm 
                onSubmit={createPost} 
                isEdit={false} 
            />
        </Container>
    );
}

export default PostCreate;