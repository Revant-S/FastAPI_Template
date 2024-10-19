
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import CreateContract from './pages/CreateContract';
import ContractPreview from './pages/ContractPreview';



function App() {

  return (
    <div >
      
      
      <Router>
       
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-contract' element={<CreateContract />} />
          <Route path='/contract-preview' element={<ContractPreview />} />


          

        </Routes>
      </Router>
    </div>
  )
}

export default App
