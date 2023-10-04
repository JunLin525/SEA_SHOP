import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function ShopEdit() {
    const BASE_URL = "https://junlin5525.dev/api"
    const navigate = useNavigate()
    const { shopID } = useParams()

    const [shopUpdate, setShopUpdate] = useState([])
    const handlePutComment = async (e) => {
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
        console.log(formData)


        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            console.log(authTokens)
            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-Detail/${shopID}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: formData
            });

            if (response.ok) {
                alert('貼文已經成功編輯! 將跳轉回前頁');
                navigate(`/Shop-Detail/${shopID}`)

                // 刷新评论列表或执行其他操作
            } else {
                alert('若不是PO文者或是管理員是不能變更貼文的歐');
            }
        } catch (error) {
            console.error('Error Edit comment:', error);
        }
    };



    return (
        <div className='landing-background'>
            <Header />
            <div className='white-mock'>
                <div className='page'>
                    <div className="add-shop__like">
                        <h3>變更餐廳</h3>
                        <form onSubmit={handlePutComment}>
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

export default ShopEdit;