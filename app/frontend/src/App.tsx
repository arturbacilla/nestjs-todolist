import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Todo from "./pages/Todo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/404" element={<NotFound />} /> */}
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
