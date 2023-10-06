import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Authcontext from '../context/AuthContext';


function Header() {
    let { user, logoutUser } = useContext(Authcontext)
    const navigate = useNavigate();
    const [userData, setUserData] = useState([])

    const BASE_URL = "https://junlin5525.dev/api"



    const fetchUserName = async () => {
        const authTokens = JSON.parse(localStorage.getItem('authTokens'));

        // 检查 authTokens 是否存在
        if (authTokens && authTokens.access) {
            const response = await fetch(`${BASE_URL}/dj-rest-auth/user/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
            });
            const jsonData = await response.json();
            console.log(jsonData);
            setUserData(jsonData);
        } else {
            // 如果 authTokens 不存在，可以显示一个提示或者重定向用户到登录页面
            console.log('User not logged in'); // 或者显示一个提示给用户
        }
    };

    useEffect(() => {
        fetchUserName();
    }, []);



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
            {user && <p>Hello {userData.username}</p>}




        </div>
    )
}
export default Header;