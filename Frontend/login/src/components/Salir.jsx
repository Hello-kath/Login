import { useNavigate } from 'react-router-dom'

const SignOutIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 12h9m0 0l-3.333-4M22 12l-3.333 4M14 7V5.174a2 2 0 0 0-2.166-1.993l-8 .666A2 2 0 0 0 2 5.84v12.32a2 2 0 0 0 1.834 1.993l8 .667A2 2 0 0 0 14 18.826V17"></path></svg>
    )
}

const LogoutButton = ({ className }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <button className={className} onClick={handleLogout}>Cerrar Sesión <SignOutIcon /></button>
    )
}

export default LogoutButton