## Technologies Used

Frontend: React.js, Tailwind CSS, Fetch API, react-icons

Backend: Node.js, Express.js, PostgreSQL

## Setup and Installation

Prerequisites

Node.js and npm

PostgreSQL

Running Both Frontend and Backend Locally

1. Clone the repository:

   git clone https://github.com/Gowtham-Neo/Address-Flow
   
   cd Address-Flow

Backend Setup

1. Navigate to the backend directory:

   cd Server

2. Install the dependencies:

   npm install

3. In the Backend directory, Open config/config.json and ensure the development configuration matches (username and password) your PostgreSQL setup:

![image](https://github.com/user-attachments/assets/2fcf3ce2-582b-4b30-97a1-d03250b77024)

      npx sequelize-cli db:create
      npx sequelize-cli db:migrate

4. Start the Backend server

   npm start

This will run in the port of `3000`.

## Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:

        cd ../Client

2.  Install the dependencies:

    npm install

3.  Run the frontend server:

    npm run dev

Open any browser and use this address the see the website `http://localhost:5173/`
