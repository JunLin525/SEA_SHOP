import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
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

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://170.187.229.248:8000/Restaurant-api/Restaurant-Comment-Detail/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
            });

            if (response.ok) {
                alert('Comment deleted successfully');
                Navigate('/')
                // 刷新评论列表或执行其他操作
            } else {
                alert('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };



    const handlePutComment = async (commentId) => {
        try {
            const response = await fetch(`http://170.187.229.248:8000/Restaurant-api/Restaurant-Comment-Detail/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
            });

            if (response.ok) {
                alert('Comment deleted successfully');
                Navigate('/')
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
                <h1>留言</h1>
                <h2>{comment.RestaurantName}</h2>
                <h4>留言者：{comment.user_pk}</h4>
                <h4>整體評分：{comment.Rating}</h4>
                <h4>留言主旨：{comment.Title}</h4>
                <h4>留言內容：{comment.Body}</h4>

                <button className='DeleteComment' onClick={() => handleDeleteComment(commentID)}>刪除留言</button>

                <div className="comment-type">
                    <h3>編輯留言</h3>
                    <form onSubmit={handlePutComment}>
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
                        <button className='AddComment' >編輯留言</button>
                    </form>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>


            </div>
        </div>

    )
}
export default CommentDetail;