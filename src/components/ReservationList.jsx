// il componente ReservationList si occuperà di creare una lista
// di prenotazioni sulla base del contenuto attuale del DB
// all'avvio quindi dovrà fare una chiamata GET all'endpoint
// 'https://striveschool-api.herokuapp.com/api/reservation'
// e mostrare all'utente tutte le prenotazioni esistenti.

// -- FLOW DELLE OPERAZIONI IN QUESTO COMPONENTE --
// 1) lo stato iniziale del componente viene messo in memoria
// 2) viene invocato per la prima volta il metodo render(): si occuperà
// di "disegnare" l'interfaccia per la prima volta, con il titolo, le row,
// le col e la ListGroup vuota
// 3) viene invocato il metodo componentDidMount, un metodo creato apposta per
// eseguire operazioni lunghe/asincrone SENZA bloccare il caricamento iniziale,
// perchè è istruito a lanciarsi automaticamente solo DOPO il PRIMO render()
// 4) viene quindi lanciata getReservations() dentro componentDidMount(): viene
// eseguita la fetch, vengono recuperate le prenotazioni, e vengono salvate
// nello STATO del componente
// 5) poichè c'è stato un setState nella getReservations(), il metodo render()
// del nostro componente viene AUTOMATICAMENTE ri-eseguito
// 6) questa seconda invocazione di render() verifica quali cambiamenti apportare
// alla pagina: React NON rimetterà nel DOM i nodi identici a prima (perchè
// è efficientissimo) ma... arrivati alla ListGroup si accorgerà che l'array
// this.state.reservations è DIVERSO da prima (ci sono ora degli elementi!):
// disegnerà questi elementi nella lista, e finirà il secondo render().

import { Component } from 'react'
import { Container, Row, Col, ListGroup } from 'react-bootstrap'

// ogni componente React potrà decidere in autonomia di effettuare operazioni
// al suo AVVIO

class ReservationList extends Component {
  state = {
    reservations: [],
    // se io trovassi il modo di recuperare le prenotazioni e inserirle in questo array...
    // ... React riempirebbe la ListGroup automaticamente!
  }

  // creo la funzione per la chiamata GET
  getReservations = () => {
    // questa è una semplice funzione che si occuperà di recuperare le prenotazioni
    // a DB e salvarle nello stato del componente
    fetch('https://striveschool-api.herokuapp.com/api/reservation')
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('errore nel recupero prenotazioni')
        }
      })
      .then((arrayOfReservations) => {
        console.log('RECUPERO I DATI DELLE PRENOTAZIONI')
        console.log(arrayOfReservations)
        console.log('E ORA SETTO LO STATO')
        this.setState({
          reservations: arrayOfReservations, // sostituisco nello state l'array
          // di prenotazioni recuperato dalle API
        })
      })
      .catch((err) => {
        console.log('ERRORE', err)
      })
  }

  // nuovo superpotere dei componenti a classe: il metodo componentDidMount()

  componentDidMount() {
    console.log('IO SONO COMPONENTDIDMOUNT')
    // componentDidMount è un metodo che potete inserire se volete in OGNI
    // componente a classe e si comporta così:
    // a) viene eseguito UNA SOLA VOLTA per l'intero ciclo-vita (lifecycle) del componente
    // b) viene eseguito DOPO il primo render()
    this.getReservations()
    // componentDidMount è il posto PERFETTO per tutte quelle operazioni lunghe,
    // scomode e/o asincrone che condizionano il primo montaggio del componente

    // quindi la nostra fetch viene eseguita UNA VOLTA SOLA, subito dopo il disegno
    // delle parti statiche del componente, senza bloccarne il caricamento!
  }

  render() {
    console.log('INVOCATO RENDER')
    // this.getReservations()
    // non posso invocare questa funzione nel metodo render! come mai?
    // -----
    // perchè OGNI VOLTA che effettuiamo un setState, il metodo render()
    // viene re-invocato automaticamente!
    // -----
    // detta in altro modo:
    // -> un componente React re-invoca il metodo render() ogni volta
    // che cambia il suo stato o riceve NUOVE props.

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
              {this.state.reservations.map((prenotazione) => {
                return (
                  <ListGroup.Item key={prenotazione._id}>
                    {prenotazione.name} per {prenotazione.numberOfPeople} alle{' '}
                    {prenotazione.dateTime}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationList
