import React from 'react'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startBusStopId: 313,
      endBusStopId: 1631,
      date: "2017-06-26",
      time: "12:40:00",
      stopsInTripsStart: [],
      stopsInTripsEnd: [],
      connections: [],
      stopTimes: [],
      searchResults: []
    }
  }

  handleStopsInTrips = () =>{
    const date = this.state.date
    const start = this.state.startBusStopId
    const end = this.state.endBusStopId
    fetch(
      `https://crossorigin.me/http://89.71.187.219:22856/restApi/api/${date}/${start}`
    ).then(
      response => response.json().then(
        stopsInTripsStart => this.setState ({
          stopsInTripsStart: stopsInTripsStart
        })
      )
    );
    fetch(
      `https://crossorigin.me/http://89.71.187.219:22856/restApi/api/${date}/${end}`
    ).then(
      response => response.json().then(
        stopsInTripsEnd => this.setState ({
          stopsInTripsEnd: stopsInTripsEnd
        })
      )
    )
  }

  checkConnection = () => {
    const a = this.state.stopsInTripsStart
    const b = this.state.stopsInTripsEnd
    const connections = []
    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < b.length; j++) {
        if (a[i].routeId === b[j].routeId
        && a[i].tripId === b[j].tripId
        && a[i].agencyId === b[j].agencyId) {
          connections.push(
            {
              "routeId":a[i].routeId,
              "tripId":a[i].tripId,
              "startStopId":a[i].stopId,
              "endStopId":b[j].stopId,
              "agencyId":a[i].agencyId
            }
          )
        }
      }
      this.setState({connections: connections})
    }
  }

  handleStopTimes = () => {
    const a = this.state.connections
    const stopTimes = []
    for (var i = 0; i < a.length; i++) {
      fetch(
        'https://crossorigin.me/http://87.98.237.99:88/stopTimes?date=' + this.state.date + '&routeId=' + a[i].routeId
      ).then(
        response => response.json().then(
          stopTimes => this.setState ({
            stopTimes: this.state.stopTimes.concat(stopTimes.stopTimes)
          })
        )
      )
    }
  }

  handleSearchResults = () => {
    const a = this.state.connections
    const b = this.state.stopTimes
    const oneLine = []
    const allLines =[]
    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < b.length; j++) {
        if ((a[i].startStopId === b[j].stopId
          && a[i].tripId === b[j].tripId) ||
          (a[i].endStopId === b[j].stopId
          && a[i].tripId === b[j].tripId)) {
          oneLine.push(
            {
              "tripId":b[j].tripId,
              "stopId":b[j].stopId
            }
          )
        }
      }
      allLines.push(oneLine)
      this.setState({
        searchResults: this.state.searchResults.concat(allLines)
      })
    }
  }

  render() {
    return (
      <div>
        <p>hello</p>
        <button
          onClick={this.handleStopsInTrips}
        >
          stops in trips
        </button>
        <button
          onClick={this.checkConnection}
        >
          check connection
        </button>
        <button
          onClick={this.handleStopTimes}
        >
          handle stop times
        </button>
        <button
          onClick={this.handleSearchResults}
        >
          handleSearchResults
        </button>
      </div>
    )
  }
}

export default SearchForm