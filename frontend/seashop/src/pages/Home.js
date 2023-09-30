import Header from '../components/Header';
import Footer from '../components/Footer';
function Home() {
    return (
        <div className="landing-background">
            <Header />
            <div className='white-mock'>
                <div className="page">
                    <div className="body-content">
                        <h1>東南亞美食搜查</h1>
                        <h2>關於起心動念</h2>
                        <p>過去幾年常常在一些東南亞的店家跟小店打轉，常常會去串門子跟吃東西。<br />
                            有鑑於此，讓自己跟一些喜歡跑特色店家跟區域的同好們，<br />
                            有一個地方可以找到這些資訊，同時可以好好的分享這些台灣在地的異國美食。</p>

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}


export default Home