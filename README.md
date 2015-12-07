#U-Chat

##簡介
U-Chat是我WebApp實作課程的FinalProject，一套基於Node.js開發而成的聊天室軟體，
Server端使用Express框架建立，利用Socket.io進行Real time雙向傳輸連線。
後端沒有寫很多，主要透過socket.emit 和 socket.on，
來讓前後端傳輸與接收資料，並記錄使用者ID。
Client端主要以JQuery寫成，方便取用DOM。

由於是WebApp，所以是跨平台的軟體，電腦、手機、平板連線即可使用。

###網頁版連線網址:
- [U-chat](http://140.115.205.117:4000/)
目前外觀還沒針對各家瀏覽器調整，所以畫面沒有調整得很好

###Feature:

* 多人群聊
* 私人聊天
* 上傳圖片功能
* 在線人數
* 大頭貼
* 登入介面
* 純手工CSS設計(花很多時間的部分，很喜歡自己搞UI設計，但弄得好累阿，是該學習Bootstrap了)
* 通知功能(限Firefox OS & Firefox Browser)
* 斷線後自動重連

###未來預計新增的功能:

* 音效
* 更換背景圖片
* 小畫家
* 貼圖功能
* 影片、音樂上傳
* 連接資料庫，儲存訊息與帳戶資料
* 好友功能
