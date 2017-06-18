import React from 'react'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startBusStopId: 313,
      endBusStopId: 102,
      date: "2017-06-23",
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
      stop: [{
        "routeId":110,
        "tripId":31,
        "stopId":102,
        "stopSequence":16,
        "agencyId":1,
        "topologyVersionId":371,
        "tripActivationDate":"2017-04-21",
        "stopActivationDate":"2017-06-13"
      }]
    }
  }

  render() {
    return (
      <div>
        <p>hello</p>
      </div>
    )
  }
}

export default SearchForm