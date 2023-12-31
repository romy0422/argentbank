import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index/Index'
import SignIn from './pages/Sign-in/SignIn'
import User from './pages/User/User'
import Error from './components/error404/Error'
import Navigation from './components/navigation/Navigation'
import Footer from './components/footer/Footer'

// gère les urls et l'affichage des composants avec react-router
export default function App() {
  return (
    
    <>

      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/profile" element={<User />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    
      
    </>
  )
}

