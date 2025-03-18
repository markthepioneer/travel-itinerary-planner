import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Create Your Perfect Travel Itinerary</h1>
          <p className="text-xl md:text-2xl mb-8">Select your dates and activities, and we'll generate a custom itinerary just for you.</p>
          <Link 
            to="/planner" 
            className="bg-white text-blue-800 hover:bg-blue-100 transition-colors py-3 px-8 rounded-full text-lg font-semibold shadow-lg"
          >
            Plan Your Trip
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3">Select Your Dates</h3>
              <p className="text-gray-600">Choose your arrival and departure dates to set the duration of your trip.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3">Pick Your Activities</h3>
              <p className="text-gray-600">Browse our selection of activities and add them to your itinerary.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3">Generate & Customize</h3>
              <p className="text-gray-600">We'll create an optimized schedule that you can customize to your preferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Activity Categories Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CategoryCard 
              title="Fishing" 
              description="Guided fly fishing experiences on pristine rivers and streams." 
              image="/images/fishing.jpg" 
            />
            <CategoryCard 
              title="Water Adventures" 
              description="Exciting rafting and kayaking trips for all skill levels." 
              image="/images/rafting.jpg" 
            />
            <CategoryCard 
              title="Horseback Riding" 
              description="Trail rides and horseback experiences in beautiful settings." 
              image="/images/horseback.jpg" 
            />
            <CategoryCard 
              title="ATV Excursions" 
              description="Thrilling ATV tours through varied terrain and landscapes." 
              image="/images/atv.jpg" 
            />
            <CategoryCard 
              title="Dining Experiences" 
              description="Unique dining options from cliff-side dinners to gourmet meals." 
              image="/images/dining.jpg" 
            />
            <CategoryCard 
              title="Spa Services" 
              description="Relaxing spa treatments to rejuvenate your body and mind." 
              image="/images/spa.jpg" 
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Trip?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Create a customized itinerary and make the most of your travel experience.</p>
          <Link 
            to="/planner" 
            className="bg-blue-800 text-white hover:bg-blue-700 transition-colors py-3 px-8 rounded-full text-lg font-semibold shadow-lg"
          >
            Start Planning Now
          </Link>
        </div>
      </section>
    </div>
  );
}

// Helper component for category cards
function CategoryCard({ title, description, image }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="h-48 bg-gray-300">
        {/* Image placeholder - in a real app, this would be an actual image */}
        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-800">
          <span className="text-lg font-semibold">{title} Image</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link 
          to="/planner" 
          className="text-blue-800 font-medium hover:text-blue-600 transition-colors"
        >
          Explore &rarr;
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
