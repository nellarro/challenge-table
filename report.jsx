var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')
const dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'}
];

let reduce = (row, acc) => {
  if (row.type === 'load') {
    acc.loads = (acc.loads || 0) + 1
  }
  if (row.type === 'impression') {
    acc.impressions = (acc.impressions || 0) + 1
  }
  if (row.type === 'display') {
    acc.display = (acc.display || 0) + 1
  }
   return acc
}

let loadRate = acc => {
  return `${((acc.loads / acc.impressions) * 100).toFixed(1)}%`
}

let displayRate = acc => {
  return `${((acc.display / acc.loads) * 100).toFixed(1)}%`
}

let calculations = [
  {value: 'impressions', title: 'Impressions'},
  {value: 'loads', title: 'Loads'},
  {value: 'display', title: 'Displays'},
  {value: loadRate , title: 'Load Rate'},
  {value: displayRate, title: 'Display Rate'}
] 

module.exports = createReactClass({


  render () {
    return (
      <main>
        <ReactPivot 
          rows={rows} 
          dimensions={dimensions} 
          reduce={reduce} 
          calculations={calculations}
          activeDimensions={['Date']} />
      </main>
  )}
})
