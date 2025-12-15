import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MIN_CONTENT_LENGTH = 50;

function PostForm({ initialData = {}, onSubmit, isEdit = false }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        author: initialData.author || '',
        content: initialData.content || '',
        // For editing, convert array back to comma-separated string
        tags: (initialData.tags && Array.isArray(initialData.tags) ? initialData.tags.join(', ') : initialData.tags) || '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required.';
        if (!formData.author.trim()) newErrors.author = 'Author is required.';
        if (!formData.content.trim()) {
            newErrors.content = 'Content is required.';
        } else if (formData.content.trim().length < MIN_CONTENT_LENGTH) {
            newErrors.content = `Content must be at least ${MIN_CONTENT_LENGTH} characters.`;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmitting(true);
            
            // Call the CRUD function passed from parent (createPost or updatePost)
            const postId = await onSubmit(formData);
            
            // Navigate after successful submit
            navigate(`/posts/${isEdit ? initialData.id : postId}`, { 
                state: { 
                    message: `Post successfully ${isEdit ? 'updated' : 'created'}!` 
                } 
            });
        }
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label>Title *</Form.Label>
                <Form.Control 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    isInvalid={!!errors.title}
                    required
                    maxLength={100}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.title}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="postAuthor">
                <Form.Label>Author *</Form.Label>
                <Form.Control 
                    type="text" 
                    name="author" 
                    value={formData.author} 
                    onChange={handleChange} 
                    isInvalid={!!errors.author}
                    required
                    maxLength={50}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.author}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="postContent">
                <Form.Label>Content * (Min {MIN_CONTENT_LENGTH} chars)</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={8} 
                    name="content" 
                    value={formData.content} 
                    onChange={handleChange} 
                    isInvalid={!!errors.content}
                    required
                    minLength={MIN_CONTENT_LENGTH}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.content}
                </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="postTags">
                <Form.Label>Tags (Comma-separated)</Form.Label>
                <Form.Control 
                    type="text" 
                    name="tags" 
                    value={formData.tags} 
                    onChange={handleChange} 
                    placeholder="e.g., react, javascript, ui"
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={submitting}>
                {isEdit ? 'Save Changes' : 'Create Post'}
            </Button>
            <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2">
                Cancel
            </Button>
        </Form>
    );
}

export default PostForm;