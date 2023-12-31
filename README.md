## SEA_SHOP

## 產品簡述:

主要使想建立一個可以讓使用者找尋一些東南亞的據點跟店家，並作為一個小的分享平台讓使用者可以相互交流據點資訊跟特色店家資料。

本專案使用了前端React跟後端Django，並利用Django Restful FrameWork來作為API開發。

整體專案有使用了JWT-Token來做Authentication、Django-Filter來做Filter、CorsHeaders來做前端分享設定，DRF-rest-auth作為登入跟註冊。

除了本身SEA_SHOP Project外，在Project下整個專案在後端上主要分做幾個App來分別進行：
1. Custom User - 來作為客製化Django 使用者資料。
2. Restaurant  - 作為一些有特色的東南亞餐廳的介紹與貼文，Models中建立了可以存取餐廳資料跟回應的兩者。並透過DRF的方式將內容Serializer後並轉成API。
3. SouthEaseAsiaCommunity - 將常碰到的東南亞聚落做介紹與貼文，Models中建立了基本資料與回應兩者，一樣透過DRF將其轉化，並轉成API。

最後透過前後端分離的方式，將Dnago部屬在port 8000，React部屬在3000，利用Nginx的方式將其部屬於Linode。

### A、網頁主要分成幾個大頁面

1. 頁面初衷
2. 網站介紹
3. 東南亞聚落
4. 東南亞店家
5. 登入登出頁面

### B、網頁預期使用

主要會希望使用者可以透過這個網站做出下列行為

1. 一個喜歡探詢東南亞社群與聚落的人。
   他可以藉由這個網站進到一些東南亞移民工的聚落，並且在那邊找尋自己喜愛的飲食跟文化，更認識台灣不同風景。
   他可以在這邊留言、觀看文章來做為互動。

2. 東南亞店家愛好者
   他可以藉由看到不同店家的介紹，找到一些有趣且好吃的特色菜。
   可以藉由留言板處可以相互交流一些特色菜色，可以自己發言特色店家，或是透過留言互動。

### C、啟動方式
#### 後端
若將資料夾程式拉下來後，首先可以進到[backend](https://github.com/JunLin525/SEA_SHOP/tree/main/backend)資料夾中下輸入下列指令將相關的套件裝入相關的套件，以利後續的專案啟動。
並且可以透過設定Virtual environment後確保架設好虛擬環境，接著來安裝下列清單套件：
利用下面的指令可以安裝相關運行python的套件。
'''
 pip install -r requirements.txt
'''

接下來使用下列指令可以成功啟用後端。
'''
python manage.py runserver <port number>
'''
若不打port number，將會在port 8000啟動服務，若有其他需求可以自由變更開啟服務的port。
相關的API的url將在下方介紹。

#### 前端
可以進到[frontend](https://github.com/JunLin525/SEA_SHOP/tree/main/frontend/seashop)資料夾下輸入下列指令
'''
npm start
'''
前端啟動後，可以順利抓取後端資料來做呈現。
本專案參考了些許css的技巧，但因為版面不太嫻熟調整，可能會有部分裝置會有跑版的狀況。


### D、使用套件
在Python狀況下我們使用了下列套件。
#### 甲、django-cors-headers
主要是用來處理並加入CORS的標頭，讓不同來源的瀏覽器都可以訪問後端發起請求。
#### 乙、whitenoise
Django在正式部屬時需要使用whitenoise才能較有效率的存取靜態資源，而透過whitenoise可以在正式部屬的時候處理相關的static files 跟Media files。
#### 丙、Django rest framework
一般皆會使用Django Rest Framework來作為將資料Serilize並轉成API的套件，這邊使用Django Rest Framework來做相關的處理。
#### 丁、Djangorestframework-simplejwt
使用Json web token來作為持續登入驗證之用，把相關token存在session中。
#### 戊、dj_rest_auth
Django主要用來作為登入及註冊之用，是一個方便使用的套件。
#### 己、django-filter
可以作為filter來作為資料庫索引的相關搜尋，有利查找相關關鍵字相關資料。
#### 庚、django-spectacular
swagger頁面可以呈現所有的API網站跟Verb的使用。

### E、本專案有使用的API
#### 甲、註冊(api/dj-rest-auth/registration/)
可以使用這個API來做為註冊之用，在前端註冊完成之後會跳轉回首頁。
#### 乙、登入(api/dj-rest-auth/login/)
此API可以做為登入之用，會回傳一個Key作為登入驗證之用。
#### 丙、JWT-Token(api/api-jwt/token/)
可以回傳access 跟 refresh token讓瀏覽器可以持續保持登入狀況。
#### 丁、Restaurant API(api/Restaurant-api/)
下方分別有四個API:
1.獲取所有推薦餐廳資料(api/Restaurant-api/Restaurant-List) 
2.獲取個別推薦餐廳資料(api/Restaurant-api/ Restaurant-Detail/<int:pk>/ )
3.獲取所有餐廳留言資料(api/Restaurant-api/ Restaurant-Comment-List)
4.獲取個別餐廳留言資料(api/Restaurant-api/ Restaurant-Comment-Detail/<int:pk>)
#### 戊、東南亞聚落API(api/Settlement-api/)
這一系列API主要是想讓大家知道有那些比較密集的東南亞聚落，主要找到一些擁有較密集東南亞商家聚集的地點，以國家別來分類。此部分主要採用uuid，若要看個別貼文可能要到List中先看相關資訊再貼上。
1. 獲取所有東南亞聚落資料(api/Settlement-api/List)
2. 獲取個別東南亞聚落資料(api/Settlement-api/ Detail/<uuid:pk>/)
3. 獲取所有東南亞聚落留言資料(api/Settlement-api/ Reply-List)
4. 獲取個別東南亞聚落留言資料(api/Settlement-api/ Reply-Detail/<uuid:pk>/)



