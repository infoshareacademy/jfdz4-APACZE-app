import React from 'react'
import moment from 'moment'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startBusStopId: 313, //Wrzeszcz PKP
      endBusStopId: 31213, //Srebrzysko
      date: "2017-07-02",
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
    fetch(
      `${process.env.PUBLIC_URL}/data/stopTimes${this.state.startBusStopId}.json`
    ).then(
      response => response.json().then(
        stopTimes => this.setState ({
          stopTimes: stopTimes
        })
      )
    )
  }

  handleSearchResults = () => {
    const stopTimes = this.state.stopTimes
    const chosenRoute = this.state.chosenRoute
    const route = stopTimes[chosenRoute]
    const time = moment(this.state.time)
    const result = []
    for (let i = 0; i < route.length-1; i++) {
      const departure = moment(route.departure)
      if (departure.isSameOrAfter(time)) {
        result.push(route)
        return result
      }
    }
    this.setState({
      searchResults: result
    })
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