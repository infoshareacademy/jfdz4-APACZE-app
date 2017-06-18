import React from 'react'
import moment from 'moment'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startBusStopId: '',
      endBusStopId: '',
      date: moment(),
      startEnd: '',
      busStops: null
    };
  }

  componentWillMount() {
    fetch(
      'https://crossorigin.me/http://91.244.248.19/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/0f2de200-e78b-4183-ae0d-071d7f07fc3f/download/stopsintrips.json'
    ).then(
      response => response.json().then(
        busStops => this.setState ({
          busStops
        })
      )
    )
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