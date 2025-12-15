import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PostProvider } from './hooks/usePostStore';

// Components
import Header from './components/Header';
import { Alert } from 'react-bootstrap';
// Pages
import PostList from './pages/PostList';
import PostCreate from './pages/PostCreate';
import PostView from './pages/PostView';
import PostEdit from './pages/PostEdit';

function App() {
    return (
        <Router>
            <PostProvider>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<PostList />} />
                        <Route path="/posts/new" element={<PostCreate />} />
                        <Route path="/posts/:id" element={<PostView />} />
                        <Route path="/posts/:id/edit" element={<PostEdit />} />
                        {/* Catch-all for 404 */}
                        <Route path="*" element={
                            <div className="container my-5">
                                <Alert variant="warning">
                                    <h3>404 - Page Not Found</h3>
                                    <p>The page you are looking for does not exist.</p>
                                
                                </Alert>
                            </div>
                        } />
                    </Routes>
                </main>
            </PostProvider>
        </Router>
    );
}

export default App;
