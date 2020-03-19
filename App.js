import React, { Component } from 'react'
const getAppName = require('./apps')
export default class App extends Component {
  constructor(props) {
    super(props)
  } 
  render() {
    const txs = this.props.txs
    const length = txs.length
    let items = txs
      .slice(length - 20, length - 1)
      .map(tx => {
        return tx.out.filter(xput => xput.o1 === 'OP_RETURN').map(xput => { 
          xput.h = tx.tx.h
          return xput
        })
      }) 
      items = items.flat().map(xput => {
        const app = getAppName(xput.s2)
        if (app === 'other') {
          console.log('### app not detected', xput.s2)
        }
        return ({
          s: xput.s2,
          h: xput.h,
          a: app,
        })
      })
      .map((tx, i) => {
        const color = i % 2  === 0 ? '#dddddd' : 'white'
        return (
          <tr 
            style={{ backgroundColor: color }}
            >
            <td style={styles.cell}>{ Date.now() }</td> 
            <td style={styles.cell}>{ tx.h }</td>
            <td style={styles.cell}>{ tx.s }</td>
            <td style={styles.cell}>{ tx.a }</td>
          </tr>
        )
      }) 
    return (
      <div style={styles.container}>
        <button 
          style={styles.button}
          onClick={this.props.toggle}
        >
          {(this.props.stopped ? 'start' : 'stop' ).toUpperCase()}
        </button>
        <table>
          <thead>
            <tr>
              <td>time</td>
              <td>hash</td>
              <td>id</td>
              <td>name</td>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table> 
      </div>

    )
  }
}
const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  cell: {
    padding: 5,
  }, 
  button: {
    width: '150',
    height: '40px',
    margin: 5,
  }
}