
# Compass Challenge

A Veterinary Clinic API built with Node.js and Express for managing veterinary services. A client hired Compass to build a new microservice for its veterinary franchise. This microservice will be used by all the clinics they own for internal client and attendances management.



## Installation

To run this project locally, please follow these steps:
1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd <project-directory>
```

3. Install dependencies:
```bash
npm install
```

4. Compile the files to JavaScript: 
```bash
tsc
```

5. Create a .env file in the root directory of the project and set the following variables:
```bash
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
```

6. Start the development server:
```bash
npm start
```

The server will start running on http://localhost:5000. You can access the application by opening this URL in your web browser.
## Documentation and Swagger

The API documentation is available through Swagger. You can access it by opening the following URL in your web browser after starting the development server:

[http://localhost:5000/api-docs/](http://localhost:5000/api-docs/)

In the documentation, you can view request and response schemas, and even execute operations directly. It provides a convenient way to understand and interact with the API without the need for additional tools or clients.

## Screenshot

![Captura de tela](https://github.com/felipecomarques/nodejs-basics/assets/57302703/d795511a-a406-4ed5-893e-83741f23ee2a)

Screenshot demonstrating the project. It shows the registration of a tutor and a pet using the POST methods, and the retrieval using the GET method. It uses the [Insomnia](https://insomnia.rest/download) application to perform these operations, but you can also refer to the API documentation if it better suits your needs.
