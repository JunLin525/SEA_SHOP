import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function CommentDetail() {
    const navigate = useNavigate()
    const { commentID } = useParams()
    const [comment, setComment] = useState({})
    const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

    useEffect(() => {
        let getComment = async () => {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

            const response = await fetch(`http://170.187.229.248:8000/Restaurant-api/Restaurant-Comment-Detail/${commentID}/`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': 'Bearer' + String(accessToken)
                    'Authorization': 'Bearer ' + String(authTokens.access)

                },
            })

            const data = await response.json()
            setComment(data)
            window.scrollTo(0, 0);

        }

        getComment()
    }, [commentID])




    const handleSubmit = async (e) => {
        e.preventDefault()
        const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
        const formData = new FormData();
        formData.append('Rating', e.target.rating.value);
        formData.append('Title', e.target.title.value);
        formData.append('Body', e.target.comment.value);
        formData.append('user_pk', '1');
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


    // 刪除功能
    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://170.187.229.248:8000/Restaurant-api/Restaurant-Comment-List/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
            });

            if (response.ok) {
                alert('Comment deleted successfully');
                // 刷新评论列表或执行其他操作
            } else {
                alert('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
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
                <div className='comment-color'>
                    <h2>留言區</h2>
                    <ul>
                        {comments.map((comment, index) => {
                            if (shop.id === comment.Restaurant) {
                                return (
                                    <li key={comment.id}>
                                        <h4>第{index + 1}則</h4>
                                        <h4>{comment.RestaurantName}</h4>
                                        <h4><Link to={`/commentDetail/${comment.id}`}>{comment.Title}</Link></h4>
                                        <h5>{comment.Body}</h5>
                                        <hr />
                                        <button className='AddComment' >編輯留言</button>
                                        <button className='DeleteComment' onClick={handleDeleteComment} >刪除留言</button>

                                    </li>
                                )
                            } else {
                                return null
                            }
                        })}
                    </ul>
                </div>
            </div>

            <div className="comment-type">
                <h3>新增留言</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">留言標題：</label><br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="新增留言標題"
                    /><br />
                    <label htmlFor="comment">餐廳評論:</label><br />
                    <input
                        type="text"
                        id="comment"
                        name="comment"
                        placeholder="新增餐廳評論"
                    /><br />
                    <label htmlFor="rating">餐廳評分：</label><br />
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        min="1"
                        max="10"
                    /><br />
                    <button type="submit">送出</button>
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

export default CommentDetail;