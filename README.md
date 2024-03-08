# Upload Files Client-Server

This project consists of a **[`Node.js`](https://nodejs.org/en) server** and a **[`React`](https://react.dev/) client**, both implemented in [TypeScript](https://www.typescriptlang.org/). The server utilizes [Express.js](https://expressjs.com/) for handling API routes, [MySQL](https://www.mysql.com/) for database operations, and [Multer](https://www.npmjs.com/package/multer) for file uploads. 
The client utilizes [`React`](https://react.dev/) for the front-end and [Axios](https://axios-http.com/) for making HTTP requests to the server. Additionally, [Tailwind CSS](https://tailwindcss.com/) is used for styling the client-side components.

## Server

### Technologies Used
- **Express.js**
- **MySQL**
- **Multer**
- **TypeScript**

### Database Setup
- **Database Table**: Before running the server, ensure you have a MySQL database set up. Create a table named `files` with a column named `name` (you can change these names in the code later, but for the current setup, this table structure is necessary).

### Server Features
- **File Upload**: The server provides an endpoint (`/upload`) for uploading files. Uploaded files are stored in the `public/upload` directory with unique filenames generated using a custom function.
- **Database Connection**: The server connects to a MySQL database using environment variables for configuration.

### How Unique Filenames are Generated
- Unique filenames for uploaded files are generated using a custom function `randomName()`, which creates a random string of characters. This ensures uniqueness for each uploaded file.

### Environment Variables
Create a `.env` file in the server directory with the following configuration (edit it according to your configuration):
```.env
PORT="8081"

MYSQL_HOST="127.0.0.1"
MYSQL_PORT="3306"
MYSQL_DATABASE="db"
MYSQL_USER="root"
MYSQL_PASSWORD=""
```


## Client

### Technologies Used
- **React**
- **Axios**
- **TypeScript**
- **Tailwind CSS**

### Client Features
- **File Upload**: The client provides a simple UI for selecting and uploading files to the server.
- **Feedback Messages**: Messages are displayed to the user indicating the status of the file upload process (e.g., success or failure).

### Uploading Files
- When a file is selected for upload, it is sent to the server using an HTTP POST request to the `/upload` endpoint.

## Getting Started

1. Clone the repository: `git clone https://github.com/lfixas/Upload-Files-Client-Server.git`
2. Navigate to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Create a `.env` file and configure environment variables as described above.
5. Start the server: `npm start`
6. Open another terminal and navigate to the client directory: `cd ../client`
7. Install dependencies: `npm install`
8. Start the client: `npm start`
9. Access the application in your browser at [http://localhost:3000](http://localhost:3000) (or another port if specified).

## Additional Notes
- Make sure you have **Node.js** and **MySQL** installed on your system.
- Ensure the MySQL server is running and accessible.
- **Tailwind CSS** is used for styling the client-side components. You can customize the styles by modifying the Tailwind CSS configuration file (`tailwind.config.js`) and the CSS classes in the React components.

## Author
- **Lucas Fixari**
  - GitHub: [github.com/lfixas](https://github.com/lfixas)

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to reach out if you have any questions or need further assistance!
