import React from 'react'
import {
  FormGroup,
  FormControl,
  Col,
  Button,
  InputGroup
} from 'react-bootstrap'

class SearchForm extends React.Component {
  render() {
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
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>B</InputGroup.Addon>
                <FormControl type="text" placeholder="Przystanek końcowy" />
              </InputGroup>
            </FormGroup>
          </form>
          <Button type="submit">
            Szukaj połączenia
          </Button>
        </Col>
      </div>
    )
  }
}

export default SearchForm