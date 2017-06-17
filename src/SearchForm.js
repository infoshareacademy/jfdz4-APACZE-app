import React from 'react'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      busStops: null,
    };
  }

  componentWillMount() {
    fetch(
      `${process.env.PUBLIC_URL}/data/workDaySchedule.json`
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