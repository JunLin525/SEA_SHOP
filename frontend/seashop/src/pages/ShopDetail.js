import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function ShopDetail() {
    const navigate = useNavigate()
    const { shopID, commentID } = useParams()
    const [shop, setShop] = useState({})
    const [comments, setComments] = useState([])
    const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

    useEffect(() => {
        let getShop = async () => {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

            const response = await fetch(`http://170.187.229.248:8000/Restaurant-api/Restaurant-Detail/${shopID}/`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer' + String(accessToken)
                    'Authorization': 'Bearer ' + String(authTokens.access)

                },
            })

            const data = await response.json()
            setShop(data)
            window.scrollTo(0, 0);

        }

        getShop()
    }, [shopID])

    useEffect(() => {
        let getComment = async () => {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

            const response = await fetch(`http://170.187.229.248:8000/Restaurant-api/Restaurant-Comment-List`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)

                },
            })
            const commentData = await response.json();
            setComments(commentData);
        };

        getComment()
    }, [])


    /*
        let handleChange = (value) => {
            setBook(book => ({ ...book, 'Abstract': value }))
            console.log('hanle chcange', book)
        }
    */

    const handleSubmit = async (e) => {
        e.preventDefault()
        const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
        const formData = new FormData();
        formData.append('Rating', e.target.rating.value);
        formData.append('Title', e.target.title.value);
        formData.append('Body', e.target.comment.value);
        formData.append('Photo', e.target.picture.files[0]); // 注意這裡使用了 files[0]
        formData.append('Restaurant', shop.id);
        try {

            const response = await fetch('http://170.187.229.248:8000/Restaurant-api/Restaurant-Comment-List', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: formData
            });
            if (response.ok) {
                alert('Suceess submit!')
                navigate(`/Shop-Detail/${shop.id}`)
                // 评论发送成功，执行相应的操作
            } else {
                // 评论发送失败，处理错误情况
                alert('Failed to send comment');
            }
        } catch (error) {
            console.error('Error sending comment:', error);
        }

    };



    return (
        <div className='landing-background'>
            <Header />
            <div className='content'>
                <br />
                <h1>餐廳心得</h1>
                <h2>{shop.Name}</h2>
                <img src={shop.Picture} alt="Book Cover" style={{ width: '300px', heigh: '300px' }} />
                <h4>代表國家：{shop.Country}</h4>
                <h4>單人價格:{shop.Price}</h4>
                <h4>整體評分：{shop.Rating}</h4>
                <h4>建議用餐人數:{shop.People}</h4>
                <h4>餐廳地址：{shop.Address}</h4>
                <h4 border="red">餐聽介紹:{shop.Introduction}</h4>
                <h2>留言區</h2>
                <ul>
                    {comments.map(comment => {
                        if (shop.id === comment.Restaurant) {
                            return (
                                <li key={comment.id}>
                                    <h6>{comment.id}</h6>
                                    <h4><Link to={`/commentDetail/${comment.id}`}>{comment.Title}</Link></h4>
                                    <h5>{comment.Body}</h5>
                                    <hr />

                                </li>
                            )
                        } else {
                            return null
                        }
                    })}
                </ul>
            </div>

            <div className="comment-type">
                <h3>新增留言</h3>
                <form onSubmit={handleSubmit}>
                    <label for="title">留言標題：</label><br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="新增留言標題"
                    /><br />
                    <label for="comment">餐廳評論:</label><br />
                    <input
                        type="text"
                        id="comment"
                        name="comment"
                        placeholder="新增餐廳評論"
                    /><br />
                    <label for="rating">餐廳評分：</label><br />
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        min="1"
                        max="10"
                    /><br />
                    <lable for="picture">上傳圖片：</lable><br />
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        accept=".png,.jpg,.gif"
                    /><br />
                    <button button type="submit">送出</button>
                </form>
                <br />
                <br />
                <br />
                <br />
            </div>
            <div className='landing-back' />
            <Footer />
        </div>

    )
}

export default ShopDetail;