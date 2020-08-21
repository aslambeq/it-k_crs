import React from 'react'
import ReactDOM from 'react-dom'
import MainApp from './App'

test('renders w/o crash', () => {
    const div = document.createElement('div')
    ReactDOM.render(<MainApp />, div)
    ReactDOM.unmountComponentAtNode(div)
})
