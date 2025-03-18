import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">404 - Page Not Found</h1>
      <p className="text-xl mb-8">The page you are looking for does not exist.</p>
      <Link 
        to="/" 
        className="bg-blue-800 text-white hover:bg-blue-700 transition-colors py-3 px-8 rounded-full text-lg font-semibold"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
