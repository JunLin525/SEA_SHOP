import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    const Contain = searchParams.get('Contain');
    const [containValue, setContainValue] = useState([]);




    useEffect(() => {
        fetchData();
    }, [PriceNum, PeopleNum, RatingNum, Contain])

    const fetchData = async () => {
        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-List?&max_price=${PriceNum}&max_people=${PeopleNum}&max_rating=${RatingNum}&Introduction_contains=${Contain}`, {
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
        navigate('/Shop/filter?Price=&People=2&Rating=&Contain=');
        fetchData();
    }
    const handlePeopleFive = () => {
        navigate('/Shop/filter?Price=&People=5&Rating=&Contain=');
        fetchData();
    }
    const handlePeopleTen = () => {
        navigate('/Shop/filter?Price=&People=10&Rating=&Contain=');
        fetchData();
    }

    const handlePriceTwoFifty = () => {
        navigate('/Shop/filter?Price=250&People=&Rating=&Contain=');
        fetchData();
    }

    const handlePriceFiveHundred = () => {
        navigate('/Shop/filter?Price=500&People=&Rating=&Contain=');
        fetchData();
    }

    const handlePriceOneThousand = () => {
        navigate('/Shop/filter?Price=1000&People=&Rating=&Contain=');
        fetchData();
    }

    const handleRatingThree = () => {
        navigate('/Shop/filter?Price=&People=&Rating=3&Contain=');
        fetchData();
    }

    const handleRatingFive = () => {
        navigate('/Shop/filter?Price=&People=&Rating=5&Contain=');
        fetchData();
    }
    const handleRatingEight = () => {
        navigate('/Shop/filter?Price=&People=&Rating=8&Contain=');
        fetchData();
    }
    const handleRatingTen = () => {
        navigate('/Shop/filter?Price=&People=&Rating=10&Contain=');
        fetchData();
    }
    const handleContain = (e) => {
        e.preventDefault(); // 阻止默认的表单提交行为
        navigate(`/Shop/filter?Price=&People=&Rating=&Contain=${containValue}`)
        fetchData();

    }


    return (
        <div className="landing-background">
            <Header />
            <div className='white-mock'>
                <div className='food-page'>
                    <br />
                    <br />
                    <div className="search-content">
                        <h1 className='food__title'>東南亞美食商家清單</h1>
                        <p>介紹在台的一些東南亞店家，並介紹特色菜色以利大家交流分享。</p>
                        <h5>用餐人數-
                            <button onClick={handlePeopletTwo}>兩人(含)</button>
                            <button onClick={handlePeopleFive}> 五人以上</button>
                            <button onClick={handlePeopleTen}> 十人(含)以上</button>
                        </h5>
                        <h5>用餐價格-
                            <button onClick={handlePriceTwoFifty}>250以下</button>
                            <button onClick={handlePriceFiveHundred}> 500以下</button>
                            <button onClick={handlePriceOneThousand}> 1000以下</button>
                        </h5>
                        <h5>餐廳評價-
                            <button onClick={handleRatingThree}>三分以上</button>
                            <button onClick={handleRatingFive}> 五分以上</button>
                            <button onClick={handleRatingEight}> 八分以上</button>
                            <button onClick={handleRatingTen}> 十分</button>
                        </h5>
                        <form>
                            <label htmlFor="Contain">名稱查詢：</label><br />
                            <input
                                type="text"
                                id="Contain"
                                name="Contain"
                                placeholder="請輸入介紹關鍵字來查詢"
                                value={containValue}
                                onChange={(e) => setContainValue(e.target.value)}

                            /><br />
                            <button onClick={handleContain} className='submit' type="submit">送出</button>

                        </form>
                    </div>

                    <div className="search-food">

                        <ul>
                            {shop.map(item => (
                                <li className='ㄑbook_item' key={item.id}>
                                    <div className='cardd'>
                                        <div className='card__like'>
                                            <img src={item.Picture} alt="Book Cover" style={{ width: '200px', heigh: '200px' }} />
                                            <br />
                                            <Link to={`${BASE_URL}/api/Locate/Shop-Detail/${item.id}`} > {item.Name}</Link>
                                            <div className='author'>平均價位：{item.Price}</div>
                                            <div className='publisher'>地址：{item.Address}</div>
                                            <div className='publisher'>建議人數：{item.People}</div>
                                            <div className='publisher'>代表國家：{item.Country}</div>
                                            <div className='publisher'>評分：{item.Rating}</div>
                                            <div className='ISBN'>介紹:{item.Introduction}</div>
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