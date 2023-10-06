import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';
import jwt_decode from "jwt-decode";
import Authcontext from '../context/AuthContext';


function ShopUpdate() {
    let { user } = useContext(Authcontext)
    const BASE_URL = "https://junlin5525.dev/api"
    const navigate = useNavigate()

    const [shopUpdate, setShopUpdate] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
        const formData = new FormData();
        formData.append('Name', e.target.Name.value);
        formData.append('Country', e.target.Country.value);
        formData.append('Price', e.target.Price.value);
        formData.append('Rating', e.target.Rating.value);
        formData.append('People', e.target.People.value);
        formData.append('Address', e.target.Address.value);
        formData.append('Introduction', e.target.Introduction.value);
        formData.append('Picture', e.target.Picture.files[0]);
        formData.append('user_pk', user.user_id);

        console.log(formData)
        try {
            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-Detail/9/`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: formData
            });
            if (response.ok) {
                alert('貼文完成，將跳回列表頁面')
                navigate('/Shop/')
                // 评论发送成功，执行相应的操作
            } else {
                // 评论发送失败，处理错误情况
                alert('Failed to send comment');
                console.log(formData)
            }
        } catch (error) {
            console.error('Error sending comment:', error);
        }
    };



    return (
        <div className='landing-background'>
            <Header />
            <div className='white-mock'>
                <div className='page'>
                    <div className="add-shop__like">
                        <h3>新增餐廳</h3>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="Name">餐廳名稱：</label><br />
                            <input
                                type="text"
                                id="Name"
                                name="Name"
                                placeholder="新增餐廳名稱"
                            /><br />
                            <label htmlFor="Country">代表國家:</label><br />
                            <input
                                type="text"
                                id="Country"
                                name="Country"
                                placeholder="新增代表國家"
                            /><br />
                            <label htmlFor="Price">平均價格：</label><br />
                            <input
                                type="number"
                                id="Price"
                                name="Price"
                                min="1"
                                max="10000"
                            /><br />
                            <label htmlFor="Rating">餐廳評分：</label><br />
                            <input
                                type="number"
                                id="Rating"
                                name="Rating"
                                min="1"
                                max="10"
                            /><br />
                            <label htmlFor="People">建議人數：</label><br />
                            <input
                                type="number"
                                id="People"
                                name="People"
                                min="1"
                                max="100"
                            /><br />
                            <label htmlFor="Address">餐廳地址:</label><br />
                            <input
                                type="text"
                                id="Address"
                                name="Address"
                                placeholder="新增餐廳地址"
                            /><br />
                            <label htmlFor="Introduction">餐廳簡介:</label><br />
                            <input
                                type="text"
                                id="Introduction"
                                name="Introduction"
                                placeholder="新增餐廳簡介"
                            /><br />
                            <label htmlFor="Picture">餐廳圖片:</label><br />
                            <input
                                type="file"
                                id="Picture"
                                name="Picture"
                            /><br /><br />
                            <button className='submit' type="submit">送出</button>
                        </form>
                        <br />
                    </div>
                </div>
            </div>



            <div className='landing-back' />
            <Footer />
        </div >

    )
}

export default ShopUpdate;