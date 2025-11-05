import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{BrowserRouter,Routes,Route} from'react-router-dom'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'



createRoot(document.getElementById('root'))
.render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)