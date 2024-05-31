import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 fixed-bottom">
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center">
          <Link to="/seguimiento" className="text-white">
              Seguimiento de Pedido
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};