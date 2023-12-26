import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index/Index'
import SignIn from './pages/Sign-in/SignIn'
import User from './pages/User/User'

export default function App() {
  return (
    
    <>
  
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={<User />} />
          <Route path="*" element={<div>Error404</div>} />
        </Routes>
      </Router>
    
      
    </>
  )
}

