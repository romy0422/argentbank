// Components
import Account from '../../components/account/Account'
import UserHeader from '../../components/userHeader/UserHeader'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

// Styles
import './User.css'


export default function User() {
  document.title = "Argent Bank - User's Page"
  let navigate = useNavigate()
  
  const { token } = useSelector((state) => state?.userLogin)
  
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token, navigate])
  
  return (
    <>
      <main className="main bg-grey bg-padding">
        <UserHeader />
        <h2 className="sr-only">Accounts</h2>
        <Account
          title="Argent Bank Checking (x8349)"
          amount="$2,082.79"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Savings (x6712)"
          amount="$10,928.42"
          description="Available Balance"
        />
        <Account
          title="Argent Bank Credit Card (x8349)"
          amount="$184.30"
          description="Current Balance"
        />
      </main>
    </>
  )
}