require('@babel/register')({
  presets: ["@babel/preset-env", "@babel/preset-react"],
})
const React = require('react')
const ReactDOM = require('react-dom')
const App = require('./src/App').default

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById('index')
)
