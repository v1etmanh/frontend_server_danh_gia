import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SetPage from './pages/SetPage';
import CardView from './pages/CardView';
import CompletedPage from './pages/CompletedPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/"                           element={<HomePage />} />
      <Route path="/set/:id"                    element={<SetPage />} />
      <Route path="/set/:id/card/:cardId"       element={<CardView />} />
      <Route path="/set/:id/completed"          element={<CompletedPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
