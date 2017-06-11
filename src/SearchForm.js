import React from 'react'
import {
  FormGroup,
  FormControl,
  Col,
  Button,
  InputGroup,
  Radio
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "1990-06-05",
      format: "YYYY-MM-DD",
      mode: "date",
      busStops: null,
      busStopId: '',
      busStopName: ''
    };
  }

  handleDateChange = (newDate) => {
    console.log("newDate", newDate);
    return this.setState({date: newDate});
  }

  componentWillMount() {
    fetch(
      `${process.env.PUBLIC_URL}/data/busStops.json`
    ).then(
      response => response.json().then(
        busStops => this.setState ({
          busStops
        })
      )
    )
  }

  render() {
    var DateTimeField = require('react-bootstrap-datetimepicker');
    return (
      <div>
        <Col xsOffset={4} xs={4}>
          <form>
            <FormGroup >
              <InputGroup>
                <InputGroup.Addon>A</InputGroup.Addon>
                <FormControl type="text" placeholder="Przystanek początkowy" />
              </InputGroup>
            </FormGroup>
            <ul>
              {
                this.state.busStops === null ?
                  'No bus stops' :
                  this.state.busStops.map(
                    busStop => (
                      <li key={busStop.id}>{busStop.name}</li>
                    )
                  )
              }
            </ul>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>B</InputGroup.Addon>
                <FormControl type="text" placeholder="Przystanek końcowy" />
              </InputGroup>
            </FormGroup>
          </form>
          <p>Data</p>
          <DateTimeField
            mode="date"
            inputFormat="DD-MM-YYYY"
            onChange={this.handleDateChange}
          />
          <p>Godzina</p>
          <DateTimeField
            mode="time"
          />
          <FormGroup>
            <Radio name="radioGroup" inline>
              Odjazd
            </Radio>
            {' '}
            <Radio name="radioGroup" inline>
              Przyjazd
            </Radio>
          </FormGroup>
          <Button type="submit">
            Szukaj połączenia
          </Button>
        </Col>
        <Link to={'/'}>
          <Button type="submit">
            Powrót do logowania
          </Button>
        </Link>
      </div>
    )
  }
}

export default SearchForm