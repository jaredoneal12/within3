import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './pages/Main';
import { LaunchOverview } from './pages/LaunchOverview';

const Container = styled.div`
  padding: 35px;
`

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<LaunchOverview />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
