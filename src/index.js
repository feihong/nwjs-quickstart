require('@babel/register')({
  presets: ["@babel/preset-env", "@babel/preset-react"],
})
const React = require('react')
const ReactDOM = require('react-dom')
// Even though this file is in src/, you still have import from ./src
const App = require('./src/App').default

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById('index')
)
