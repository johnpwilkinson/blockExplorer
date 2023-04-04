import Card from 'react-bootstrap/Card';

function AccountCard(props) {
    let balance = props.value[0][1]
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted" key={1}>{props.value[0][0]}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted" key={2}>{props.value[0][1]}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted" key={3}>{props.value[1][0]}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted" key={4}>{props.value[1][1]}</Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted" key={5}>{props.value[2]}</Card.Subtitle> 
    </Card.Body>
  </Card>
    )
}

export default AccountCard
