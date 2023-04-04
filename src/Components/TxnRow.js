import { Col, Row } from 'react-bootstrap';

function TxnRow(props) {
    return (
        <Row>
            <Col>
                Transaction Hash
            </Col>
            <Col>
                {props.txn.transactionHash}
            </Col>
        </Row>
  );
}

export default TxnRow;
