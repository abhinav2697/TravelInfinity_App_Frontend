import { Route, Routes } from "react-router-dom";
import { Home, SearchResults, SingleHotel } from './pages';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels/:name/:address/:id/reserve" element={<SingleHotel />} />
      <Route path="/hotels/:name/:address" element={<SearchResults/>}/>
    </Routes>
    
    
    
  );
}

export default App;
