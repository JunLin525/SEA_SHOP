import Header from '../components/Header';
import Footer from '../components/Footer';
function About() {
    return (

        <div className="landing-background">
            <Header />
            <div className='white-mock'>
                <div className="page">
                    <div className="body-content">
                        <h1>東南亞美食搜查</h1>
                        <p><h3>網站簡述:</h3>
                            主要使想建立一個可以讓使用者
                            找尋一些東南亞的據點跟店家，<br />
                            並作為平台讓使用者相互交流據點資訊跟特色店家資料。<br />
                            你可以在美食聚落找到一些推薦的美食地點、<br />也可以從特色店家中找到喜愛的店家來訪查。<br />
                            網站全部公開，但僅有登入會員者可以查詢跟觀賞留言。


                        </p >
                    </div>
                </div >
                <Footer />
            </div>
        </div >

    )
}


export default About