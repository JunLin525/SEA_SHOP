import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function ShopSearch() {
    const BASE_URL = "https://junlin5525.dev/api"
    const navigate = useNavigate();
    const [shop, setShop] = useState([])
    /*const { PeopleNum, PriceNum, RatingNum } = useParams()*/
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const PriceNum = searchParams.get('Price');
    const PeopleNum = searchParams.get('People');
    const RatingNum = searchParams.get('Rating');




    useEffect(() => {
        fetchData();
    }, [PriceNum, PeopleNum, RatingNum])

    const fetchData = async () => {
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-List?&max_price=${PriceNum}&max_people=${PeopleNum}&max_rating=${RatingNum}`, {
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
    const handlePeopletTwo = () => {
        navigate('/ShopSearch/Price/500/People/2/Rating/500');
        fetchData();
    }
    const handlePeopleFive = () => {
        navigate('/ShopSearch/Price/500/People/5/Rating/500');
        fetchData();
    }
    const handlePeopleTen = () => {
        navigate('/ShopSearch/Price/500/People/10/Rating/500');
        fetchData();
    }

    const handlePriceTwoFifty = () => {
        navigate('/ShopSearch/Price/250/People/500/Rating/500');
        fetchData();
    }

    const handlePriceFiveHundred = () => {
        navigate('/ShopSearch/Price/500/People/500/Rating/500');
        fetchData();
    }

    const handlePriceOneThousand = () => {
        navigate('/ShopSearch/Price/1000/People/500/Rating/500');
        fetchData();
    }

    const handleRatingThree = () => {
        navigate('/ShopSearch/Price/500/People/500/Rating/3');
        fetchData();
    }

    const handleRatingFive = () => {
        navigate('/ShopSearch/Price/500/People/500/Rating/5');
        fetchData();
    }
    const handleRatingEight = () => {
        navigate('/ShopSearch/Price/500/People/500/Rating/8');
        fetchData();
    }
    const handleRatingTen = () => {
        navigate('/ShopSearch/Price/500/People/500/Rating/10');
        fetchData();
    }


    return (
        <div className="landing-background">
            <Header />
            <div className='white-mock'>
                <div className='food-page'>
                    <div className="food-content">
                        <h1>東南亞美食商家清單</h1>
                        <p>介紹在台的一些東南亞店家，並介紹特色菜色以利大家交流分享。</p>
                        <h5>用餐人數-
                            <button onClick={handlePeopletTwo}>兩人(含)</button>
                            <button onClick={handlePeopleFive}> 五人以下</button>
                            <button onClick={handlePeopleTen}> 十人以上</button>
                        </h5>
                        <h5>用餐價格-
                            <button onClick={handlePriceTwoFifty}>250以下</button>
                            <button onClick={handlePriceFiveHundred}> 500以下</button>
                            <button onClick={handlePriceOneThousand}> 1000以下</button>
                        </h5>
                        <h5>餐廳評價-
                            <button onClick={handleRatingThree}>三分以下</button>
                            <button onClick={handleRatingFive}> 五分以下</button>
                            <button onClick={handleRatingEight}> 八分以下</button>
                            <button onClick={handleRatingTen}> 十分以下</button>
                        </h5>
                        <ul>
                            {shop.map(item => (
                                <li className='book_item' key={item.id}>
                                    <div className='book_back'>
                                        <div className='book_info'>
                                            <Link to={`${BASE_URL}/api/Locate/Shop-Detail/${item.id}`} > {item.Name}</Link>
                                            <div className='author'>平均價位：{item.Price}</div>
                                            <div className='publisher'>地址：{item.Address}</div>
                                            <div className='publisher'>建議人數：{item.People}</div>
                                            <div className='publisher'>代表國家：{item.Country}</div>
                                            <div className='publisher'>評分：{item.Rating}</div>
                                            <div className='ISBN'>介紹:{item.Introduction}</div>
                                            <img src={item.Picture} alt="Book Cover" style={{ width: '200px', heigh: '200px' }} />
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
        </div>
    )
}


export default ShopSearch