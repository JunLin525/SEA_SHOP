import React, { useContext } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Authcontext from '../context/AuthContext';


function Header() {
    let { user, logoutUser } = useContext(Authcontext)
    const navigate = useNavigate();
    const handleClickHome = () => {
        navigate('/');
    };

    const handleClickAbout = () => {
        navigate('/About');
    };

    const handleClickFood = () => {
        navigate('/Food')
    }

    const handleClickShop = () => {
        navigate('/Shop')
    }
    const handleClickLogin = () => {
        navigate('/login')
    }

    return (
        <div className='header'>
            <button className='title' onClick={handleClickHome}>首頁在這</button>
            <button className='title' onClick={handleClickAbout}>關於本站</button>
            <button className='title' onClick={handleClickFood}>美食聚落</button>
            <button className='title' onClick={handleClickShop}>特色店家</button>
            {user ? (
                <button className='title' onClick={logoutUser}>登出再見</button>
            ) : (<button className='title' onClick={handleClickLogin}>登入頁面</button>
            )}
            {user && <p>Hello {user.username}</p>}
            <br />
            <br />



        </div>
    )
}
export default Header;