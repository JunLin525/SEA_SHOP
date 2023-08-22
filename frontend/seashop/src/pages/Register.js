import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch('http://170.187.229.248:8000/dj-rest-auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'email': e.target.email.value,
                'password1': e.target.pwd1.value,
                'password2': e.target.pwd2.value
            })
        })
        if (response.status === 200) {
            alert('Submit success.')
            navigate('/')
        } else {
            alert('sometghing went wrong!')
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
                    <input type="text" id="Username" name="username" /><br />
                    <label style={{ fontSize: '28px' }} htmlFor="Email">E-mail:   </label>
                    <input type="email" id="email" name="email" /><br />
                    <label style={{ fontSize: '28px' }} htmlFor="pwd1">Password:   </label>
                    <input type="password" id="pwd1" name="pwd1" /><br />
                    <label style={{ fontSize: '28px' }} htmlFor="pwd2">Password Again:   </label>
                    <input type="password" id="pwd2" name="pwd2" /><br />
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