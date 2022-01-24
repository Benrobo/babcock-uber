# Babcock-Uber App

Get a ride quickly as possible using this app meant for the babcock university.

##### User Profile Home Page (Student [left], Driver [right])

<p align="center">
    <img src="https://raw.githubusercontent.com/Benrobo/babcock-uber/main/readmeImg/babcock-profile.png">
    <br />
</p>

##### Ride Request Accepted Page (Student [left], Driver [right])

<img src="https://raw.githubusercontent.com/Benrobo/babcock-uber/main/readmeImg/babcock-ride.png">

##### Request Accepted Page (Student [left], Driver [right])

<img src="https://raw.githubusercontent.com/Benrobo/babcock-uber/main/readmeImg/babcock-request.png">

## Getting Started

### Tech Stacks.

This project is created using the below technologies:

- Frontend

  - [React](https://reactjs.org/) :- A single page application library meant for creating reusable UI components.
  - [Notyf](https://carlosroso.com/notyf/) :- A smooth toast notification library.
  - [React-Router](https://reactrouter.com/) :- A react dynamic routing library.
  - [Socket.io_client](https://socket.io/) :- A real-time bi-directional communication library between client and server.

- Backend
  - [Node.js](https://nodejs.org/en/) :- A javascript runtime environment made for building realtime , data intensive applications.
  - [Express.js](https://expressjs.com/) :- is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs
  - [Socket.io_client](https://socket.io/) :- A real-time bi-directional communication library between client and server.
- Database Management
  - [Postgresql](https://www.postgresql.org/) :- open-source relational database management system emphasizing extensibility and SQL compliance

### Running Frontend Locally.

Running this project locally it is required you have the above tools pre-installed on your pc, if not, follow the instructions below.

1. Download or Clone The Project.

Using the below command means you have git installed on your pc if not simply download the project from this site.

```
 git clone https://github.com/Benrobo/babcock-uber.git
```

2. Open the folder where it was downloaded on the terminal, in my case it would be

```
   // windows

   C:/user/Desktop/babcock-uber>

   // linux
   benrobo@benrobo:~/Desktop/babcock-uber$
```

3. Install all Dependencies.
   Before making use of the command stated below make sure you have the latest version of nodejs installed, if not here is a video on how to download and setup nodejs on your pc.

- windows
  - [https://www.youtube.com/watch?v=GjfYHwlFI-c](https://www.youtube.com/watch?v=GjfYHwlFI-c)
- Mac
  - [https://www.youtube.com/watch?v=0i-gstqgjuE](https://www.youtube.com/watch?v=0i-gstqgjuE)
- Linux
  - [https://www.youtube.com/watch?v=OMhMnj7SBRQ](https://www.youtube.com/watch?v=OMhMnj7SBRQ)

After doing that, make sure to check if it installed correctly on your pc. To verify, simply use the below command

```
 node --version
 //and
 npm --version
```

The above command would print each version of the node.js and npm package if installed correctly.

Now let install all dependencies in our client application which was downloaded previously using the command below.

```
   C:/user/Desktop/babcock-uber> npm install
```

If everything installed sucessfully with no error, congratulation your're all setup for the client application to be view on the browser.
But holdon a bit, we cant just run this fullstack application without the need of a `backend`. Now let setup our backend

### Setting up the backend and database logic.

1. Download or clone the backend api logic using the instructions below

   - [x] Download the project from here [babcock-api](https://github.com/Benrobo/babcock-api)

2. After downloading the project into your pc, move into the directory where you downloded it, in my case it

```
   // windows

   C:/user/Desktop/babcock-api>

   // linux
   benrobo@benrobo:~/Desktop/babcock-api$
```

3. Now installed all the dependencies present in the project `package.json` file using

```
   // windows
   C:/user/Desktop/babcock-api> npm install

   // linux
   benrobo@benrobo:~/Desktop/babcock-api$ npm install
```

Doing this would install all the dependencies which was used in this project.

Before running the backend api server, our backend logic depends on a `Postgresql` database which is used to store user info, to setup `postgresql` database on your system, Please watch the below videos to download, install and setup postgresql database on your pc.

- [x] Postgresql Installation
  - [windows: https://www.youtube.com/watch?v=e1MwsT5FJRQ](https://www.youtube.com/watch?v=e1MwsT5FJRQ)
  - [Mac: https://www.youtube.com/watch?v=5AOkxqFaYEE]
    -(https://www.youtube.com/watch?v=5AOkxqFaYEE)
  - [Linux: https://www.youtube.com/watch?v=-LwI4HMR_Eg&t=160s](https://www.youtube.com/watch?v=-LwI4HMR_Eg&t=160s)

After installation was successfull, kindly check if postgresql is enabled globally on your pc using the below command

```
//windows
C:/> psql -U postgres // the name which was set when installing it.
// Linux
benrobo@benrobo:~/$ sudo -i -u postgres psql
```

Doing this would show the below image if everything works successfully.

- [x] windows
      <img src="https://linuxhint.com/wp-content/uploads/2021/09/image12-4.png">
- [x] Linux
      <img src="https://sqlserverguides.com/wp-content/uploads/2021/06/PostgreSQL-connect-to-postgres-database.png">
- [x] Mac
      <img src="https://www.sqlshack.com/wp-content/uploads/2021/04/creating-new-user-in-postgres.png">

If all went well, continue with the following steps

4. Create necessary database and tables in postgresql

Within the `babcock-api` there exist a file called `.sql`, this file contains the queries you need to make to create both the tables and database of the server. Simply copy each statement one after the other and paste into the postgresql terminal after loggin in. Starting from

```sql
1. -- Database

CREATE DATABASE "babcock-uber";

```

3. Connect the database created using the command below

```js
    postgres=# \c "babcock-uber"
```

after doing that, the postgresql terminal directory should change into the one below having the database name

```js
 babcock-uber=#
```

4. Copy and Paste all queries line after line into the postgresql database terminal

```sql

1. -- organization table

CREATE TABLE "usersTable"(
    id TEXT UNIQUE NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "usersIdentifier" TEXT NOT NULL,
    "profilePics" TEXT NOT NULL,
    "userRole" TEXT,
    "status" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL
);

2. -- trips table

CREATE TABLE "trips"(
    id TEXT UNIQUE NOT NULL PRIMARY KEY,
    "studentId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

```

After doing that, verify if all tables were correctly created using the command below

```js
 babcock-uber=# \d
```

this should print all tables present in that database.

If not, then you inserted the queries wrongly, else congratulation you've just setup your backend database server.

### Run the backend api server and client

After applying all necessary instructions correctly, it time to put all this to the test using the below command.

Navigate to where the `babcock-uber` and `babcock-api` was downloaded and run the command below

```js

    ... Running the client app

    // babcock-uber client
    C:/users/benrobo/Desktop/babcock-uber> npm start

    // this should spin up the local react server in your browser. with the url of http://localhost:3000

    ... Running the backend api server
        // babcock-uber client
    C:/users/benrobo/Desktop/babcock-uber> npm start

    // this should spin up the local nodejs server in your terminal.

```

you should be presented with this screen

<img src="https://raw.githubusercontent.com/Benrobo/babcock-uber/main/readmeImg/home.png">

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
