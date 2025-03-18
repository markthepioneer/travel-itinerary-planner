# Travel Itinerary Planner

A web application that allows users to plan their travel itineraries by selecting dates and activities, generating optimized schedules with dynamic pricing.

## Features

- Select trip dates (arrival and departure)
- Choose from available activities
- Generate automated itineraries with optimized schedules
- Calculate dynamic pricing based on selections
- Modify selections and recalculate itineraries
- View and download final itineraries

## Tech Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Deployment**: AWS/Vercel for frontend, Heroku/AWS for backend

## Project Structure

```
travel-itinerary-planner/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Main app pages
│       ├── services/        # API services
│       └── utils/           # Helper functions
├── server/                  # Node.js backend
│   ├── controllers/         # Request handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   └── utils/               # Helper functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/markthepioneer/travel-itinerary-planner.git
   cd travel-itinerary-planner
   ```

2. Install server dependencies
   ```
   cd server
   npm install
   ```

3. Install client dependencies
   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory with your MongoDB connection string and other environment variables

5. Start the development servers
   - For backend: `cd server && npm run dev`
   - For frontend: `cd client && npm start`

## License

MIT
