import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Authcontext from '../context/AuthContext';

function CommentDetail() {
    let { user } = useContext(Authcontext)
    const BASE_URL = "https://junlin5525.dev/api"
    const navigate = useNavigate()
    const { commentID } = useParams()
    const [comment, setComment] = useState({})
    const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

    useEffect(() => {
        let getComment = async () => {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-Comment-Detail/${commentID}/`, {

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
            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-Comment-Detail/${commentID}/`, {
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
                alert('若不是Po文者或管理員是不能刪除留言貼文的歐');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };



    const handlePutComment = async (e) => {
        e.preventDefault();
        const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
        const formData = new FormData();
        formData.append('Rating', e.target.rating.value);
        formData.append('Title', e.target.title.value);
        formData.append('Body', e.target.comments.value);
        formData.append('user_pk', user.user_id);
        console.log(formData)


        try {
            const authTokens = JSON.parse(localStorage.getItem('authTokens'));
            console.log(authTokens)
            const response = await fetch(`${BASE_URL}/Restaurant-api/Restaurant-Comment-Detail/${commentID}/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: formData
            });

            if (response.ok) {
                alert('Comment Edit successfully');
                window.location.reload();

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
                <div className='message-page'>
                    <div className='cards'>
                        <div className='message-content'>
                            <br />
                            <h1>留言</h1>
                            <h2>{comment.RestaurantName}</h2>
                            <h4>留言者：{comment.userName}</h4>
                            <h4>整體評分：{comment.Rating}</h4>
                            <h4>留言主旨：{comment.Title}</h4>
                            <h4>留言內容：{comment.Body}</h4>

                            <button className='DeleteComment' onClick={() => handleDeleteComment(commentID)}>刪除留言</button>

                            <div className="cads">
                                <h3>更改留言</h3>
                                <form onSubmit={handlePutComment}>

                                    <label htmlFor="rating">整體評分：</label><br />
                                    <input
                                        type="number"
                                        id="rating"
                                        name="rating"
                                        min="1"
                                        max="10"
                                    /><br />
                                    <label htmlFor="title">留言主旨：</label><br />
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="新增留言標題"
                                    /><br />
                                    <label htmlFor="comments">留言內容:</label><br />
                                    <input
                                        type="text"
                                        id="comments"
                                        name="comments"
                                        placeholder="新增餐廳評論"
                                    /><br />

                                    <button className='AddComment' >編輯留言</button>
                                </form>

                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}
export default CommentDetail;