🍽️ Recipe Selling Platform - Backend (Server2)
This is the backend of a full-stack MERN project for a Recipe Selling Website. Users can browse, buy, and sell recipes with secure login and payment systems.

🔧 Tech Stack
Node.js

Express.js

MongoDB + Mongoose

JWT for authentication

dotenv for configuration

CORS & Helmet for security

📁 Folder Structure (Server2)
lua
Copy
Edit
Server2/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── .env
├── server.js
├── package.json
🔐 Features
User Auth (Register/Login with JWT)

CRUD for Recipes

Secure Payment APIs (supports Card and UPI modes)

Recipe upload + purchase tracking

Admin and user role support (optional)

🔑 Environment Variables (.env)
env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
🚀 Run Instructions
Install dependencies:

bash
Copy
Edit
npm install
Run server:

bash
Copy
Edit
nodemon server.js
node server.js
Make sure MongoDB is running locally or use MongoDB Atlas.

🧪 Sample API Routes
Method	Route	Description
POST	/api/auth/login	User login
POST	/api/auth/register	User register
GET	/api/recipes	Get all recipes
POST	/api/recipes	Upload new recipe
POST	/api/payment	Process payment

💳 Payment
UPI and Card supported.

Card validation + encryption before storing to DB.

🧑‍🍳 Future Scope
Recipe ratings and reviews

Chef profiles

Order history

Image upload support (via Multer or Cloudinary)

