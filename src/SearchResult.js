import React from 'react'
import {
    Col,
    ListGroup,
    ListGroupItem,
    Panel


} from 'react-bootstrap'

class SearchResult extends React.Component {
    render() {
        var przystanek_a = (

            <p>A przystanek</p>
        );
        var przystanek_b = (
                <p>B przystanek</p>
        );
        return (
            <div>
                <Col xsOffset={4} xs={4}>

                    <Panel  header={przystanek_a}>

                        <ListGroup fill>
                            <ListGroupItem>
                                <Panel  collapsible header="Panel heading">
                                Some default panel content here.
                                <ListGroup fill>
                                    <ListGroupItem>Item 1</ListGroupItem>
                                    <ListGroupItem>Item 2</ListGroupItem>
                                </ListGroup>
                            </Panel></ListGroupItem>
                            <ListGroupItem>Item 2</ListGroupItem>
                        </ListGroup>
                    </Panel>


                </Col>
            </div>
        )
    }
}

export default SearchResult