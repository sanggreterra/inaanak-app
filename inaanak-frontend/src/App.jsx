import React from 'react';
import InaanakList from './components/InaanakList';
import InaanakForm from './components/InaanakForm';

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1>INAANAK Manager</h1>
      <InaanakForm />
      <hr />
      <InaanakList />
    </div>
  );
}
