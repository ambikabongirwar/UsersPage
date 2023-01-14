import React from 'react';
import './App.css';
import UsersTable from './Components/UsersTable';
import UserModal from './Components/UserModal';

function App() {
  return (
    <div className="App">
      Hi 
      <UsersTable></UsersTable>
      <br/>
      <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal m-10" type="email" placeholder="jane@example.com"></input>
    </div>
  );
}

export default App;
