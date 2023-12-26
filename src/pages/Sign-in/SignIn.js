// Components
import SignInForm from '../../components/signInForm/SignInForm'

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
