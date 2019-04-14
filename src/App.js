import React, { Component } from "react";

import "./App.css";

import MultiStepForm from "./components/MultiStepForm";
import SampleForm1 from "./components/SampleForm1";
import SampleForm2 from "./components/SampleForm2";

class App extends Component {
  handleSubmit = formsData => {
    alert(JSON.stringify(formsData));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <MultiStepForm
            stepsNames={["Step1", "Step2"]}
            onSubmit={this.handleSubmit}
          >
            <SampleForm1 />
            <SampleForm2 />
          </MultiStepForm>
        </header>
      </div>
    );
  }
}

export default App;
