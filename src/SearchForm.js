import React from 'react'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startBusStopId: 313, //Wrzeszcz PKP
      endBusStopId: 31213, //Srebrzysko
      date: "2017-06-27",
      time: "12:40:00",
      stopsInTripsStart: [110,116,124,126,136,149,157,158],
      stopsInTripsEnd: [110,122,126,157,227],
      connections: [],
      chosenRoute: [110],
      stopTimes: [],
      searchResults: []
    }
  }

  // handleStopsInTrips = () =>{
  //   const start = this.state.startBusStopId
  //   const end = this.state.endBusStopId
  //   fetch(
  //     `${process.env.PUBLIC_URL}/data/stopsInTrip.json`
  //   ).then(
  //     response => response.json().then(
  //       stopsInTripsStart => this.setState ({
  //         stopsInTripsStart: stopsInTripsStart
  //       })
  //     )
  //   );
  //   fetch(
  //     `${process.env.PUBLIC_URL}/data/stopsInTrip.json`
  //   ).then(
  //     response => response.json().then(
  //       stopsInTripsEnd => this.setState ({
  //         stopsInTripsEnd: stopsInTripsEnd
  //       })
  //     )
  //   )
  // }

  checkConnection = () => {
    const a = this.state.stopsInTripsStart
    const b = this.state.stopsInTripsEnd
    const connections = []
    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < b.length; j++) {
        if (a[i] === b[j]) {
          connections.push(
            {
              "routeId":a[i]
            }
          )
        }
      }
      this.setState({connections: connections})
    }
  }

  handleStopTimes = () => {
    const date = this.state.date
    const route = this.state.chosenRoute[0]
    fetch(
      `https://crossorigin.me/http://87.98.237.99:88/stopTimes?date=${date}&routeId=${route}`
    ).then(
      response => response.json().then(
        stopTimes => this.setState ({
          stopTimes: stopTimes.stopTimes
        })
      )
    )
  }

  handleSearchResults = () => {
    const a = this.state.connections
    const b = this.state.stopTimes
    const oneLine = []
    const allLines =[]
    for (var i = 0; i < b.length; i++) {
      for (var j = 0; j < a.length; j++) {
        if ((b[i].stopId === this.state.startBusStopId
          && b[i].routeId === a[j].routeId) ||
          (b[i].stopId === this.state.endBusStopId
          && b[i].routeId === a[j].routeId)) {
          oneLine.push(
            {
              "tripId":b[i].tripId,
              "stopId":b[i].stopId,
              "sequence":b[i].stopSequence,
              "depTime":b[i].departureTime
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