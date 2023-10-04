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
    const [food, setFood] = useState([])
    const authTokens = JSON.parse(localStorage.getItem('authTokens')); // 從 localStorage 中獲取 Access Token

    /*  get food api and save it as json data*/
    useEffect(() => {
        let getFood = async () => {

            const response = await fetch(`${BASE_URL}/api/foodie-Area/Area-Detail/${foodID}`, {

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


    return (
        <div className='landing-background'>
            <Header />
            <div className='content'>
                <br />
                <h1>摘要區</h1>
                <h4>{food.Name}</h4>
                <h4>{food.Address}</h4>
                <h4>{food.Country}</h4>
                <h4>{food.Introduction}</h4>
                <img src={food.Picture} alt="Book Cover" style={{ width: '200px', heigh: '200px' }} />
                <br />
                <hr />
                <h2>留言區</h2>

            </div>


            <div className='landing-back' />
            <Footer />
        </div>

    )
}

export default FoodDetail;