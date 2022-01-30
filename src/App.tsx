import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Messages } from "./Components/Messages";
import { NetworkingService } from "./Services/NetworkingService";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Messages networking={new NetworkingService()}/>
        </div>
      </header>
    </div>
  );
}

export default App;
