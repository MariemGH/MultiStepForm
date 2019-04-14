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
        extrainfo: "",
        adrress: ""
      };
    }
    this.state = Object.assign(state, { errorAddress: "", errorExtrainfo: "" });
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
    const { extrainfo, adrress } = this.state;
    if (extrainfo.length === 0) {
      this.setState({ errorExtrainfo: "errorExtrainfo", errorAddress: "" });
    } else if (adrress.length === 0) {
      this.setState({
        errorExtrainfo: "",
        errorAddress: "errorPassword"
      });
    } else {
      return { extrainfo, adrress };
    }
  };

  render() {
    const { extrainfo, adrress, errorExtrainfo, errorAddress } = this.state;
    const username = this.props.getPreviousFormValue("username");

    return (
      <Form>
        <FormGroup row>
          <Col>
            <Input
              placeholder={`Address for ${username}`}
              type="textarea"
              name="adrress"
              value={adrress}
              invalid={errorAddress.length > 0}
              onChange={this.handleInputChange}
            />{" "}
            {errorAddress && <FormFeedback>{errorAddress}</FormFeedback>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col>
            <Input
              placeholder="Extrainfo"
              type="textarea"
              name="extrainfo"
              value={extrainfo}
              invalid={errorExtrainfo.length > 0}
              onChange={this.handleInputChange}
            />{" "}
            {errorExtrainfo && <FormFeedback>{errorExtrainfo}</FormFeedback>}
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
