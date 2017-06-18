import React from 'react'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startBusStopId: 313,
      endBusStopId: 102,
      date: "2017-06-23",
      time: "04:50:00",
      start: [{
        "routeId": 110,
        "tripId": 31,
        "stopId": 313,
        "stopSequence": 0,
        "agencyId": 1,
        "topologyVersionId": 371,
        "tripActivationDate": "2017-04-21",
        "stopActivationDate": "2017-06-13"
      }],
      end: [{
        "routeId":110,
        "tripId":31,
        "stopId":102,
        "stopSequence":16,
        "agencyId":1,
        "topologyVersionId":371,
        "tripActivationDate":"2017-04-21",
        "stopActivationDate":"2017-06-13"
      }],
      stopTimes: [
        {
          "routeId" : 110,
          "tripId" : 62,
          "agencyId" : 1,
          "topologyVersionId" : 371,
          "arrivalTime" : "1899-12-30T04:50:00",
          "departureTime" : "1899-12-30T04:50:00",
          "stopId" : 313,
          "stopSequence" : 1,
          "stopHeadsign" : "",
          "date" : "2017-06-19",
          "pickupType" : null,
          "dropOffType" : null,
          "shapeDistTraveled" : null,
          "timepoint" : null,
          "variantId" : 123664,
          "noteSymbol" : "",
          "noteDescription" : "",
          "busServiceName" : "110-02",
          "order" : 0,
          "nonpassenger" : 0,
          "ticketZoneBorder" : 0,
          "onDemand" : 0,
          "virtual" : 0,
          "islupek" : 903,
          "wheelchairAccessible" : 1,
          "stopShortName" : "313"
        }, {
          "routeId" : 110,
          "tripId" : 31,
          "agencyId" : 1,
          "topologyVersionId" : 371,
          "arrivalTime" : "1899-12-30T04:52:00",
          "departureTime" : "1899-12-30T04:52:00",
          "stopId" : 313,
          "stopSequence" : 0,
          "stopHeadsign" : "",
          "date" : "2017-06-19",
          "pickupType" : null,
          "dropOffType" : null,
          "shapeDistTraveled" : null,
          "timepoint" : null,
          "variantId" : 123616,
          "noteSymbol" : "b",
          "noteDescription" : "Nie kursuje przez: Mjr Słabego",
          "busServiceName" : "110-02",
          "order" : 1,
          "nonpassenger" : 1,
          "ticketZoneBorder" : 0,
          "onDemand" : 0,
          "virtual" : 0,
          "islupek" : 903,
          "wheelchairAccessible" : null,
          "stopShortName" : "313"
        }, {
          "routeId" : 110,
          "tripId" : 31,
          "agencyId" : 1,
          "topologyVersionId" : 371,
          "arrivalTime" : "1899-12-30T04:52:00",
          "departureTime" : "1899-12-30T04:52:00",
          "stopId" : 114,
          "stopSequence" : 1,
          "stopHeadsign" : "",
          "date" : "2017-06-19",
          "pickupType" : null,
          "dropOffType" : null,
          "shapeDistTraveled" : null,
          "timepoint" : null,
          "variantId" : 123616,
          "noteSymbol" : "b",
          "noteDescription" : "Nie kursuje przez: Mjr Słabego",
          "busServiceName" : "110-02",
          "order" : 1,
          "nonpassenger" : 0,
          "ticketZoneBorder" : 0,
          "onDemand" : 0,
          "virtual" : 0,
          "islupek" : 905,
          "wheelchairAccessible" : null,
          "stopShortName" : "114"
        }
      ]
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
    const a = this.state.start
    const b = this.state.end
    const connection = []
    for (var i = 0; i < a.length; i++) {
      for (var j = 0; j < b.length; j++) {
        if (a[i].routeId === b[j].routeId
        && a[i].tripId === b[j].tripId
        && a[i].agencyId === b[j].agencyId) {
          connection.push(
            {
              "routeId":a[i].routeId,
              "tripId":a[i].tripId,
              "startStopId":a[i].stopId,
              "endStopId":b[j].stopId,
              "agencyId":a[i].agencyId
            }
          )
          console.log(connection);
          return connection
        }
      }
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
      </div>
    )
  }
}

export default SearchForm