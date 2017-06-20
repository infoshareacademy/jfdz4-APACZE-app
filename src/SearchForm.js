import React from 'react'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startBusStopId: 313,
      endBusStopId: 102,
      date: "2017-06-23",
      time: "04:50:00",
      stopsInTripsStart: [{
        "routeId": 110,
        "tripId": 31,
        "stopId": 313,
        "stopSequence": 0,
        "agencyId": 1,
        "topologyVersionId": 371,
        "tripActivationDate": "2017-04-21",
        "stopActivationDate": "2017-06-13"
      }],
      stopsInTripsEnd: [{
        "routeId":110,
        "tripId":31,
        "stopId":102,
        "stopSequence":16,
        "agencyId":1,
        "topologyVersionId":371,
        "tripActivationDate":"2017-04-21",
        "stopActivationDate":"2017-06-13"
      }],
      connections: [{
        agencyId: 1,
        endStopId: 102,
        routeId: 110,
        startStopId: 313,
        tripId: 31
      },{
        agencyId: 1,
        endStopId: 1309,
        routeId: 195,
        startStopId: 14557,
        tripId: 11
      }],
      stopTimes: [],
      searchResults: []
    }
  }

  componentWillMount() {
    fetch(
      ''
    ).then(
      response => response.json().then(
        busStops => this.setState ({
          busStops
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