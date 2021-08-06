# React web app
A static react app that served by AWS S3.

# Setup
Populate package:
```
npm install
```

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


Deploy:
```
serverless deploy
```

# Commands
Generate Type for GraphQL Query:
```
apollo client:codegen --target typescript
```

# Components
* React for web application: https://reactjs.org/docs/create-a-new-react-app.html 
  * Creating With Typescript: npx create-react-app my-app --template typescript
* Typed React Router DOM for routing: https://www.npmjs.com/package/@types/react-router-dom
* Apollo Client for client side graphQL handling. https://www.apollographql.com/docs/react/get-started/
* Material UI for UI Component: https://material-ui.com/