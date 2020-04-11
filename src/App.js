import React from "react";
import Home from './Pages/Home'
import { ManageStore } from './Components'

export default function App() {
  return (
    <ManageStore>
      <Home />
    </ManageStore>
  );
}