import { render } from 'react-dom'
import React from 'react'
import App from './App'
import Planaria from '@planaria/react-planaria'
const conf = {
  query: {
    q: {
      find: { 
        "out.o1": "OP_RETURN"
      },
    }
  },
  listen: true,
}
render(<Planaria {...conf} app={App} />, document.getElementById('entry'))