# Getting Started with this project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### `npm install`

As always, clone this project to your machine and install the required dependencies in Terminal using `npm install`.

This app has been tested with Node version 19 and the latest versions of Google Chrome, Firefox and Safari on Mac.

Feel free to contact me at hola@alvaro.design if you can't view this project in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

I wasn't able to make tests with Jest work for this project before the recommended time was over.

## Decisions

### Technical

I used:

- React as the JS framework because:
    - I had set up small projects using Create React App before
    - I have more experience with React than with other JS frameworks
    - Tinybird and Vercel are partners

- ChatGPT to query Tinybird and because I hadn't done it before in order to save time

- Jest for tests, which already comes bundled with React, but I ran out of time and couldn't make a basic test run without errors. I had used Cypress before but wouldn't have time to set it up for this exercise.

- Online generators to add some design details like a background mesh, background noise or a checkerboard without having to do them from scratch.

- reset.css and normalise.css to have a baseline design in most browsers. Then applied custom CSS by hand, using CSS custom properties to save time while deciding on color and spacing values.

I tried to make sure everything is mobile-first, responsive and works well in all kinds of screen sizes, using vw units or clamp

I also spent a bit of time making the site more accessible by adding keyboard navigation between the controls.

### Design

- I decided on an obvious color scheme inspired by NYC taxis

- I used Google and ChatGPT to find NYC taxi zone codes, cheap and expensive zone codes, infography inspiration...

- I wanted to visualize how much people tip while taking rides alone vs rides with other people. Then I wanted to add a bit of interactivity: for that I chose to visualize whether tips vary by destination, choosing between a richer and a poorer zone.

- I checked for color contrast using Chrome DevTools as I was deciding on colors to make sure they're accessible.

### Next steps

Some things I would continue working on:

- Adding tests that work!
- Add some animation/transition when the site loads and data appears
- Think of more interesting/insightful storytelling to include in the widget
- If data takes too long to load, offer some type of error and alternative action (refresh, try again in a few minutes...)
- Add other filters, like filtering by total trip duration, see how that correlates to tip amount