import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Food() {
    const [food, setFood] = useState([])
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
            const response = await fetch('http://170.187.229.248:8000/Settlement-api/List', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer' + String(accessToken)
                    'Authorization': 'Bearer ' + String(authTokens.access)

                },
            })
            const jsonData = await response.json()
            console.log(jsonData);
            setFood(jsonData);
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="home-background">
            <Header />
            <div className="body-content">
                <h1>東南亞美食介紹</h1>
                <p>這是一個分享東南亞聚落地景的頁面，歡迎分享你所知所了解的區域，讓更多喜愛嘗鮮的人們前往。</p>

                <ul>
                    {food.map(item => (
                        <li className='book_item' key={item.pk}>
                            <div className='book_back'>
                                <div className='book_info'>
                                    <Link to={`http://170.187.229.248:8000/api/foodie-Area/Area-Detail/${item.pk}`} > {item.AreaName}</Link>
                                    <div className='author'>地址：{item.Address}</div>
                                    <div classNmae='publisher'>交通方式:{item.PublicTransportation}</div>
                                    <div className='publisher'>國家：{item.Country}</div>
                                    <div className='ISBN'>介紹:{item.Introduction}</div>
                                    <img src={item.Picture} alt="Book Cover" style={{ width: '200px', heigh: '200px' }} />
                                    <hr />

                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='landing-back'>

            </div>

            <Footer />
        </div>


    )
}


export default Food