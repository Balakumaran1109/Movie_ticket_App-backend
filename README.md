#  Movie Ticket Booking App - Backend  

This is the backend service for the Movie Ticket Booking App, handling user authentication, movie listings, showtimes, ticket bookings, and database management.  

##  Features  

-  User authentication & authorization (JWT-based).  
-  Manage movies, showtimes, and bookings.  
-  MongoDB for database storage.  
-  RESTful APIs using **Node.js** and **Express.js**.  

##  Tech Stack  

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT  
- **API Testing:** Postman  


##  Installation & Setup  

1. Clone the repository:  
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/movie-ticket-backend.git
cd movie-ticket-backend
```  

2. Install dependencies:  
```sh
npm install
```  

3. Set up environment variables (`.env`):  
```
Create a .env file in the root directory and specify the following variables:
MONGO_URI: MongoDB connection string
PORT: Port for the server to listen on 

4. Start the server:  
```sh
npm start
```  

##  API Endpoints  

| Method | Endpoint           | Description            |
|--------|-------------------|------------------------|
| GET    | /movie            | Fetch all movies      |
| GET    | /movie/:id        | Get movie details     |
| POST   | /booking          | Book a ticket         |
| GET    | user/bookings     | Fetch user bookings   |

##  Contributing  

Contributions are welcome! Feel free to submit **issues** or **pull requests**.  

##  Frontend Repository  

 The frontend repo can be found here: [Movie Ticket App Frontend](https://github.com/Balakumaran1109/Movie_ticket_App-frontend)  

##  License  

This project is open-source and available under the MIT License.

