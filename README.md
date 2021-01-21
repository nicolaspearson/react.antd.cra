# React Starter

Starter project for React built using Typescript, MobX, Ant Design, and Webpack. We leverage [Create React App Configuration Override](https://github.com/sharegate/craco) in order to provide custom build functionality.

## Getting Started

To get started clone the repository and run:

```bash
yarn install
```

Followed by:

```
yarn start
```

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Docker

This project includes a multi-stage Dockerfile.

To build the image:

```
docker build . --tag react-starter-client:1.0
```

Alternatively, build and run:

```
docker-compose up --build
```

Or, just run the existing image:

```
docker-compose up
```

Runs the app in production mode.
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Contribution guidelines

Code reviews are done via pull requests.
