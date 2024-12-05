# Learnchain Test(1)

# How to Run the API Locally

Follow these steps to set up and run the API locally on your machine:

## Prerequisites

- Install [Node.js](https://nodejs.org/) (LTS version recommended).
- Install a code editor like [VS Code](https://code.visualstudio.com/).
- Ensure you have Git installed.
- A terminal or command prompt for running commands.

## Steps

1. Clone the Repository  
   Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/YourUsername/YourRepoName.git

   ```

2. Install the required Node.js dependencies:
   npm install

3. Start the development server:
   npm run dev

4. Once the server is running, you can access the API at:
   http://localhost:5500

## Available Endpoints

1.  User Registration
    POST /http://localhost:5500/auth/register
    Register a new user with the following fields in the request body:
    {
    "name": "Your Name",
    "email": "your.email@example.com",
    "password": "yourpassword"
    }

2.  User Login
    POST /http://localhost:5500/auth/login
    Log in using the following fields in the request body:
    {
    "email": "your.email@example.com",
    "password": "yourpassword"
    }

3.  List Courses
    GET /http://localhost:5500/courses/
    Retrieve a list of all available courses.

4.  Enroll in a Course
    POST /http://localhost:5500/enroll/
    Enroll a user in a course by providing user_id and course_id in the request body:
    {
    "user_id": 1,
    "course_id": 2
    }
