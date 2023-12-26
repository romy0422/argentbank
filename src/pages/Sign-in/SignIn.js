// Components
import SignInForm from '../../components/signInForm/SignInForm'
// affiche la page pour se connecter
export default function SignIn() {
  document.title = 'Argent Bank - Login'
  return (
    <>
      <main className="main bg-dark">
        <SignInForm />
      </main>
    </>
  )
}
