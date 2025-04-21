import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./components/AddTask"
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewTask from "./components/ViewTask";
import Header from "./components/Header";

function App() {

  return (
    <>
    <BrowserRouter>
    <Header/>
        <Routes>
          <Route path="/" element={<AddTask/>}/>
          <Route path="/view" element={<ViewTask/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
