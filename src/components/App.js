import React, { useEffect } from 'react'
import Header from './Header';
import Keyboard from './Keyboard';
import Settings from './Settings';
import ChordInfo from './ChordInfo';
import start from '../controllers/start';

const App = () => {

  useEffect(() => {
    start();
  }, []);

  return (
    <div>
      <Header />
      <Keyboard />
      <ChordInfo />
      <Settings />
    </div>
  );
};

export default App;
