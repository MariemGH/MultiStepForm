import React from "react";
import { Row, Col, Button, Container } from "reactstrap";
import { reduce } from "lodash";
import PropTypes from "prop-types";
import hash from "object-hash";
import StepsBar from "./StepsBar";

export default class MultiForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      totalForms: props.children.length,
      formsValuesHash: "",
      formsValues: {}
    };
    this.activeRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.formsValues) {
      const formsValuesHash = hash(props.formsValues);
      if (state.formsValuesHash !== formsValuesHash) {
        return {
          formsValuesHash,
          formsValues: props.formsValues
        };
      }
    }
    return null;
  }

  indexIsLast = () => {
    const { activeIndex, totalForms } = this.state;
    return activeIndex + 1 === totalForms;
  };

  indexIsFirst = () => {
    return this.state.activeIndex === 0;
  };

  handlePrevious = selectedIndex => {
    this.setState({
      activeIndex: selectedIndex
    });
  };

  renderPreviousNext = () => {
    const last = this.indexIsLast();
    const first = this.indexIsFirst();

    return (
      <Row>
        <Col>
          {!first && (
            <Button
              className={`float-left shadow`}
              onClick={() => this.handlePrevious(this.state.activeIndex - 1)}
            >
              Previous
            </Button>
          )}

          <Button
            className={`float-right shadow`}
            onClick={() => this.handleNext()}
          >
            {last ? "Submit" : "Next"}
          </Button>
        </Col>
      </Row>
    );
  };

  updateState = values => {
    let { activeIndex, formsValues } = this.state;
    formsValues[activeIndex] = values;
    this.activeRef = React.createRef();
    if (!this.indexIsLast()) {
      this.setState({
        formsValues,
        activeIndex: activeIndex + 1
      });
    } else {
      const flatFormsValues = this.flattenFormsValues(formsValues);
      this.props.onSubmit(flatFormsValues);
      this.resetMultiForm();
    }
  };

  handleNext = () => {
    this.activeRef.current.handleSubmit(this.updateState);
  };

  flattenFormsValues = formsValues => {
    return reduce(
      formsValues,
      (result, value) => {
        return Object.assign(result, value);
      },
      {}
    );
  };

  getPreviousFormValue = key => {
    const flatFormsValues = this.flattenFormsValues(this.state.formsValues);
    return flatFormsValues[key];
  };

  resetMultiForm = () => {
    this.setState({ activeIndex: 0, formsValues: {} });
  };

  renderActiveForm = () => {
    const { activeIndex, formsValues } = this.state;
    return React.cloneElement(this.props.children[activeIndex], {
      values: formsValues[activeIndex],
      getPreviousFormValue: this.getPreviousFormValue,
      ref: this.activeRef,
      key: activeIndex
    });
  };

  render() {
    return (
      <Container>
        <StepsBar
          handlePrevious={this.handlePrevious}
          stepsNames={this.props.stepsNames}
          activeIndex={this.state.activeIndex}
        />
        <Row
          style={{
            marginTop: `10px`
          }}
        >
          <Col>{this.renderActiveForm()}</Col>
        </Row>
        <Row>
          <Col>{this.renderPreviousNext()}</Col>
        </Row>
      </Container>
    );
  }
}

MultiForms.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
  stepsNames: PropTypes.array
};
