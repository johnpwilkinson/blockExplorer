import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import {ReactComponent as Block } from '../assets/block.svg'
import AccountCard from './AccountCard';
import StatCard from './Card';
import TxnTable from './TxnTable';

function ButtonsRow(props) {
  return (
   
        <Col >
            <Button variant="primary" key={props.num}>{props.value}</Button>
        </Col>
    
    )
}

export default ButtonsRow
