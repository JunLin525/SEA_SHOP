## SEA_SHOP

## 產品簡述:

主要使想建立一個可以讓使用者找尋一些東南亞的據點跟店家，並作為一個小的分享平台讓使用者可以相互交流據點資訊跟特色店家資料。

本專案使用了前端React跟後端Django，並利用Django Restful FrameWork來作為API開發。

整體專案有使用了JWT-Token來做Authentication、Django-Filter來做Filter、CorsHeaders來做前端分享設定，DRF-rest-auth作為登入跟註冊的連結並使用Django-Spectacular做成API的Swagger介面。

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
首先可以進到backend資料夾中下輸入下列指令將相關的套件裝入相關的套件，以利後續的專案啟動。
'''
 pip install -r requirements.txt
'''
接下來使用下列指令可以成功啟用後端。
'''
python manage.py runserver <port number>
'''
若不打port number，將會在port 8000啟動服務，若有其他需求可以自由變更開啟服務的port。
可以順利的在/apis的url找到swagger的頁面，得以查看所有的API。

#### 前端
可以進到frontend資料夾下輸入下列指令
'''
npm start
'''
前端啟動後，可以順利抓取後端資料來做呈現。
