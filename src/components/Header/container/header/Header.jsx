import React from 'react';
import { Container, Logo } from '../../../index';
import LogoutBtn from './LogoutBtn';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
            <Container>
                <nav className="flex items-center justify-between py-3">
                    
                    
                    <div className="flex-shrink-0 mr-4">
                        <Link to="/" className="block transition-transform duration-200 hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-2xl">
                            <Logo width="50px" />
                        </Link>
                    </div>

                    
                    <ul className="flex flex-wrap items-center justify-end gap-1 sm:gap-2 ml-auto">
                        {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-200 ease-in-out hover:text-gray-900 hover:bg-gray-100/80 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        
                        {authStatus && (
                            <li className="ml-1 sm:ml-2">
                                
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                    
                </nav>
            </Container>
        </header>
    );
}

export default Header;