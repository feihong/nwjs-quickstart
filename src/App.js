import React, { useState, useEffect } from 'react'
import os from 'os'
import fs from 'fs'

const platform = `${os.platform}`

export default function App({ win }) {
  const [text, setText] = useState('你好世界！')
  const [address, setAddress] = useState('')
  const [name, setName] = useState('?')
  const [deps, setDeps] = useState([])

  function fetchIpAddress() {
    fetch("http://ipecho.net/plain")
      .then(res => res.text())
      .then(text => setAddress(text))
  }

  useEffect(() => {
    readPackageJson()
      .then(data => {
        setName(data.name)
        setDeps(Object.entries(data.dependencies))
      })
  }, []) // last argument is [] to ensure callback runs only on mount

  return (
    <div className="p-4">
      <h1 className="mb-4">{text}</h1>
      <div className="mb-4">
        Your OS is <span className="text-blue">{platform}</span>.
        The name of your app is <span className="text-green">{name}</span>.
        {address ?
          <span>Your IP address is <span className="text-orange-dark">{address}</span>.</span>
          : null
        }
      </div>
      <div className="mb-4">
        <Button
          className="mr-2"
          text="Generate"
          onClick={() => setText(getRandomHanzis())} />
        <Button
          text="Get IP address"
          onClick={fetchIpAddress}
        />
      </div>
      <div className="mb-2">Your app has the following dependencies:</div>
      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {
            deps.map(dep => {
              let [pkg, version] = dep
              return <tr key={pkg}>
                <td className="font-semibold">{pkg}</td>
                <td className="text-grey-darker">{version}</td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

function Button({ text, className, onClick }) {
  className = `bg-grey-light px-2 py-1 text-black rounded-lg ${className}`
  return (
    <button
      className={className}
      onClick={onClick}>{text}</button>
  )
}

// Return a number between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomHanzi() {
  let codePoint = getRandomInt(0x4e00, 0x9fff)
  return String.fromCodePoint(codePoint)
}

function getRandomHanzis() {
  let result = []
  for (let i = 0; i < getRandomInt(3, 11); i++) {
    result.push(getRandomHanzi())
  }
  return result
}

function readPackageJson() {
  return new Promise(resolve => {
    fs.readFile('./package.json', 'utf-8', (err, data) => {
      resolve(JSON.parse(data))
    })
  })
}
