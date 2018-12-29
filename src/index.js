const fs = require('fs')
require('@babel/register')({
  presets: ["@babel/preset-env", "@babel/preset-react"],
})
const React = require('react')
const ReactDOM = require('react-dom')
// Imports are done relative from directory of index.html
const App = require('./src/App').default

ReactDOM.render(
  React.createElement(App, {}, null),
  document.getElementById('index')
)

// Hot reload:
const watcher = fs.watch('./src/App.js', (eventType) => {
  if (eventType === 'change') {
    nw.Window.get().reload()
    watcher.close()
  }
});
