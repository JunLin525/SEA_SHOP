import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function FoodDetail() {
    const BASE_URL = "https://junlin5525.dev/api"
    const navigate = useNavigate()
    const { foodID } = useParams()
    const [comments, setComments] = useState([])
    const [food, setFood] = useState([])
    const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

    /*  get food api and save it as json data*/
    useEffect(() => {
        let getFood = async () => {

            const response = await fetch(`${BASE_URL}/Settlement-api/Detail/${foodID}`, {

                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)

                },
            })

            const data = await response.json()
            setFood(data)
            window.scrollTo(0, 0);

        }
        /*use get food function and pass foodID to get the exact single item*/
        getFood()
    }, [foodID])

    /*get food comment list*/
    useEffect(() => {
        let getComment = async () => {
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

            const response = await fetch(`${BASE_URL}/Settlement-api/Reply-List`, {

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





    /*新增留言的function*/
    const handleSubmit = async (e) => {
        e.preventDefault()
        const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
        const formData = new FormData();
        formData.append('Title', e.target.title.value);
        formData.append('Body', e.target.comments.value);
        formData.append('Area', food.id);
        console.log(formData)
        try {
            const response = await fetch(`${BASE_URL}/Settlement-api/Reply-List/`, {
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


    return (
        <div className='landing-background'>
            <Header />
            <div className='white-mock'>
                <div className='food-page'>
                    <div className="locate-detail">

                        <div className='shop__like'>
                            <h1>美食聚落</h1>
                            <h2>{food.AreaName}</h2>
                            <img src={food.Picture} alt="Book Cover" style={{ width: '200px', heigh: '200px' }} />
                            <h4>聚落名稱：{food.Name}</h4>
                            <h4>所在地址：{food.Address}</h4>
                            <h4>代表國家：{food.Country}</h4>
                            <h4>聚落介紹：{food.Introduction}</h4>

                            <div className='comments-color'>
                                <br />
                                <h2>留言區</h2>

                                <ul>
                                    {comments.map((comment, index) => {
                                        if (food.id === comment.Area) {
                                            return (
                                                <li key={comment.id}>
                                                    <hr />
                                                    <h4>貼文者：{comment.UserName}</h4>
                                                    <h4><Link to={`/FoodCommentDetail/${comment.id}`}>{comment.AreaName}</Link></h4>
                                                    <h4>{comment.Title}</h4>
                                                    <h5>{comment.Body}</h5>


                                                </li>
                                            )
                                        } else {
                                            return null
                                        }
                                    })}
                                </ul>
                                <br />
                            </div>



                            <div className="add-comment__like">
                                <h3>新增留言</h3>
                                <form onSubmit={handleSubmit} >
                                    <label htmlFor="title">留言標題：</label><br />
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="新增留言標題"
                                    /><br />
                                    <label htmlFor="comments">留言評論:</label><br />
                                    <input
                                        type="text"
                                        id="comments"
                                        name="comments"
                                        placeholder="新增留言評論"
                                    /><br />
                                    <br />
                                    <button className='submit' type="submit">送出</button>
                                </form>
                                <br />
                            </div>

                        </div>

                    </div>
                </div>



                <div className='landing-back' />
                <Footer />
            </div>
        </div>


    )
}

export default FoodDetail;