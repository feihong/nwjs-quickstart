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
  }, []) // last argument is [] to ensure callback runs only on mount

  return (
    <div className="p-4">
      <h1 className="mb-4">你好世界！</h1>
      <div className="mb-4">
        Your OS is <span className="text-blue">{platform}</span>.
        Your IP address is <span className="text-orange-dark">{address}</span>.
        The name of your app is <span className="text-green">{name}</span>.
      </div>
      <div className="mb-4">
        <button className="bg-grey-light px-2 py-1 text-black rounded-lg" onClick={() => window.location.reload()}>Restart</button>
      </div>
      <div className="mb-2">Your app has the following dependencies:</div>
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
