# Call App

A real-time calling application that uses Vue.js for the frontend and .NET Web API for the backend. The app allows the user to receive and dial call to any number..

## Technologies Used
### Frontend
- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **HTML & CSS**: Used for structuring and styling the application.

### Backend
- **.NET Web API**: Backend calling REST api's.
- **Twilio**: Api that manages real-time call connection between the server and the client.
- **C#**: Backend programming language.

## Getting Started

### Prerequisites
- **Node.js**: Required to run the frontend.
- **.NET SDK**: Required to build and run the backend.
- **Visual Studio or VS Code**: Recommended for development.
- **Twilio api account**: For establishing call connection.

## Setup Instructions

### Backend (C#)
Download and setup the backend service from: https://github.com/muralitheprogrammer/call-app-backend.git


### Frontend (Vue.js)
1. **Clone the frontend repository**:
   ```
   git clone https://github.com/muralitheprogrammer/call-app.git
   cd call-app
   npm install

2. **Update Backend API Base URL in 'src/components/ToolbarComponent.vue'**:
    ```
    axios.defaults.baseURL = 'https://localhost:7093/api';
3. **Start the frontend development server**:
    ```
    npm run serve

## How It Works
### SignalR Integration: 
The frontend uses SignalR to establish a real-time connection with the .NET Web API backend for notifications.
### Notification Handling: 
New notifications are added to the top of the list and the bell icon updates to reflect unread notifications.