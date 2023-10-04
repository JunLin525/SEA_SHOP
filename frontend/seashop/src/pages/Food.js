import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function Food() {
    const BASE_URL = "https://junlin5525.dev/api"
    const [food, setFood] = useState([])
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
            const response = await fetch(`${BASE_URL}/Settlement-api/List`, {
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
        <div className="landing-background">
            <Header />
            <div className='white-mock'>
                <div className="food-page">
                    <br />
                    <br />
                    <div className='food-content'>
                        <h1 className='food__title'>東南亞美食介紹</h1>
                        <p calssName='food__subtitle'>這是一個分享東南亞聚落地景的頁面，
                            <br />歡迎分享你所知所了解的區域，讓更多喜愛嘗鮮的人們前往。</p>
                    </div>
                    <div className="cards">
                        <ul>
                            {food.map(item => (
                                <div >
                                    <li className='book_item' key={item.pk}>
                                        <article class="cardd">
                                            <div className='card__like'>
                                                <div className='book_info'>
                                                    <img className="card__img" src={item.Picture} alt="Book Cover" style={{ width: '200px', heigh: '200px' }} />
                                                    <br />
                                                    <Link to={`/Food-detail/${item.pk}`} className="card_link"> {item.AreaName}</Link>
                                                    <div className="card__info">
                                                        <div className='author'>地址：{item.Address}</div>
                                                        <div classNmae='publisher'>交通方式:{item.PublicTransportation}</div>
                                                        <div className='publisher'>國家：{item.Country}</div>
                                                        <div className='ISBN'>介紹：{item.Introduction}</div>
                                                        <br />
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                        <div className='card-space'>

                                        </div>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                <br />
                <br />

                <Footer />
            </div>
        </div>


    )
}


export default Food