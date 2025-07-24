import { ListGroup } from 'react-bootstrap'

const PastaReviews = (props) => {
  return (
    <ListGroup>
      {props.pastaAttiva.comments.map((review) => {
        return (
          <ListGroup.Item key={review.id}>
            {review.rating} - {review.comment}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default PastaReviews
