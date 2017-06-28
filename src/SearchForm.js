import React from 'react'
import {
  FormGroup,
  FormControl,
  Col,
  Button,
  ButtonToolbar,
  InputGroup,
  Radio,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const styles = {
  base: {},
  hidden: {
    display: 'none'
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStartBusStopList: false,
      showEndBusStopList: false,
      busStops: null,
      startBusStopId: '',
      startBusStopName: '',
      startBusStopLatitude: '',
      startBusStopLongtitude: '',
      endBusStopId: '',
      endBusStopName: '',
      endBusStopLatitude: '',
      endBusStopLongtitude: '',
      date: moment(),
      time: "2017-07-02T12:40:00",
      startEnd: '',
      connections: [],
      chosenRoute: [],
      stopTimes: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      date: date
    });
  }

  componentWillMount() {
    fetch(
      `${process.env.PUBLIC_URL}/data/stops.json`
    ).then(
      response => response.json().then(
        busStops => this.setState ({
          busStops: busStops["stops"]
        })
      )
    )
    fetch(
      `${process.env.PUBLIC_URL}/data/stopTimes.json`
    ).then(
      response => response.json().then(
        stopTimes => this.setState ({
          stopTimes: stopTimes
        })
      )
    )
  }

  handleStopsInTrips = () => {
    const start = this.state.startBusStopId
    const end = this.state.endBusStopId
    fetch(
      `${process.env.PUBLIC_URL}/data/stopsWithRoutes.json`
    ).then(
      response => response.json().then(
        stopsWithRoutes => this.setState ({
          stopsInTripsStart: stopsWithRoutes[start]
        })
      )
    );
    fetch(
      `${process.env.PUBLIC_URL}/data/stopsWithRoutes.json`
    ).then(
      response => response.json().then(
        stopsWithRoutes => this.setState ({
          stopsInTripsEnd: stopsWithRoutes[end]
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

  handleSearchResults = () => {
    const stopTimes = this.state.stopTimes
    const chosenRoute = this.state.chosenRoute
    const route = stopTimes[chosenRoute]
    const time = this.state.time
    const result = []
    for (let i = 0; i < route.length; i++) {
      const departure = route[i].departure
      if (moment(departure).isSameOrAfter(time)) {
        result.push(route[i])
      }
    }
    this.setState({
      searchResults: result
    })
  }

  render() {
    return (
      <div>
        <Col xsOffset={4} xs={4}>
          <form>
            <FormGroup >
              <InputGroup>
                <InputGroup.Addon>A</InputGroup.Addon>
                <FormControl
                  type="text"
                  placeholder="Przystanek początkowy"
                  value={this.state.startBusStopName}
                  onChange={event =>
                    this.setState({
                      startBusStopName: event.target.value,
                      showStartBusStopList: true
                    })
                  }
                />
              </InputGroup>
              <ListGroup
                style={
                  this.state.showStartBusStopList === false ?
                    styles.hidden :
                    styles.base
                }
              >
                {
                  this.state.busStops === null ?
                    'No bus stops' :
                    this.state.busStops.filter(
                      busStop => this.state.startBusStopName === '' ? false :
                        (
                          busStop.stopDesc.toLowerCase().includes(
                            this.state.startBusStopName.toLowerCase()
                          )
                        )
                    ).map(
                      busStop => (
                        <ListGroupItem
                          key={busStop.stopId}
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              startBusStopId: busStop.stopId,
                              startBusStopName: busStop.stopDesc,
                              showStartBusStopList: false
                            })
                          }
                          }
                        >
                          {busStop.stopDesc}
                        </ListGroupItem>
                      )
                    )
                }
              </ListGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>B</InputGroup.Addon>
                <FormControl
                  type="text"
                  placeholder="Przystanek końcowy"
                  value={this.state.endBusStopName}
                  onChange={event =>
                    this.setState({
                      endBusStopName: event.target.value,
                      showEndBusStopList: true
                    })
                  }
                />
              </InputGroup>
              <ListGroup
                style={
                  this.state.showEndBusStopList === false ?
                    styles.hidden :
                    styles.base
                }
              >
                {
                  this.state.busStops === null ?
                    'No bus stops' :
                    this.state.busStops.filter(
                      busStop => this.state.endBusStopName === '' ? false :
                        (
                          busStop.stopDesc.toLowerCase().includes(
                            this.state.endBusStopName.toLowerCase()
                          )
                        )
                    ).map(
                      busStop => (
                        <ListGroupItem
                          key={busStop.stopId}
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              endBusStopId: busStop.stopId,
                              endBusStopName: busStop.stopDesc,
                              showEndBusStopList: false
                            })
                          }
                          }
                        >
                          {busStop.stopDesc}
                        </ListGroupItem>
                      )
                    )
                }
              </ListGroup>
            </FormGroup>
          </form>
          <p>Data</p>
          <DatePicker
            locale="pl-pl"
            selected={this.state.date}
            onChange={this.handleChange}
          />
          <p>Godzina</p>
          <ButtonToolbar>
            <Button onClick={() => {
              this.setState({
                ...this.state,
                date: this.state.date.add(1, "h")
              })
            }}>
              HH &uarr;
            </Button>
            <Button onClick={() => {
              this.setState({
                ...this.state,
                date: this.state.date.add(1, "m")
              })
            }}>
              mm &uarr;
            </Button>
          </ButtonToolbar>
          <p>{this.state.date.format("HH:mm")}</p>
          <ButtonToolbar>
            <Button onClick={() => {
              this.setState({
                ...this.state,
                date: this.state.date.add(-1, "h")
              })
            }}>
              HH &darr;
            </Button>
            <Button onClick={() => {
              this.setState({
                ...this.state,
                date: this.state.date.add(-1, "m")
              })
            }}>
              mm &darr;
            </Button>
          </ButtonToolbar>
          <FormGroup>
            <Radio name="radioGroup"
                   inline
                   onClick={ this.state.startEnd === 0 ?
                     false :
                     () => {
                       this.setState({
                         ...this.state,
                         startEnd: 0
                       })
                     }
                   }
            >
              Odjazd
            </Radio>
            {' '}
            <Radio name="radioGroup"
                   inline
                   onClick={ this.state.startEnd === 1 ?
                     false :
                     () => {
                       this.setState({
                         ...this.state,
                         startEnd: 1
                       })
                     }
                   }
            >
              Przyjazd
            </Radio>
          </FormGroup>
          <Button
            type="submit"
            onClick={this.handleStopsInTrips}
          >
            1
          </Button>
          <Button
            type="submit"
            onClick={this.checkConnection}
          >
            2
          </Button>
          <Button
            type="submit"
            onClick={this.handleSearchResults}
          >
            4
          </Button>
          <ListGroup
            style={
              this.state.connections === false ?
                styles.hidden :
                styles.base
            }
          >
            {
              this.state.connections === null ?
              'No bus stops' : this.state.connections.map((number, index) => (
                    <ListGroupItem
                      key={index}
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          chosenRoute: number.routeId
                        })
                      }
                      }
                    >
                      {number.routeId}
                    </ListGroupItem>
                  )
                )
            }
          </ListGroup>
        </Col>
      </div>
    )
  }
}

export default SearchForm