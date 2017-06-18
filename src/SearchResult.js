import React from 'react'
import {
    Col,
    FormGroup,
    InputGroup,
    FormControl,
    Button


} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SearchForm from './SearchForm'


class SearchResult extends React.Component {

    render() {
        const startBusStopName ='co kolwiek'
        const endBusStopName = "wojska-polskiego"
        return (
            <div>
                <Col xsOffset={4} xs={4}>
                    <form>
                        <FormGroup >
                            <InputGroup >
                                <InputGroup.Addon>A</InputGroup.Addon>
                                <FormControl type="text" value={startBusStopName} disabled/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>B</InputGroup.Addon>
                                <FormControl type="text" value={endBusStopName} disabled/>
                            </InputGroup>
                        </FormGroup>
                    </form>


                </Col>
                <Link to={'/search'}>
                    <Button type="submit">
                        Powrót do wyszukiwania
                    </Button>
                </Link>
            </div>
        )
    }
}

export default SearchResult