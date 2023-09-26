import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Shop() {
    const BASE_URL = "http://127.0.0.1:8001/"
    const [shop, setShop] = useState([])
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate('/ShopSearch/Price/5000/People/5000/Rating/5000');
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-List`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer' + String(accessToken)
                    'Authorization': 'Bearer ' + String(authTokens.access)

                },
            })
            const jsonData = await response.json()
            console.log(jsonData);
            setShop(jsonData);
        } catch (error) {
            console.log(error);
        }


    }


    return (
        <div className="landing-background">
            <Header />
            <div className="food-page">
                <div className='food-content'>
                    <h1 className='food__title'>東南亞美食商家清單</h1>
                    <h4 calssName='food__subtitle'><button onClick={handleSearch}>進階搜索</button></h4>
                    <p>介紹在台的一些東南亞店家，並介紹特色菜色以利大家交流分享。</p>
                </div>
                <div className="cards">
                    <ul>
                        {shop.map(item => (
                            <li className='book_item' key={item.id}>
                                <div className='card__like'>
                                    <div className='book_info'>
                                        <img className="card__img" src={item.Picture} alt="Book Cover" style={{ width: '200px', heigh: '200px' }} />
                                        <br />
                                        <Link to={`/Shop-Detail/${item.id}`} > {item.Name}</Link>
                                        <div className="card__info">
                                        <div className='publisher'>平均價位：{item.Price}</div>
                                        <div className='publisher'>建議人數：{item.People}</div>
                                        <div className='publisher'>地址：{item.Address}</div>
                                        <div className='publisher'>代表國家：{item.Country}</div>
                                        <div className='publisher'>評分：{item.Rating}</div>
                                        <div className='publisher'>介紹:{item.Introduction}</div>
                                        </div>
                                        <hr />

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='landing-back'>




            </div>
            <Footer />
        </div>
    )
}


export default Shop