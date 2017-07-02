import React from 'react'
import {
  FormGroup,
  FormControl,
  Col,
  Button,
  InputGroup,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap'
import moment from 'moment'
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps'

import './SearchForm.css'

const styles = {
  base: {},
  hidden: {
    display: 'none'
  }
}

const google = window.google;

const DirectionsExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 54.403182, lng: 18.570063 }}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

const initialState = {
  showStartBusStopList: false,
  showEndBusStopList: false,
  showConnections: false,
  showTrips: false,
  showTripDetails: false,
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
  startEnd: '',
  connections: [],
  chosenRoute: [],
  stopTimes: [],
  searchResults: [],
  chosenTripDetails: [],
  origin: null,
  destination: null,
  directions: null
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStartBusStopList: false,
      showEndBusStopList: false,
      showConnections: false,
      showTrips: false,
      showTripDetails: false,
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
      startEnd: '',
      connections: [],
      chosenRoute: [],
      stopTimes: [],
      searchResults: [],
      chosenTripDetails: [],
      origin: null,
      destination: null,
      directions: null
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

  setMap() {
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
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
        }, this.checkConnection)
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
      this.setState({
        ...this.state,
        connections: connections,
        showConnections: true
      })
    }
  }

  handleSearchResults = () => {
    const stopTimes = this.state.stopTimes
    const chosenRoute = this.state.chosenRoute
    const route = stopTimes[chosenRoute]
    const time = this.state.date
    const result = []
    for (let i = 0; i < route.length; i++) {
      const departure = route[i].departure
      if (moment(departure).isSameOrAfter(time)) {
        result.push(route[i])
      }
    }
    this.setState({
      ...this.state,
      searchResults: result,
      showTrips: true
    })
  }

  render() {
    return (
      <div>
        <Col xs={3}>
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
                              showStartBusStopList: false,
                              startBusStopLatitude: busStop.stopLat,
                              startBusStopLongtitude: busStop.stopLon
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
                              showEndBusStopList: false,
                              endBusStopLatitude: busStop.stopLat,
                              endBusStopLongtitude: busStop.stopLon
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
          <p className="date">
            <input type="image" src="\img\iconmonstr-arrow-26-32-left.png" alt="Left"
                   onClick={() => {
                     this.setState({
                       ...this.state,
                       date: this.state.date.add(-1, "d")
                     })
                   }}/>
            {this.state.date.format("DD-MM-YYYY")}
            <input type="image" src="\img\iconmonstr-arrow-26-32-right.png" alt="Right"
                   onClick={() => {
                     this.setState({
                       ...this.state,
                       date: this.state.date.add(1, "d")
                     })
                   }}/>
          </p>
          <div className="time">
            <div>
              <input type="image" src="\img\iconmonstr-arrow-26-32-up.png" alt="Up"
                     onClick={() => {
                       this.setState({
                         ...this.state,
                         date: this.state.date.add(-1, "h")
                       })
                     }}/>
              <br/>
              <input type="image" src="\img\iconmonstr-arrow-26-32-down.png" alt="Down"
                     onClick={() => {
                       this.setState({
                         ...this.state,
                         date: this.state.date.add(1, "h")
                       })
                     }}/>
            </div>
            <div>
              <p>{this.state.date.format("HH:mm")}</p>
            </div>
            <div>
              <input type="image" src="\img\iconmonstr-arrow-26-32-up.png" alt="Up"
                     onClick={() => {
                       this.setState({
                         ...this.state,
                         date: this.state.date.add(-1, "m")
                       })
                     }}/>
              <br/>
              <input type="image" src="\img\iconmonstr-arrow-26-32-down.png" alt="Down"
                     onClick={() => {
                       this.setState({
                         ...this.state,
                         date: this.state.date.add(1, "m")
                       })
                     }}/>
            </div>
          </div>
          <Button
            type="submit"
            onClick={this.handleStopsInTrips}
          >
            Szukaj połączenia
          </Button>
          <Button
            type="submit"
            onClick={() => {
            this.setState(initialState)
            }}
          >
            Wyczyść
          </Button>
          <ListGroup
            style={
              this.state.showConnections === false ?
                styles.hidden :
                styles.base
            }
          >
            {
              this.state.connections === null ?
              'No bus stops' : this.state.connections.map((connection, index) => (
                    <ListGroupItem
                      key={index}
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          chosenRoute: connection.routeId,
                          showConnections: false
                        }, this.handleSearchResults)
                      }
                      }
                    >
                      {connection.routeId}
                    </ListGroupItem>
                  )
                )
            }
          </ListGroup>
          <ListGroup
            style={
              this.state.showTrips === false ?
                styles.hidden :
                styles.base
            }
          >
            {
              this.state.searchResults === null ?
              'No bus stops' : this.state.searchResults.map((route, index) => (
                    <ListGroupItem
                      key={index}
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          showTripDetails: true,
                          chosenTripDetails: route.nextStops,
                          origin: new google.maps.LatLng(this.state.startBusStopLatitude, this.state.startBusStopLongtitude),
                          destination: new google.maps.LatLng(this.state.endBusStopLatitude, this.state.endBusStopLongtitude)
                        }, this.setMap)
                      }}
                    >
                      {this.state.chosenRoute + " " + moment(route.departure).format("HH:mm")}

                    </ListGroupItem>
                  )
                )
            }
          </ListGroup>
        </Col>
        <Col xs={9}>
          <DirectionsExampleGoogleMap
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100vh` }} />
            }
            center={this.state.origin}
            directions={this.state.directions}
          />
        </Col>
      </div>
    )
  }
}

export default SearchForm