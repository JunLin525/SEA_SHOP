import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch('http://170.187.229.248:8000/dj-rest-auth/registration/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFTOKEN': 'kwrcowqLDOJLHtvd7LP3SYtj5f94EmHDjIMKJTjt4vh4QUoSTp5bVLL11MKsRdSY'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'email': e.target.email.value,
                'password1': e.target.password1.value,
                'password2': e.target.password2.value
            })
        })
        if (response.status === 200) {
            alert('Submit success.')
            navigate('/')
        } else {
            alert('sometghing went wrong!')
            console.log(response)
        }
    }

    return (
        <div className="home-background">
            <Header />
            <div style={{ fontSize: '24px' }} className="body-content">
                你好:<br />
                歡迎來到本站，請依照下列表格填寫。
                請填入您的資料來註冊會員
                <form onSubmit={handleSubmit}>
                    <label style={{ fontSize: '28px' }} htmlFor="username">Username:  </label>
                    <input type="text" id="username" name="username" /><br />
                    <label style={{ fontSize: '28px' }} htmlFor="email">E-mail:   </label>
                    <input type="email" id="email" name="email" /><br />
                    <label style={{ fontSize: '28px' }} htmlFor="password1">Password:   </label>
                    <input type="password" id="password1" name="password1" /><br />
                    <label style={{ fontSize: '28px' }} htmlFor="password2">Password Again:   </label>
                    <input type="password" id="password2" name="password2" /><br />
                    <button style={{ fontSize: '24px' }} type="submit">送出表單</button>




                </form>
            </div>
            <div className='landing-back'>




            </div>
            <Footer />
        </div >
    )
}


export default Register;