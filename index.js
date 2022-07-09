var http = require("http"); // 노드 모듈을 가져온다
var hostname = "127.0.0.1";//내컴퓨터 내부주소
var port = "8080";// 사용할 서버 포트

//서버생성 ( req(request):요청, res(responsive):응답 )
const server = http.createServer(function (req, res) {
    const path = req.url;
    const method = req.method;

    if (path === "/products") {
        if(method === "GET"){
            res.writeHead(200,{
                // 콘텐트 타입 꼭 지정해야함
                "Content-Type":"application/json"
            });
            // JSON을 가져와서 웹화면에 뿌릴땐 JAVASCRIP로 바꿔줌
            const products=JSON.stringify([
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
            ]);
            // end : endpoint 브라우저 화면에 출력
            res.end(products);
        }else if(method==="POST"){
            res.end("WOW")
        }
    }
    // node 한글이 깨지는 경우가 많아 영어로
    res.end("Bye my bady...")
})

// 서버를 요청 대기 상태로 만든다
server.listen(port, hostname);
console.log("poppy-shop server on");

// get 방식
// 터미널에 node index.js -> 터미널에 poppy-shop server on 출력
// 웹주소 127.0.0.1:8080 -> 브라우저에  상수 products의 내용 출력