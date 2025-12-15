import React, { useState } from 'react';
import { Container, Card, Badge, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { usePosts } from '../hooks/usePostStore';
import ConfirmationModal from '../components/ConfirmationModal';

function PostView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { getPost, deletePost } = usePosts();
    const post = getPost(id);

    const [showModal, setShowModal] = useState(false);
    
    // Check for success message from creation/editing
    const successMessage = location.state?.message;

    const handleDelete = () => {
        deletePost(id);
        setShowModal(false);
        navigate('/', { state: { message: `Post "${post.title}" successfully deleted.` } });
    };

    if (!post) {
        return (
            <Container className="my-5">
                <Alert variant="danger">Error: Post with ID "{id}" not found.</Alert>
                <Button variant="secondary" onClick={() => navigate('/')}>Back to List</Button>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            {successMessage && (
                <Alert variant="success" className="mb-4">
                    {successMessage}
                </Alert>
            )}
            <Card className="shadow-lg">
                <Card.Body>
                    <Card.Title as="h1" className="text-primary mb-3">{post.title}</Card.Title>
                    <Card.Subtitle className="mb-4 text-muted">
                        By: **{post.author}**
                    </Card.Subtitle>

                    <p className="lead" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>

                    <div className="mt-4 border-top pt-3">
                        <p className="small mb-1">
                            **Created At:** {new Date(post.createdAt).toLocaleString()}
                        </p>
                        <p className="small mb-3">
                            **Last Updated:** {new Date(post.updatedAt).toLocaleString()}
                        </p>

                        <h5 className="mb-2">Tags:</h5>
                        {post.tags.map((tag, index) => (
                            <Badge key={index} bg="secondary" className="me-2 mb-2 p-2">{tag}</Badge>
                        ))}
                    </div>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                    <Button variant="secondary" onClick={() => navigate('/')}>
                        ← Back to List
                    </Button>
                    <div>
                        <Button 
                            variant="outline-secondary" 
                            onClick={() => navigate(`/posts/${id}/edit`)} 
                            className="me-2"
                        >
                            Edit
                        </Button>
                        <Button variant="danger" onClick={() => setShowModal(true)}>
                            Delete
                        </Button>
                    </div>
                </Card.Footer>
            </Card>

            <ConfirmationModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={handleDelete}
                title="Confirm Deletion"
                body={`Are you sure you want to delete the post titled: "${post.title}"? This action cannot be undone.`}
            />
        </Container>
    );
}

export default PostView;