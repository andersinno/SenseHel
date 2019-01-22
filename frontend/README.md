This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run

- `npm install` or `yarn install`

1. Development mode:

- `npm start` or `yarn start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

2. With docker-compose

- `docker-compose up`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

3. Build app for production

- `npm run build` or `yarn build`
- Builds the app for production to the `build` folder.

## Application structure

Application uses:

- eslint for linting
- prettier for code formatting
- husky for adding git hooks (esp pre-commit code formatting)
- axios for making api calls
- classnames (in some files)
- react-router for basic routing

Main application code lives in src directory which has:

- `/assets`: Contains all images and icon png files which are used through out the app
- `/components`: Contains _directories_ of reusable components. Each directory has index.js file and a styles file.
- `/containers`: Contains _directories_ which each represent a screen in the app
    - `/Tabs`: Contains the code which decides which tab should be rendered
- `/config`: Contains app wide config, currently only local storage keys
- `/services`: Contains app wide services, currently only API file
- `/theme`: Contains app wide fonts and colors
- `index.css`: Contains app wide stylesheet
- `App.js`: Contains code for routing