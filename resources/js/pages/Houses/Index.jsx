import React, { useState, useEffect, useRef } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import './Index.css';

export default function Index({ houses, filters, auth }) {
    const [search, setSearch] = useState(filters.search || '');
    const { processing } = usePage().props;
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            router.get('/', { search }, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);
    return (
        <div className="min-h-screen bg-white flex flex-col items-center px-8">
            <nav className="w-full flex justify-between items-center py-6 max-w-7xl">
                <div className="auth-section">
                    {auth.user ? (
                        <div className="flex gap-4 items-center">
                            <Link 
                                href="/dashboard" 
                                className="text-xs font-bold tracking-tighter text-black hover:text-gray-600 transition-colors"
                            >
                                {auth.user.name.toUpperCase()}
                            </Link>
                            <Link 
                                href="/logout" 
                                method="post" 
                                as="button" 
                                className="text-[10px] text-gray-400 hover:text-black transition-colors"
                            >
                                SIGN OUT
                            </Link>
                        </div>
                    ) : (
                        <Link className="text-xs tracking-widest text-gray-400 hover:text-black transition-colors" href="/login">
                            LOGIN
                        </Link>
                    )}
                </div>
                <div className="flex gap-6">
                </div>
            </nav>

            <div className={`logo ${processing ? 'logo-loading' : ''}`}>
                Yeezy Housing
            </div>

            <div className={`search-container ${search ? 'search-active' : 'search-initial'}`}>
                <input
                    type="text"
                    placeholder="ENTER ADDRESS"
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                />
                {search && houses.length > 0 && (
                    <div className="houses-list">
                        {houses.map((house) => (
                            <Link 
                                key={house.id} 
                                href={`/houses/${house.id}`} 
                                className="house-card"
                            >
                                <h2 className="house-address-short">
                                    {house.address.split(' ')[0]}
                                </h2>
                                <span className="house-zip">{house.zip_code}</span>
                                <p className="house-full-info">
                                    {house.address}, {house.city}, {house.country}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}