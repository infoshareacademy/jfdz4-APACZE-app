import React from 'react'
import {
    Col,
    ListGroup,
    ListGroupItem,
    Panel


} from 'react-bootstrap'

class SearchResult extends React.Component {
    render() {
        var przystanek_a = "kujawska"
        var przystanek_b = "wojska-polskiego"
        var header=("A "+przystanek_a+" B "+przystanek_b);
        return (
            <div>
                <Col xsOffset={4} xs={4}>

                    <Panel header={header} >

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