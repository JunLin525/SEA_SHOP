import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Authcontext from '../context/AuthContext';


function ShopDetail() {
    let { user } = useContext(Authcontext)
    const BASE_URL = "https://junlin5525.dev/api"
    const navigate = useNavigate()
    const { shopID, commentID } = useParams()
    const [shop, setShop] = useState({})
    const [comments, setComments] = useState([])
    const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

    useEffect(() => {
        let getShop = async () => {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-Detail/${shopID}/`, {

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

            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-Comment-List`, {

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
    /*新增留言的function*/
    const handleSubmit = async (e) => {
        e.preventDefault()
        const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
        const formData = new FormData();
        formData.append('Rating', e.target.rating.value);
        formData.append('Title', e.target.title.value);
        formData.append('Body', e.target.comments.value);
        formData.append('user_pk', user.user_id);
        formData.append('Restaurant', shop.id);
        console.log(formData)
        try {
            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-Comment-List`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: formData
            });
            if (response.ok) {
                alert('Suceess submit!')
                window.location.reload();
                // 评论发送成功，执行相应的操作
            } else {
                // 评论发送失败，处理错误情况
                alert('Failed to send comment');
            }
        } catch (error) {
            console.error('Error sending comment:', error);
        }
    };
    //跳轉edit
    const handleEdit = () => {
        navigate(`/Shop/edit/${shopID}/`)
    }
    // 刪除功能
    const handleDelete = async (e) => {
        try {
            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-Detail/${shopID}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
            });

            if (response.ok) {
                alert('Comment deleted successfully');
                navigate('/Shop/')
                // 刷新评论列表或执行其他操作
            } else {
                alert('若不是Po文者或管理員是不能刪除留言貼文的歐');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }


    return (
        <div className='landing-background'>
            <Header />
            <div className='white-mock'>
                <div className='food-page'>
                    <div className="locate-detail">
                        <div className='shop__like'>
                            <h1>餐廳評論</h1>
                            <h2>{shop.Name}</h2>
                            <img src={shop.Picture} alt="Book Cover" style={{ width: '300px', heigh: '500px' }} />
                            <h4>貼文帳號：{shop.userName}</h4>
                            <h4>代表國家：{shop.Country}</h4>
                            <h4>單人價格：{shop.Price}</h4>
                            <h4>整體評分：{shop.Rating}</h4>
                            <h4>建議用餐人數：{shop.People}</h4>
                            <h4>餐廳地址：{shop.Address}</h4>
                            <h4 border="red">餐聽介紹：{shop.Introduction}</h4>
                            <button onClick={handleEdit} className='edit-button'>編輯</button>
                            <button onClick={handleDelete} className='delete-button'>刪除</button>


                            <div className='comments-color'>
                                <br />
                                <h2>留言區</h2>
                                <ul>
                                    {comments.map((comment, index) => {
                                        if (shop.id === comment.Restaurant) {
                                            return (
                                                <li key={comment.id}>
                                                    <h4>{comment.RestaurantName}</h4>
                                                    <h4>留言者：{comment.userName}</h4>
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
                            <div className="add-comment__like">
                                <h3>新增留言</h3>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="title">留言標題：</label><br />
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="新增留言標題"
                                    /><br />
                                    <label htmlFor="comments">餐廳評論:</label><br />
                                    <input
                                        type="text"
                                        id="comments"
                                        name="comments"
                                        placeholder="新增餐廳評論"
                                    /><br />
                                    <label htmlFor="rating">餐廳評分：</label><br />
                                    <input
                                        type="number"
                                        id="rating"
                                        name="rating"
                                        min="1"
                                        max="10"
                                    /><br /><br />
                                    <button className='submit' type="submit">送出</button>
                                </form>
                                <br />
                            </div>
                        </div>




                    </div>


                </div>
            </div>
            <div className='landing-back' />
            <Footer />
        </div>

    )
}

export default ShopDetail;