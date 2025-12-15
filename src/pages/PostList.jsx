import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, Badge, Alert } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePostStore';

function PostList() {
    const { posts } = usePosts();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAuthor, setFilterAuthor] = useState('');
    
    // Extract unique authors for the filter dropdown
    const uniqueAuthors = useMemo(() => {
        const authors = new Set(posts.map(p => p.author));
        return ['', ...Array.from(authors).sort()];
    }, [posts]);

    // Filter and Search Logic
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesAuthor = !filterAuthor || post.author === filterAuthor;
            return matchesSearch && matchesAuthor;
        });
    }, [posts, searchTerm, filterAuthor]);

    // No Pagination implemented, but ready for expansion
    
    return (
        <Container className="my-5">
            <h1 className="mb-4">📋 All Posts ({posts.length})</h1>
            
            <Row className="mb-4 g-3">
                {/* Search */}
                <Col md={6}>
                    <Form.Control
                        type="search"
                        placeholder="Search posts by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                {/* Filter by Author */}
                <Col md={6}>
                    <Form.Select 
                        value={filterAuthor} 
                        onChange={(e) => setFilterAuthor(e.target.value)}
                    >
                        {uniqueAuthors.map(author => (
                            <option key={author || 'all'} value={author}>
                                {author ? `Filter by: ${author}` : 'Filter by All Authors'}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>

            {filteredPosts.length === 0 ? (
                <Alert variant="info" className="text-center mt-5">
                    No posts found matching your criteria. Try adjusting the search or filter.
                </Alert>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredPosts.map(post => (
                        <Col key={post.id}>
                            <PostCard post={post} />
                        </Col>
                    ))}
                </Row>
            )}

            {/* Optional: Pagination Component Goes Here */}

        </Container>
    );
}

export default PostList;