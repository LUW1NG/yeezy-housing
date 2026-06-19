import React, { useEffect } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react'; // Добавили router
import './Show.css';

export default function Show({ house, comments, auth }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        body: '',
    });
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['comments'],
                preserveScroll: true,
                preserveState: true,
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);
    const submit = (e) => {
        e.preventDefault();
        post(`/houses/${house.id}/comments`, {
            onSuccess: () => reset('body'),
            preserveScroll: true,
        });
    };
    return (
        <div className="show-wrapper">
            <Head title={`${house.address} - FORUM`} />     
            <nav className="show-nav">
                <Link href="/" className="back-button">← BACK TO LIST</Link>
            </nav>

            <header className="show-header">
                <div className="header-main">
                    <h1 className="show-address">{house.address}</h1>
                    <span className="show-zip">{house.zip_code}</span>
                </div>
                <div className="show-meta">
                    <span className="meta-item">{house.city}</span>
                    <span className="meta-divider">/</span>
                    <span className="meta-item">{house.country}</span>
                </div>
            </header>

            <main className="forum-container">
                <section className="input-section">
                {auth.user ? (
                    <form onSubmit={submit} className="comment-form">
                        <textarea
                            value={data.body}
                            onChange={e => setData('body', e.target.value)}
                            placeholder="TYPE YOUR MESSAGE..."
                            className="comment-input"
                        />
                        <button type="submit" disabled={processing} className="submit-btn">
                            POST TO FORUM
                        </button>
                    </form>
                ) : (
                    <div className="login-prompt">
                        <p>YOU MUST BE LOGGED IN TO PARTICIPATE IN THE DISCUSSION.</p>
                        <Link href="/login" className="login-btn-link">LOGIN TO POST</Link>
                    </div>
                )}
            </section>
                <section className="comments-section">
                    <div className="comments-header">
                        FEED ({comments.length})
                    </div>
                    
                    <div className="comments-list">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="comment-card">
                                    <div className="comment-info">
                                        <span className="comment-author">
                                            {comment.user ? comment.user.name : 'ANONYMOUS_GUEST'}
                                        </span>
                                        <span className="comment-id">#{comment.id.toString().padStart(4, '0')}</span>
                                    </div>
                                    <p className="comment-body">{comment.body}</p>
                                    <div className="comment-footer">
                                        {new Date(comment.created_at).toLocaleString('en-US', {
                                            hour12: false,
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-comments">NO MESSAGES YET. START THE CONVERSATION.</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}