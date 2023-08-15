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
    /*
        const handleSubmit = async (e) => {
            e.preventDefault()
            const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token
            const article = book.pk
            const title = e.target.title.value
            const author = jwt_decode(authTokens.access).user_id
            const text = e.target.comment.value
            const comment = {
                article,
                title,
                author,
                text,
            };
            try {
                const response = await fetch(`http://170.187.229.248:8000/NewBook/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access)
    
                    },
    
                    body: JSON.stringify(comment)
                })
                if (response.ok) {
                    alert('Suceess submit!')
                    navigate(`/abstract/`)
                    // 评论发送成功，执行相应的操作
                } else {
                    // 评论发送失败，处理错误情况
                    alert('Failed to send comment');
                }
            } catch (error) {
                console.error('Error sending comment:', error);
            }
    
        };
    
*/

    return (
        <div className='landing-background'>
            <Header />
            <div className='content'>
                <br />
                <h1>餐廳心得</h1>
                <h2>{shop.Name}</h2>
                <img src={shop.Picture} alt="Book Cover" style={{ width: '400px', heigh: '500px' }} />
                <h3>代表國家：{shop.Country}</h3>
                <h3>單人價格:{shop.Price}</h3>
                <h3>整體評分：{shop.Rating}</h3>
                <h3>建議用餐人數:{shop.People}</h3>
                <h3>餐廳地址：{shop.Address}</h3>
                <h3>餐聽介紹:{shop.Introduction}</h3>
                <br />
                <hr />
                <h2>留言區</h2>
                <ul>
                    {comments.map(comment => {
                        if (shop.pk === comment.Restaurant) {
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
            <h3>新增留言</h3>
            <form>
                <input type="commentTitle"
                    name="title"
                    placeholder="新增留言標題" />
                <input type="CommentRating"
                    name="Rating"
                    placeHolder="請評分" />
                <textarea className='commentBody'
                    name='comment'
                    placeHolder='請在此輸入留言內容' />
                <br />
                <input type="submit" />
            </form>



            <div className='landing-back' />
            <Footer />
        </div>

    )
}

export default ShopDetail;