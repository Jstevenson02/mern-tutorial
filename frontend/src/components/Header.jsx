import { FaSignInAlt, FaSignOutAlt, FaBullseye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>
                    <h2 style={{
                        display: 'flex',
                    }}>
                        <span>Task Assassain  </span>
                        <FaBullseye color='#FF7F7F' fontSize='35' />
                    </h2>
                </Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>) : (<>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaSignInAlt /> Register
                            </Link>
                        </li>
                    </>)}
            </ul>
        </header>
    )
}

export default Header