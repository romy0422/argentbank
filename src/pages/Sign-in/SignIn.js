// Components
import Footer from '../../components/footer/Footer'
import Navigation from '../../components/navigation/Navigation'
import SignInForm from '../../components/signInForm/SignInForm'

export default function SignIn() {
  document.title = 'Argent Bank - Login'
  return (
    <>
      <Navigation />
      <main className="main bg-dark">
        <SignInForm />
      </main>
      <Footer />
    </>
  )
}
