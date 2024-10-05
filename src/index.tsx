import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TicTacToe from './Game/TicTacToe';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TicTacToe />
  </StrictMode>,
);
