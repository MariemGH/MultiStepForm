import React from "react";
import { Container, Row, Button, ButtonGroup } from "reactstrap";

const Step = props => {
  const { currentIndex, activeIndex, name, handlePrevious } = props;
  const color = activeIndex === currentIndex ? "primary" : "secondary";

  const handleStepClick = () => {
    return activeIndex > currentIndex ? handlePrevious(currentIndex) : {};
  };

  return (
    <Button onClick={handleStepClick} color={color}>
      {name}
    </Button>
  );
};

const StepsBar = props => {
  const { stepsNames, activeIndex, handlePrevious } = props;
  return (
    <Container>
      <Row className="align-items-center justify-content-around">
        <ButtonGroup>
          {stepsNames.map((name, index) => {
            return (
              <Step
                key={name}
                name={name}
                currentIndex={index}
                activeIndex={activeIndex}
                handlePrevious={handlePrevious}
              />
            );
          })}
        </ButtonGroup>
      </Row>
      <hr className="mt-1" />
    </Container>
  );
};

export default StepsBar;
