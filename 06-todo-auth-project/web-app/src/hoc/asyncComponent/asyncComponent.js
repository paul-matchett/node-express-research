import React, { Component } from "react";

const asyncComponent = importComponent => {
  return class extends Component {
    state = {
      component: null
    };

    async componentDidMount() {
      try {
        const cmp = await importComponent();
        if (!cmp) {
          throw new Error("could not import component");
        }
        this.setState({ component: cmp.default });
      } catch (error) {
        console.log("error :", error);
      }
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
