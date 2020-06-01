# React - Puppeteer - Scrapper 
An [React](https://github.com/facebook/react) application with Express backend scraping for the social links of Soundcloud artists.
Created to assist me with creating descriptions for my YouTube videos, plus functionality to generate Tags.

## Stack and experience
The libaries included in this project are:
 
 * React   
 * Express 
 * Electron (optional)
 * Puppeteer (Headless Chrome Node.js API used for scrapping)
 * Material UI
 * SASS
 * Concurrently (npm package used to run multiple commands concurrently)
 * Heroku CLI (for deploying it)

## Screenshots

 * Input Page:
 ---
![Screenshot](https://i.postimg.cc/4N3jfbrn/Screenshot-2020-06-01-at-15-50-27.png)

 * Output Page
 ---
![Screenshot](https://i.postimg.cc/kg0HyrDt/Screenshot-2020-06-01-at-15-50-41.png)

## Development server
Run `npm start` in the scrapper-api forlder for a dev server.
Or use `npm run go` to concurrently scripts that run the node server + the react application and wrap them in an Electron window.

# LIVE DEMO
[The app is running HERE on Heroku](https://youtube-scrapper-react.herokuapp.com)