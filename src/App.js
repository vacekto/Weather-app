import React from 'react';
import "./App.css"
import Right from "./components/Right"
import Left from "./components/Left"
import Media from 'react-media';

const App = () => {
  return (
    <div className="App">
    <Media
          query={{ minWidth: 615 }}>
          {matches =>
            matches ? (
              <Left />
            ) : (
              null
            )
          }
        </Media>
      
      <Right />
    </div>
  );
}

export default App;
