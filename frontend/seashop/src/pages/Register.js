import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const BASE_URL = "https://junlin5525.dev/api"


    const handleSubmit = async (e) => {
        e.preventDefault()
        let response = await fetch(`${BASE_URL}/dj-rest-auth/registration/`, {
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
        }

        else {
            alert('success submit!')
            console.log(response.status)
            console.log(response)
        }
    }

    return (
        <div className="landing-background">
            <Header />
            <div className='white-mock'>
                <div className='page'>
                    <br /><br /><br /><br />
                    <div style={{ fontSize: '18px' }} className="content">

                        <form className='form-re' onSubmit={handleSubmit}>

                            請填入您的資料來註冊會員:<br />
                            <label style={{ fontSize: '14px' }} htmlFor="username">Username:  </label>
                            <input type="text" id="username" name="username" /><br />
                            <label style={{ fontSize: '14px' }} htmlFor="email">E-mail:   </label>
                            <input type="email" id="email" name="email" /><br />
                            <label style={{ fontSize: '14px' }} htmlFor="password1">Password:   </label>
                            <input type="password" id="password1" name="password1" /><br />
                            <label style={{ fontSize: '14px' }} htmlFor="password2">Password Again:   </label>
                            <input type="password" id="password2" name="password2" /><br />
                            <button style={{ fontSize: '16px' }} type="submit">送出表單</button>




                        </form>

                    </div>
                    <Footer />
                </div >
            </div>
        </div>
    )
}


export default Register;