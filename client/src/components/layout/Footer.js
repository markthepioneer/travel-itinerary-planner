import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Travel Itinerary Planner</h3>
            <p className="text-gray-300">
              Create custom travel itineraries with activities and dynamic pricing.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/planner" className="text-gray-300 hover:text-white transition-colors">Plan Your Trip</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-300">Email: info@travelplanner.example</p>
            <p className="text-gray-300">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
          &copy; {currentYear} Travel Itinerary Planner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
