# Navic
# 🌍 City Tour Guide App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)

> A comprehensive full-stack web application designed to revolutionize city exploration for tourists through seamless integration of vehicle rentals, interactive mapping, and intelligent route planning.

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## 🎯 Overview

City Tour Guide App is a modern, full-stack web application that serves as a comprehensive platform for tourists to efficiently explore cities. The application combines vehicle rental services, location-based services, and intelligent route planning to create a seamless travel experience.

### Key Objectives

- **Streamline Urban Tourism**: Provide a one-stop solution for city exploration needs
- **Enhance User Experience**: Deliver intuitive, mobile-first design with real-time capabilities
- **Optimize Travel Planning**: Integrate smart routing and location services
- **Future-Ready Architecture**: Built to accommodate NavIC/GPS integration and AI-powered features

## ✨ Features

### Core Functionality

- **🚗 Vehicle Rental Management**
  - Browse and filter available vehicles (bikes, cars, bicycles, scooters)
  - Real-time availability checking
  - Secure booking and payment processing
  - Price comparison and category-based filtering

- **🗺️ Interactive Mapping**
  - Dynamic map interface with multiple provider support
  - Nearby attractions, hotels, and service discovery
  - Real-time location tracking capabilities
  - Custom marker and overlay management

- **🧭 Intelligent Route Planning**
  - Optimized route calculation between multiple destinations
  - Traffic-aware routing algorithms
  - Multi-modal transportation options
  - Estimated time and cost calculations

- **📱 Responsive Design**
  - Mobile-first architecture
  - Cross-platform compatibility
  - Progressive Web App (PWA) capabilities
  - Offline functionality support

### Advanced Features

- **🔐 Secure Authentication**
  - JWT-based authentication system
  - OAuth integration (Google, Facebook)
  - Role-based access control
  - Session management

- **📊 Analytics Dashboard**
  - User behavior tracking
  - Rental statistics and insights
  - Performance monitoring
  - Business intelligence features

## 🛠 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | ^18.0.0 | UI Framework |
| **Tailwind CSS** | ^3.0.0 | Styling |
| **Leaflet.js** | ^1.9.0 | Map Integration |
| **Axios** | ^1.0.0 | HTTP Client |
| **React Router** | ^6.0.0 | Navigation |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | ^16.0.0 | Runtime Environment |
| **Express.js** | ^4.18.0 | Web Framework |
| **MongoDB Atlas** | ^5.0.0 | Database |
| **Mongoose** | ^6.0.0 | ODM |
| **JWT** | ^8.5.0 | Authentication |

### DevOps & Deployment
- **Docker** - Containerization
- **Render/Vercel** - Hosting Platform
- **GitHub Actions** - CI/CD Pipeline
- **ESLint/Prettier** - Code Quality

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn**
- **MongoDB Atlas** account
- **Git** for version control
- **Code Editor** (VS Code recommended)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/city-tour-guide.git
cd city-tour-guide
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at:
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/city-tour-guide
DB_NAME=city_tour_guide

# Server Configuration
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# External APIs
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
MAPBOX_ACCESS_TOKEN=your-mapbox-token

# OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### Frontend Configuration

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
REACT_APP_MAPBOX_TOKEN=your-mapbox-token
```

## 🎮 Usage

### For Tourists

1. **Browse Rentals**: Filter vehicles by type, location, and price range
2. **Plan Routes**: Select destinations and get optimized routes
3. **Book Vehicles**: Secure booking with integrated payment processing
4. **Track Location**: Real-time GPS tracking and navigation assistance

### For Service Providers

1. **Manage Inventory**: Add and update vehicle listings
2. **Track Bookings**: Monitor rental requests and confirmations
3. **Analytics**: View performance metrics and customer insights

## 📚 API Documentation

### Authentication Endpoints

```http
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
POST /api/auth/logout      # User logout
GET  /api/auth/profile     # Get user profile
```

### Rental Management

```http
GET    /api/rentals              # Get all rentals
POST   /api/rentals              # Create new rental
GET    /api/rentals/:id          # Get rental by ID
PUT    /api/rentals/:id          # Update rental
DELETE /api/rentals/:id          # Delete rental
GET    /api/rentals/search       # Search rentals
```

### Location Services

```http
GET  /api/places/nearby          # Get nearby attractions
POST /api/routes                 # Calculate routes
GET  /api/places/search          # Search places
GET  /api/places/categories      # Get place categories
```

### Booking Management

```http
POST /api/bookings               # Create booking
GET  /api/bookings               # Get user bookings
GET  /api/bookings/:id           # Get booking details
PUT  /api/bookings/:id/cancel    # Cancel booking
```

For detailed API documentation, visit `/api/docs` when running the development server.

## 📁 Project Structure

```
city-tour-guide/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── config.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── rentalController.js
│   │   └── bookingController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Rental.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── rentals.js
│   │   └── bookings.js
│   ├── utils/
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── tests/
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── rental/
│   │   │   └── map/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Rentals.jsx
│   │   │   └── Profile.jsx
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── docs/
├── .gitignore
├── docker-compose.yml
├── README.md
└── LICENSE
```

## 🤝 Contributing

We welcome contributions to the City Tour Guide App! Please follow these steps:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests if applicable
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Code Standards

- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


### Contact
- **Email**: soni3anuj@gmail.com
- **LinkedIn**: [City Tour Guide]((https://www.linkedin.com/in/anuj-soni-2387b5291/))

---

<div align="center">

**[⬆ Back to Top](#NAVIC-city-tour-guide-app)**

</div>
