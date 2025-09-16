import { Routes, Route } from 'react-router-dom'
// import Header from '../components/Header.tsx'

import { SignUp } from "../components/unauthorized/SignUp.tsx"
import { HomePage } from "../pages/homePage.tsx"
import { SignIn } from '../components/unauthorized/SignIn.tsx'
import { PasswordRecovery } from '../components/unauthorized/PasswordRecovery.tsx'
import { ResetPassword } from '../components/unauthorized/ResetPassword.tsx'
import { ActivateAccount } from '../components/unauthorized/ActivateAccount.tsx'
// import { CreatePageForm } from '../components/authorized/CreatePageForm.tsx'

export const useRoutes = (isAuthenticated: Boolean) => {
    if (isAuthenticated) {
        return (
            <>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    {/* <Route path='/create-page' element={<CreatePageForm />} /> */}
                </Routes>
            </>
        )
    } else {
        return (
            <div className='flex flex-col w-full h-screen'>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/activate/:id" element={<ActivateAccount />} />
                    <Route path="/access-recovery" element={<PasswordRecovery />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Routes>
            </div>

        )
    }
}