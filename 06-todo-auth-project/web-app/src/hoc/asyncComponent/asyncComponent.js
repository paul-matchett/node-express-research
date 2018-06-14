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
      } catch (e) {
        console.log("e :", e);
      }
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
