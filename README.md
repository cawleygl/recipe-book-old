# Recipe Book

## Description of Application
This React application allows users to save recipes to a MongoDB cloud database. It consists of a recipe entry form that uses React state variables to create and save recipes by entering a name, individual recipe ingredients, and directions for completing the recipe step-by-step, along with other information about the recipe. Each recipe can be given customizable tags to group and sort the recipes in future updates.

## Planned Features
In future updates I plan to incorporate additional ways to view and sort recipes. When completed, this application is intended to be used to create shopping lists containing the ingredients of saved recipes, so I plan on adding features to select recipes and add their ingredients to an easily accesisble list. Other potential features include recipe editing, search functionality, and login authentication.

## Technologies Used
React, Node.js, Express, MongoDB, React-Bootstrap CSS Framework, FontAwesome, React Router, HTML, CSS, Javascript

## Link to Deployed Application
[Recipe Book](https://polar-waters-76491.herokuapp.com/)

# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.
