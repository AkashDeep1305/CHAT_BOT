# Chatbot using Gemini API

This is a chatbot project that utilizes the Gemini API for intelligent conversations. The project is structured into two main folders:

- **Backend**: Handles API requests and responses using Express.js.
- **Frontend**: Provides a user-friendly interface for interacting with the chatbot using React.js.

## Project Structure
```
chatbot-project/
├── backend/     # Express.js backend
├── frontend/    # React.js frontend
```

## Description
This chatbot leverages the Gemini API to provide intelligent and dynamic responses to user inputs. The backend is built using Express.js and manages API requests, while the frontend is developed with React.js to offer a smooth user experience. The project follows a modular structure to separate concerns efficiently.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation Guide
Since both the backend and frontend folders do not contain `node_modules`, you need to install the required dependencies manually.


### 1. Backend Setup
```sh
cd backend
npm install
```
#### Install required dependencies:
```sh
npm install express cors dotenv
```
#### Configure Environment Variables
Create a `.env` file in the `backend` folder and add your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

### 2. Frontend Setup
```sh
cd ../frontend
npm install
```
#### Install required dependencies:
```sh
npm install react-markdown axios react-simple-code-editor prismjs
```

## Running the Project
### Start Backend Server
```sh
cd backend
node server.js
```

### Start Frontend Server
```sh
cd frontend
npm start
```

## Features
- Chatbot powered by Gemini API
- User-friendly frontend with React
- Secure backend using Express and dotenv

## Contributing
Feel free to fork this repository and contribute to the project.
