import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function PostCard({ post }) {
    const { id, title, author, content, createdAt } = post;
    const excerpt = content.substring(0, 100) + (content.length > 100 ? '...' : '');

    return (
        <Card className="shadow-sm mb-4 h-100">
            <Card.Body>
                <Card.Title className="text-primary">{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted small">
                    By: **{author}** | Created: {new Date(createdAt).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text>{excerpt}</Card.Text>
                <div className="d-flex justify-content-between">
                    <LinkContainer to={`/posts/${id}`}>
                        <Button variant="outline-primary" size="sm">View Post</Button>
                    </LinkContainer>
                    <LinkContainer to={`/posts/${id}/edit`}>
                        <Button variant="outline-secondary" size="sm">Edit</Button>
                    </LinkContainer>
                </div>
            </Card.Body>
        </Card>
    );
}

export default PostCard;