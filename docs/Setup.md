[Roommate Finder](../README.md) | [Use and Evaluate Application](/docs/Use.md)

Setup and Run Application
----------------------------------

This section contains information regarding how to set up and run this project. Please follow following steps to setup the project.

1. **Install NodeJS**

    Install latest version of NodeJS (8.10.0) . You can get installables for your host operating system on [this](https://nodejs.org/en/download/) link.

2. **Install MongoDB**

    Install latest version of MongoDB enterprise edition (3.6) . You can get documentation and resources required for MongoDB installation [here](https://docs.mongodb.com/manual/installation/). This guide contains information regarding MongoDB installation on all platforms.

3. **Clone Repo**

    Clone or fork our project [repo](https://github.com/Aishwarya2/RoommateFinder) on your local machine.

4. **NPM Install**

    Run `npm install` command from the directory where your clones our application. This will install all the required modules.

5. **Start MongoDB Service**

    Start MongoDB service on your local machine or on a hosted environment. Steps to start MongoDB service is given in above installation guide.

6. **Change MongoDB Connection Details**

    In `app.js` file change the mongodb connection to connect to your mongodb service instance.

    ![Home Page](/docs/screenshots/mongo_conn.jpeg?raw=true "Home Page")

7. **Change Other Parameters**

    In `app.js` file change parametes, such as PORT parameter to start application on your desired port. In `/routes/index.js` filr change SMTP server connection details with your credentials.

6. **Start Web Application**

    Run `node app.js` command to start our web application.

[<<< Previous](/docs/Use.md)