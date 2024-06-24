# Event Management API

This repository contains the source code for the Event Management API. The API allows users to manage events, including creating, updating, and deleting events.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/8xNehanSS/event-management-api.git
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Set up the database:

   - Create a new database in your preferred database management system.
   - Update the database configuration in the `.env` file with your database credentials.

4. Start the server:

   ```bash
   npm start
   ```

## Usage

Once the server is running, you can access the API endpoints using the following base URL:

```
http://localhost:3000/api/v1
```

The API provides the following endpoints:

- `GET /events`: Get a list of all events.
- `GET /events/:id`: Get details of a specific event.
- `POST /events`: Create a new event.
- `PUT /events/:id`: Update an existing event.
- `DELETE /events/:id`: Delete an event.

For detailed documentation on how to use each endpoint, refer to the API documentation (under development).

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

Please ensure that your code follows the existing coding style and includes appropriate tests.

## License

This project is licensed under the [MIT License](./LICENSE).
