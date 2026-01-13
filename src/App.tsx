import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transicao from "./pages/Transacao";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Transicao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
