import React from 'react';

//components
import { Provider } from 'react-redux';
import Home from './components/Home';
import store from './context/Store';

function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
