// il componente ReservationList si occuperà di creare una lista
// di prenotazioni sulla base del contenuto attuale del DB
// all'avvio quindi dovrà fare una chiamata GET all'endpoint
// 'https://striveschool-api.herokuapp.com/api/reservation'
// e mostrare all'utente tutte le prenotazioni esistenti.

import { Component } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

// ogni componente React potrà decidere in autonomia di effettuare operazioni
// al suo AVVIO

class ReservationList extends Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={8} lg={6}>
            <h2 className="text-center">Prenotazioni a DB</h2>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={6}>
            <ListGroup>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationList
