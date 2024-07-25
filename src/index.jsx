import React from 'react'
import ReactDOM from 'react-dom/client'

import TicTacToe from './Game/TicTacToe.jsx'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TicTacToe />
  </React.StrictMode>,
)
