import React, { useState, useEffect } from 'react'
import os from 'os'
import fs from 'fs'

const platform = `${os.platform}`

export default function App() {
  const [address, setAddress] = useState('?')
  const [name, setName] = useState('?')
  const [deps, setDeps] = useState([])

  useEffect(() => {
    fetch("http://ipecho.net/plain")
      .then(res => res.text())
      .then(text => setAddress(text))

    readPackageJson()
      .then(data => {
        setName(data.name)
        setDeps(Object.entries(data.dependencies).map(pair => pair.join(' ')))
      })
  }, [])

  return (
    <div>
      <h1>你好世界！</h1>
      <p>You are using {platform}.</p>
      <p>Your IP address is {address}.</p>
      <p>The name of your app is "{name}".</p>
      <p>Your app has the following dependencies:</p>
      <ul>
        {
          deps.map(dep => <li key={dep}>{dep}</li>)
        }
      </ul>
    </div>
  );
}

function readPackageJson() {
  return new Promise(resolve => {
    fs.readFile('./package.json', 'utf-8', (err, data) => {
      resolve(JSON.parse(data))
    })
  })
}
