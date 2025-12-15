import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { usePosts } from '../hooks/usePostStore';

function PostEdit() {
    const { id } = useParams();
    const { getPost, updatePost } = usePosts();
    const post = getPost(id);

    if (!post) {
        return (
            <Container className="my-5">
                <Alert variant="danger">Error: Post with ID "{id}" not found.</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h1 className="mb-4 text-primary">✍️ Edit Post: {post.title}</h1>
            <PostForm 
                initialData={post} 
                onSubmit={(data) => updatePost(id, data)}
                isEdit={true}
            />
        </Container>
    );
}

export default PostEdit;