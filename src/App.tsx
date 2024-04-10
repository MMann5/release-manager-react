import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Repository from "./pages/Repository/Repository";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/repository" element={<Repository />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
