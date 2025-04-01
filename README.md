
# Used Book Marketplace

This is used book marketplace whcih in this user can buy or sell there books.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js** (for both backend and frontend development) - You can download it from [https://nodejs.org/](https://nodejs.org/)
* **npm** (Node Package Manager, usually comes with Node.js) or **yarn** (optional, you can install it with `npm install -g yarn`)
* **Angular CLI** (for frontend development) - You can install it globally using npm: `npm install -g @angular/cli`

## Backend Setup (Node.js)

The backend for this application is built using NodeJS. You mentioned that the `node_modules` folder is not included in the repository, which is good practice. To set up and run the backend:

1.  **Navigate to the backend directory:**
    Open your terminal or command prompt and navigate to the folder where your backend code is located. Assuming you have a folder named `backend` at the root of your project:
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    Run the following command to install all the necessary packages listed in the `package.json` file:
    ```bash
    npm install
    # or if you use yarn:
    # yarn install
    ```
    This will create the `node_modules` folder containing all the required libraries.

3.  **Start the backend server:**
    Typically, you can start the backend server using the `start` script defined in your backend's `package.json` file. Run:
    ```bash
    npm start
    # or if you use yarn:
    # yarn start
    ```
    This command will usually execute a script that runs your NodeJS server (e.g., `node server.js` or similar). Check your `backend/package.json` file under the `scripts` section to see the exact command.

## Frontend Setup (Angular)

The frontend for this application is built using Angular. You mentioned that the `angular` CLI, `.babel`, and `.babel.temp` files/folders are not in the repository. The Angular CLI will help generate necessary files. To set up and run the frontend:

1.  **Navigate to the frontend directory:**
    Open a new terminal or command prompt (or navigate back to the root of your project and then into the frontend folder). Assuming you have a folder named `frontend` at the root of your project:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    Run the following command to install all the necessary Angular packages listed in the `package.json` file:
    ```bash
    npm install
    # or if you use yarn:
    # yarn install
    ```
    This will create the `node_modules` folder containing all the Angular and other frontend dependencies.

3.  **Build the Angular application:**
    Before you can run the frontend in a production-like environment, you need to build it. Use the Angular CLI command:
    ```bash
    ng build
    ```
    This command compiles your Angular application and creates an optimized build in the `dist` folder within your frontend directory.

4.  **Start the frontend development server (for development):**
    If you are actively working on the frontend and want to use features like live reloading, you can use the Angular CLI development server:
    ```bash
    ng serve -o
    ```
    This command will build and serve your application, and the `-o` flag will automatically open it in your default web browser.

5.  **Serving the built application (for production or testing the build):**
    After running `ng build`, you can serve the contents of the `dist` folder using a simple HTTP server. You can use a package like `serve` for this. If you don't have it installed globally, you can install it:
    ```bash
    npm install -g serve
    # or yarn global add serve
    ```
    Then, navigate to the `dist` folder of your Angular project and run:
    ```bash
    cd dist/<your-project-name>
    serve -s .
    ```
    Replace `<your-project-name>` with the name of your Angular project directory inside the `dist` folder.

## Running the Application

1.  First, start the **backend** server by following the steps in the "Backend Setup" section.
2.  Next, start the **frontend** application. You can either use `ng serve` for development or serve the built assets from the `dist` folder.

Once both the backend and frontend are running, you should be able to access the Used Book Marketplace application in your web browser. The frontend URL will typically be `http://localhost:4200` if you used `ng serve`, or the URL provided by your HTTP server if you served the built assets. The backend URL will depend on how you configured your NodeJS server (e.g., `http://localhost:3000` is common).

## Database Setup (SQL)


1.  Ensure you have an SQL server running.
2.  Create a database named `book_marketplace` (or your preferred name).
3.  Configure the database connection details in your backend application (e.g., in a configuration file or environment variables).
4.  Run any necessary SQL scripts or migrations to create the required tables and schema.

## Further Information
In this I added quantity of books just to scope up the project by quantity feature even though it's used-book. And also few files I commented out if you want to add those make changes according for that make changes in session management.
