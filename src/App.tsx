import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import TodosPage from "./pages/todos";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<TodosPage />} path="/todos" />
    </Routes>
  );
}

export default App;
