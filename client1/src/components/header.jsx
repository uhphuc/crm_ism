import { Link } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Title */}
                    <div className="flex-shrink-0 flex items-center">
                        <h1 className="text-xl font-bold text-indigo-600">
                            <Link to="/">CRM SYSTEM</Link>
                        </h1>
                    </div>

                    {/* Navigation */}
                    

                    {/* Auth Section */}
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-500">
                                    Welcome, {user.firstName || user.email}
                                </span>
                                <button
                                    onClick={() => {
                                        logout();
                                        window.location.reload();
                                    }}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div>
                                <Link
                                    to="/login"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;