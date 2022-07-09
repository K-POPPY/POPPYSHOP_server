// 라우팅은 애플리케이션 엔드 포인트(URI)의 정의, 그리고 URI가 클라이언트 요청에 응답하는 방식
const express = require("express");
const cors = require('cors');
const app = express();
const port = 8080;

//상수 app에
app.use(express.json()); //json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(cors()) //브라우저의 CORS 이슈를 막기 위해 사용하는 코드

// 다음의 라우트 경로는 요청을 루트 라우트 /에 일치시킴
app.get('/products', (req, res) => {
    const query = req.query;
    // 브라우저 주소창에서 쿼리로 http://localhost:8080/products?333 
    // ㄴ 터미널에서 Query { '333': '' } 출력
    console.log("Query", query);
    res.send({
        "products": [
            {
                "id": 1,
                "name": "습식사료",
                "price": 50000,
                "seller": "내추럴코어",
                "imgUrl": "images/products/food1.jpg"
            },
            {
                "id": 2,
                "name": "하네스",
                "price": 60000,
                "seller": "도기멍",
                "imgUrl": "images/products/acc1.jpg"
            },
            {
                "id": 3,
                "name": "배변패드",
                "price": 50000,
                "seller": "흡수혁명",
                "imgUrl": "images/products/house1.jpg"
            },
            {
                "id": 4,
                "name": "냠냠사료",
                "price": 30000,
                "seller": "망고망고",
                "imgUrl": "images/products/food2.jpg"
            },
            {
                "id": 5,
                "name": "장난감",
                "price": 70000,
                "seller": "도기멍",
                "imgUrl": "images/products/toy2.jpg"
            },
            {
                "id": 6,
                "name": "멍기쿠션",
                "price": 50000,
                "seller": "폭신짱",
                "imgUrl": "images/products/house2.jpg"
            },
            {
                "id": 7,
                "name": "건식사료",
                "price": 47000,
                "seller": "얄루",
                "imgUrl": "images/products/food3.jpg"
            },
            {
                "id": 8,
                "name": "망고간식",
                "price": 100000,
                "seller": "망고쓰",
                "imgUrl": "images/products/snack1.jpg"
            },
            {
                "id": 9,
                "name": "망고가좋아하는간식",
                "price": 50000,
                "seller": "멍냥이",
                "imgUrl": "images/products/snack2.jpg"
            },
            {
                "id": 10,
                "name": "패션왕망고",
                "price": 90000,
                "seller": "망고84",
                "imgUrl": "images/products/toy1.jpg"
            }
        ]
    })
});
app.get('/products/:id/events/:eventId', (req, res) => {
    const params = req.params;
    const { id, eventId } = params;
    res.send(`id는 ${id}와 ${eventId} 입니다.`);
});

// 기본 형식
app.get('/', (req, res) => {
    res.send("Hello!");
});

// post 방식은 postman에서 설정가능
app.post('/products', (req, res) => {
    const body = req.body;
    res.send(
        /* body:body */
        body
    )
});

app.listen(port, () => {
    console.log("뽀삐샵 서버 실행중");
});

// get 방식
// 터미널에 node server.js -> 터미널에 뽀삐샵 서버 실행중 출력
// 웹주소 http://localhost:8080/products -> 브라우저에  res.send 의 내용 출력