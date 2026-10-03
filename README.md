# Public Infrastructure Reporting System

A web-based system that allows citizens to report public infrastructure problems such as potholes, broken streetlights, water leakage, damaged footpaths and open drains.

The system allows administrators to view reported issues and update their status. It also provides a simple Women Entrepreneur module for registration and basic business profile management.

## Features

### Citizen

- Citizen registration and login
- Report public infrastructure issues
- Select issue category
- Add issue description
- Upload image proof
- Capture current location using browser geolocation
- View reported issues
- Track issue status

### Admin

- Secure admin login
- View reported infrastructure issues
- View reporter details
- Monitor reported issues
- Update issue status
- Mark issues as In Progress or Resolved

### Women Entrepreneur

- Entrepreneur registration
- Login
- Add basic business details
- View business profile
- Update business information
- Automatic redirect to profile after registration

## Issue Categories

The system supports categories such as:

- Pothole
- Streetlight
- Water Leakage
- Damaged Footpath
- Open Drain
- Other

## Issue Status

An issue can have one of the following statuses:

- Pending
- In Progress
- Resolved

## Technology Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- CORS

### Other Technologies

- MongoDB Atlas
- GitHub
- Vercel
- Render
- Browser Geolocation API

## User Roles

The system contains three main user roles:

### Citizen

Citizens can register, login and report public infrastructure problems with descriptions, images and location information.

### Admin

Administrators can view reported issues and update their status.

### Entrepreneur

Women entrepreneurs can register and maintain their basic business information.

## Database

MongoDB is used as the database.

Main collections:

- users
- issues
- entrepreneurs

### Users Collection

Stores:

- Name
- Email
- Password
- Role
- Created date

### Issues Collection

Stores:

- Issue title
- Category
- Description
- Image
- Latitude
- Longitude
- Status
- Reporter
- Created date

### Entrepreneurs Collection

Stores:

- User ID
- Name
- Email
- Phone
- Business name
- Business category
- Business description
- Business location
- Years in business
- Created date

## Project Structure

```text
Public-Infrastructure-System
|
|-- Backend
|   |-- models
|   |-- routes
|   |-- middleware
|   |-- uploads
|   |-- .env
|   |-- package.json
|   `-- server.js
|
|-- Frontend
|   |-- src
|   |   |-- components
|   |   |-- pages
|   |   |-- App.jsx
|   |   |-- App.css
|   |   `-- main.jsx
|   |
|   |-- public
|   |-- .env
|   |-- package.json
|   |-- vercel.json
|   `-- vite.config.js
|
`-- README.md