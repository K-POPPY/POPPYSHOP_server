// 라우팅은 애플리케이션 엔드 포인트(URI)의 정의, 그리고 URI가 클라이언트 요청에 응답하는 방식
const express = require("express"); // express 불러오기
const cors = require('cors'); // cors 불러오기
const app = express(); // 불러온 express 실생
const models = require('./models'); // ./models의 함수들을 불러온다.
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
	}),
});
const port = 8080;

//상수 app에
app.use(express.json()); //json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(cors()) //브라우저의 CORS 이슈를 막기 위해 사용하는 코드
app.use("/uploads", express.static("uploads")); // 이미지파일이 저장될 기본 경로를 설정

// 다음의 라우트 경로는 요청을 루트 라우트 /에 일치시킴
app.get('/products', (req, res) => {
    models.Product.findAll({
        /* 페이지 갯수 지정
        limit:1 */
        // 목록 정렬
        order: [["createdAt", "DESC"]], // 내림차순(최신순) DESC 오름차순 ASC
        attributes: ["id", "name", "price", "seller", "description", "imageUrl", "createdAt"]

    })
        .then((result) => {
            console.log("PRODUCTS:", result);
            res.send({
                product: result,
            });
        })
        .catch((err) => {
            console.error(err);
            res.send("에러발생");
        });
});

app.get('/products/:id', (req, res) => {
    const params = req.params;
    const { id } = params;
    models.Product.findOne({
        where: {
            // id: id,
            id,
        },
    })
        .then((result) => {
            console.log(result);
            res.send({ product: result })
        })
        .catch((err) => {
            console.error(err);
            res.send("상품조회시 에러가 발생했습니다.");
        })
});

// 기본 형식
app.get('/', (req, res) => {
    res.send("Hello!");
});

// app에 post 방식 사용시 요청, 응답 post 방식은 postman에서도 변경
app.post('/products', (req, res) => {
    const body = req.body;
    // 1. 디스트럭처링으로 상수 body 의 값을 개별적으로 할당
    const { name, price, seller, description } = body;
    // if (!name || !price || !seller || !description ){
    //     res.send("호로롤로로로로로로");
    // }
    // 2. 레코드 생성 : Product테이블에 괄호안의 객체를 생성
    //3. 데이터를 다루는 것은 기본적으로 비동기 통신을 지원하므로 promise 객체 활용
    models.Product.create({
        name,
        price,
        seller,
        description
    }).then((result) => {
        console.log("상품생성결과", result)
    }).catch((err) => {
        console.error(err);
        res.send("상품업로드에 문제가 발생했습니다.")
    })
});

app.post("/image", upload.single("image"), (req, res) => {
    const file = req.file;
    console.log(file);
    res.send({
        imasgeUrl: file.path,
    })
})

app.listen(port, () => {
    console.log("뽀삐샵 서버가 구동되고 있습니다.");
    models.sequelize
        .sync()
        .then(() => {
            console.log('✓ DB 연결 성공');
        })
        .catch(function (err) {
            console.error(err);
            console.log('✗ DB 연결 에러');
            // 에러발생시 서버프로세스 종료
            process.exit();
        });
});

// get 방식
// 터미널에 node server.js -> 터미널에 뽀삐샵 서버 실행중 출력
// 웹주소 http://localhost:8080/products -> 브라우저에  res.send 의 내용 출력