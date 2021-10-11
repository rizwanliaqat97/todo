import { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.log("Error: ", error);
  }

  render() {
    return this.state.hasError ? (
      <div>Something went wrong!</div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
