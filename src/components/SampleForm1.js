import React from "react";
import { FormFeedback, Col, Form, FormGroup, Input } from "reactstrap";

export default class SampleForm1 extends React.Component {
  constructor(props) {
    super(props);
    let state = {};
    if (typeof props.values !== "undefined") {
      state = props.values;
    } else {
      state = {
        username: "",
        email: ""
      };
    }
    this.state = Object.assign(state, { errorEmail: "", errorUsername: "" });
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = callbackFn => {
    const validatedValues = this.validateForm();
    if (validatedValues) {
      return callbackFn(validatedValues);
    }
  };

  validateForm = () => {
    const { username, email } = this.state;
    if (username.length === 0) {
      this.setState({ errorUsername: "error username", email: "" });
    } else if (email.length === 0) {
      this.setState({
        errorUsername: "",
        errorEmail: "error email"
      });
    } else {
      return { username, email };
    }
  };

  render() {
    const { username, email, errorUsername, errorEmail } = this.state;

    return (
      <Form>
        <FormGroup row>
          <Col>
            <Input
              placeholder="Username"
              type="username"
              name="username"
              value={username}
              invalid={errorUsername.length > 0}
              onChange={this.handleInputChange}
            />{" "}
            {errorUsername && <FormFeedback>{errorUsername}</FormFeedback>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              invalid={errorEmail.length > 0}
              onChange={this.handleInputChange}
            />{" "}
            {errorEmail && <FormFeedback>{errorEmail}</FormFeedback>}
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
