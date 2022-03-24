# Guess6

This is a simple React/Typescript playground to study basic React features. The app itself is a game which allows the user to guess a 6-letter word from a dictionary. 

![guess6](guess6.png)

# Background

The app was written during a rainy saturday afternoon, in January of 2022. One of my daugthers came with a mobile version of this and a complaint about the mobile app
showing ads too often. My natural reaction was "hey, this looks simple, I wonder how much time does it take to implement this in React".

Turns out, about an hour, at least for me. I even [blogged about it](https://www.wiktorzychla.com/2022/02/guess6-in-react.html). 

Some time later, I've decided to spend yet another hour to polish the code a little bit, fix some issues and take a more general approach where some
basic React features could be packed together to show various ways of doing things (like parent-child communication).

# Notable features

There main component, `App`, basically renders the `Keyboard` and a list of candidate word, where each candidate is an instance of the `WordMatch` component.

The two, `App` and `Keyboard`, talk to each other - the `App` renders the `Keyboard` but `Keyboard` sends back whatever user accepts as their input. The two-way communication
between components can be implemented in various ways in React, in particular

* the parent can send a callback down to the child and the child can just call the callback
* both parent and the child can share the same [Context](https://reactjs.org/docs/context.html)
* both parent and the child can share a [Redux store](https://redux.js.org/)

The demo shows two first techniques, a callback and a shared context. Expect the last one, a Redux store, soon.

# Compilation

To recompile the application, just invoke `webpack` in the root folder

```
webpack
```

# Running the application

To run the application, use any HTTP server capable of serving static files. The [live-server](https://github.com/tapio/live-server) would do. So, just install the live-server

```
npm install -g live-server
```

and then run it from the root folder

```
live-server
```

This will host the app under `http://127.0.0.1:8080/app.html`