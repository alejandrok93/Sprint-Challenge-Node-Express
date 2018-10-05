import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = { projects: [], inputText: "", projectActions: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/projects")
      .then(response => this.setState({ projects: response.data }))
      .catch(err => console.log(err));
  }

  getActions(id) {
    axios
      .get(`http://localhost:9000/projects/${id}/actions`)
      .then(response => this.setState({ projectActions: response.data }))
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <h1>Projects app</h1>

        <div className="projects-container">
          {this.state.projects.map(project => {
            return (
              <div className="project">
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <div
                  onClick={() => this.getActions(project.id)}
                  className="actions collapsed"
                >
                  Actions
                  <div className="actions-list">
                    <ul>
                      {this.state.projectActions.map(action => (
                        <li>{action.description}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
