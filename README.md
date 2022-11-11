# Random Cat API

### Description

This project is my first ever attempt at TypeScript. After a relatively short TypeScript lecture, I spent 2 days pouring over docs and StackOverflow, and tested everything I was reading and seeing in a ts-node environment. If memory serves, I even discovered some TS array properties that weren't clearly documented (I may revisit that to see if I can make a contribution to said docs).

The app itself is very simple, taking in the response from an API call that returns a random cat image and displaying that image. There is a button that displays the next cat.

I also used [Mockaroo](https://www.mockaroo.com/) to generate a list of random names as a JSON file, pulled in that file as an array, then generate a random number to use as an index and assign it to each cat displayed.

There were two issues that I ran into while writing this app.

- React-TypeScript Props

Passing props to a React component was tricky as a first time exercise in TypeScript. What I ended up choosing to do was to declare a state variable called `catProps`, then pass that state variable down to the child component. In hindsight, I believe I have two other options. I could either create a type/interface for the `catProps`, then pass that down, or I could extract the state into context, and use a custom hook to retrieve it. The second option feels too contrived for this small a project.

- Funky useEffects

I was having issues with my `useEffect` running twice. I know that this is intended react functionality in a development environment, however, it was happening even when I ran a production build. I went through many iterations of useEffect syntax and general code refactoring before I finally landed on a solution. I simply added a loading state, and a check at the start of the useEffect:

    if (!loading) return;

This check at the start of the useEffect will eject you from that hook if the loading state is false.

Adding this loading state had the added benefit of allowing me to easily fetch a new cat, but putting loading into the dependency array of the useEffect, then simply toggling loading on button click.
