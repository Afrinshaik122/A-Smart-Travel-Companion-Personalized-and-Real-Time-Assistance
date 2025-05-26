import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import {
  Alert,
  Col,
  Container,
  Row,
  Card,
  ListGroup,
  Form,
  FloatingLabel,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded
import "bootstrap-icons/font/bootstrap-icons.css";
import image from "../assets/images/new/contact-us.png";
import emailjs from "emailjs-com";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us";
    window.scrollTo(0, 0);
  }, []);

  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = async (email) => {
    try {
      const response = await fetch(
        `https://emailvalidation.abstractapi.com/v1/?api_key=485db27f302d4c46997b0235ef367401&email=${email}`
      );
      const data = await response.json();
      return data.deliverability === "DELIVERABLE";
    } catch (error) {
      console.error("Email validation error:", error);
      return false;
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const isValidEmail = await validateEmail(formData.email);
    if (!isValidEmail) {
      setStatus({ type: "danger", message: "Invalid or non-existent email address." });
      return;
    }

    emailjs
      .sendForm("service_qua2yc3", "template_zsp997r", e.target, "XY-wTB8cMmwi1eJcn")
      .then(
        (result) => {
          console.log("Email sent successfully!", result.text);
          setStatus({ type: "success", message: "Message sent successfully!" });
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.log("Email failed to send:", error.text);
          setStatus({ type: "danger", message: "Failed to send message. Please try again." });
        }
      );
  };

  return (
    <>
      <Breadcrumbs title="Contact Us" pagename="Contact Us" />
      <section className="contact pt-5">
        <Container>
          <Row>
            <Col md={12}>
              <h1 className="mb-2 h1 fw-bold">Let's connect and get to know each other</h1>
              <p className="text-muted mt-1">
                We are here to assist you. Reach out to us for any queries or support.
              </p>
            </Col>
          </Row>

          <Row className="py-5">
            {/* Call Us Card */}
            <Col lg={4} md={6} className="mb-4">
              <Card className="border-0 shadow rounded-3">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-items-center my-2">
                    <div className="bg-info rounded-circle text-info shadow-sm bg-opacity-10 p-3">
                      <i className="bi bi-headset h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Call Us</Card.Title>
                  <p className="text-muted">Get in touch via phone for support.</p>
                  <Button variant="light" size="sm" href="#contact">
                    <i className="bi bi-telephone me-1"></i> +98 7651 2340
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Email Us Card */}
            <Col lg={4} md={6} className="mb-4">
              <Card className="border-0 shadow rounded-3">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-items-center my-2">
                    <div className="bg-danger rounded-circle text-danger shadow-sm bg-opacity-10 p-3">
                      <i className="bi bi-envelope h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Email Us</Card.Title>
                  <p className="text-muted">Reach us via email anytime.</p>
                  <Button variant="light" size="sm" href="#contact">
                    <i className="bi bi-envelope me-2"></i> sruthiedu19@gmail.com
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Social Media Card */}
            <Col lg={4} md={12} className="mb-4">
              <Card className="border-0 shadow rounded-3">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-items-center my-2">
                    <div className="bg-warning rounded-circle text-warning shadow-sm bg-opacity-10 p-3">
                      <i className="bi bi-globe h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Follow Us</Card.Title>
                  <p className="text-muted">Stay connected via social media.</p>
                  <ListGroup horizontal className="justify-content-center">
                    <ListGroup.Item className="border-0">
                      <a href='https://youtube.com/@nomadicindian?si=-zm2cHu_nPYLKEoC' style={{ color: "black", textDecoration: "none" }}><i className="bi bi-youtube h4"></i></a>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0">
                      <a href="https://www.instagram.com/nomadic.indian?igsh=MWwwdGF0d2p2amVucA==" style={{ color: "black", textDecoration: "none" }}><i className="bi bi-instagram h4"></i></a>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0">
                      <a href='https://x.com/nomadic_1ndian' style={{ color: "black", textDecoration: "none" }}><i className="bi bi-twitter h4"></i></a>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0">
                      <a href='https://www.facebook.com/Nomadic.1ndian?mibextid=rS40aB7S9Ucbxw6v' style={{ color: "black", textDecoration: "none" }}><i className="bi bi-facebook h4"></i></a>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Contact Form */}
          <Row className="py-5 justify-content-center align-items-center" id="contact">
            <Col xl={6} lg={6} md={6} className="d-none d-md-block text-center">
              <img src={image} alt="Contact Us" className="img-fluid rounded-3 shadow-sm" style={{ maxWidth: "100%", height: "auto" }} />
            </Col>
            <Col xl={6} lg={6} md={8} sm={10} xs={12}>
              <Card className="bg-light p-4 border-0 shadow-sm w-100">
                <h3 className="fw-bold mb-4 text-center">Send us a message</h3>
                {status && <Alert variant={status.type}>{status.message}</Alert>}
                <Form onSubmit={sendEmail} className="w-100">
                  <Row className="g-3">
                    <Col md={6}>
                      <FloatingLabel controlId="name" label="Full Name">
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md={6}>
                      <FloatingLabel controlId="email" label="Email address">
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md={12}>
                      <FloatingLabel controlId="message" label="Message">
                        <Form.Control
                          as="textarea"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Message"
                          style={{ height: "150px" }}
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <div className="text-center mt-3">
                    <Button variant="primary" type="submit" className="mt-3">
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;