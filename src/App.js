import logo from "./logo.svg";
import "./App.css";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          I've updated my react code. The concurrent react script will update
          the local development version of my app. When I push these changes to
          the repo, AWS Amplify will detect changes to the github repository,
          and pull the changes. Resulting in changes in the Production version
          of the app. Luckily, AWS Amplify handles all the web hosting, server
          setup, and everything.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
