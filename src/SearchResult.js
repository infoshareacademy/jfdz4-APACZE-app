import React from 'react'
import {
    Col,
    FormGroup,
    InputGroup,
    FormControl


} from 'react-bootstrap'

class SearchResult extends React.Component {
    render() {
        var przystanek_a = "kujawska"
        var przystanek_b = "wojska-polskiego"
        return (
            <div>
                <Col xsOffset={4} xs={4}>
                    <form>
                        <FormGroup >
                            <InputGroup >
                                <InputGroup.Addon>A</InputGroup.Addon>
                                <FormControl type="text" value={przystanek_a} disabled/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>B</InputGroup.Addon>
                                <FormControl type="text" value={przystanek_b} disabled/>
                            </InputGroup>
                        </FormGroup>
                    </form>


                </Col>
            </div>
        )
    }
}

export default SearchResult