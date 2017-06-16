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
      time: '',
      startEnd: ''
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
                          busStop.name.toLowerCase().includes(
                            this.state.startBusStopName.toLowerCase()
                          )
                        )
                    ).map(
                      busStop => (
                        <ListGroupItem
                          key={busStop.id}
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              startBusStopId: busStop.id,
                              startBusStopName: busStop.name,
                              startBusStopLatitude: busStop.latitude,
                              startBusStopLongtitude: busStop.longtitude,
                              showStartBusStopList: false
                            })
                          }
                          }
                        >
                          id_{busStop.id}_
                          name_{busStop.name}_
                          latitude_{busStop.latitude}_
                          longtitude_{busStop.longtitude}_
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
                          busStop.name.toLowerCase().includes(
                            this.state.endBusStopName.toLowerCase()
                          )
                        )
                    ).map(
                      busStop => (
                        <ListGroupItem
                          key={busStop.id}
                          onClick={() => {
                            this.setState({
                              ...this.state,
                              endBusStopId: busStop.id,
                              endBusStopName: busStop.name,
                              endBusStopLatitude: busStop.latitude,
                              endBusStopLongtitude: busStop.longtitude,
                              showEndBusStopList: false
                            })
                          }
                          }
                        >
                          id_{busStop.id}_
                          name_{busStop.name}_
                          latitude_{busStop.latitude}_
                          longtitude_{busStop.longtitude}_
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