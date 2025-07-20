import React from 'react';
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext.jsx';

const Navbar = () => {
    const { toggleTheme } = useTheme();

    return (
        <header className={""}>
            <nav className={"py-4 flex items-center justify-between"}>
                <div className={"flex items-center gap-4 transition duration-200 hover:-translate-x-2 hover:scale-105 gap-4"}>
                    <Link to={'/'} className={"sm:text-base md:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"}>
                        Product Store 🛒
                    </Link>
                </div>
                {/* Icon for adding products and switching light and Dark modes*/}
                <div className={"flex items-center gap-4"}>
                    <Link to={"/create"}>
                        <button className={"py-2 px-4 rounded-3xl bg-blue-800 text-white transform hover:translate-x-2 hover:scale-105 transition duration-200"}>
                            Add Product
                        </button>
                    </Link>
                    <button
                        className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {/* Sun icon for dark mode */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 hidden dark:block"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>

                        {/* Moon icon for light mode */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 block dark:hidden"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;