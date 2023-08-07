![사당동_Banner](https://user-images.githubusercontent.com/102935156/182619039-821a3613-cd9d-425b-9932-6a3738ccb7b5.png)


# 🧸사당동

## FrontEnd 핵심기능

- `ethers.js` 민팅, 블록체인 거래기능 구현
- `IPFS` 분산형 파일 시스템에 데이터 저장, 속도 및 보안성 강화
- `socket.io` 실시간 경매 및 채팅기능 구현


## 👨‍💻 프로젝트 소개

### **프로젝트 기간** (6주)
- 2022/06/24 ~ 2022/08/04

### Member
|[임형섭](https://github.com/4hsnim)|[이담](https://github.com/damiiya)|[이은총](https://github.com/eunchong2lee)|[임정현](https://github.com/lojy4231)|[이재석](https://github.com/LeeJaeSeok1)|[배재은]()|
|:------:|:---:|:---:|:---:|:---:|:---:|
|<img src="https://user-images.githubusercontent.com/102935156/182624707-3de3157c-5a65-42ce-8794-e3955e3fd68f.png" width="100" height="200"/>|<img src="https://user-images.githubusercontent.com/102935156/182624760-4fb85e4d-f8d9-4e7c-8481-b94af4c13204.png" width="120" height="200"/>|<img src="https://user-images.githubusercontent.com/102935156/182640237-80b8b7d0-fbb4-4fe2-82b2-f9c4332cd156.png" width="100" height="200"/>|<img src="https://user-images.githubusercontent.com/102935156/182624897-073b4da3-067f-4a54-b78b-8f889a3a6598.png" width="100" height="200"/>|<img src="https://user-images.githubusercontent.com/102935156/182624950-6850a246-d9fe-4a5f-9579-02bb2b4b076e.png" width="100" height="200"/>|<img src="https://user-images.githubusercontent.com/102935156/182624978-b6d55020-cea0-4868-adbb-e3bd28b916d1.png" width="100" height="200"/>|
|`Front-End`|`Front-End`|`Back-End`|`Back-End`|`Back-End`|`Designer`|


### Links
[시연영상](https://www.youtube.com/watch?v=jTech_pwjCU)   
[Front-End Github](https://github.com/damiiya/sadangdong)   
[Blockchain Github](https://github.com/eunchong2lee/SDD_Blockchain)  

## 💎Service Architecture

![image (1)](https://user-images.githubusercontent.com/102935156/182826105-130a0fd4-cfda-4b91-bb95-9da6d2a87106.png)


---

## 🛠 Tech & Platfrom

### **Front-end**
<p>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <br>
<img src="https://img.shields.io/badge/socket.io-ffffff?style=for-the-badge&logo=socket.io&logoColor=black">
<img src="https://img.shields.io/badge/CloudFront-D05C4B?style=for-the-badge&logo=Amazon AWS&logoColor=white">
<img src="https://img.shields.io/badge/Route53-4A154B?style=for-the-badge&logo=Amazon AWS&logoColor=white">
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

<br>
</p>

---

## 📘 주요 라이브러리

| 라이브러리    | 설명                                    |  
| ------------- | --------------------------------------- |
| ethers.js | 블록체인서버 통신|
| IPFS|분산형 파일 시스템에 데이터 저장 및 공유|
| redux-toolkit       | 전역 상태관리                             |
| socket.io         | 실시간 양방향 통신           |     
| axios    | API 통신                            |
| react-infinite-scroll-component   | lazy-loading(무한스크롤)        |
| react-modal|modal|

## 🔥이슈 및 트러블슈팅
<details>
<summary> AWS S3 배포 404에러</summary>
<div markdown="1">
<img src = "https://user-images.githubusercontent.com/102935156/183845307-a85f0932-cdc0-4662-a230-ed2620be3469.png">
<br/>
<b><p>🔴 문제분석</p></b>

 - 위의 사진처럼 React Router를 활용한 프로젝트를 배포했을 때 페이지를 찾을 수 없는 404에러 발생
 - 최초 메인페이지 index.html path="/"는 잘 렌더가 되지만 Anchor 태그를 사용해 페이지를 라우팅할 경우 404에러가 발생
 - useNavigate를 사용한 페이지 라우팅시 정상적으로 렌더링되는 것을 확인함

<b><p>🔴 원인분석</p></b>

1. Anchor 태그를 사용한 라우팅 처리시 해당 path경로에 맞는 파일이 새로고침 되어 다시 서버로부터 받아오는 것을 뜻함<br/>
→ 애초에 path의 경로가 "/"이 아닌 곳에 라우팅이 된다면 파일을 서버로 부터 못받는 것이 아닐까?

2. SPA방식의 React 프레임 워크로 개발한 해당 프로젝트는 CSR브라우저 렌더링을 함<br/>
→ CSR은 처음에 모든 파일을 받아오기 때문에 useNavigate 라우팅 처리는 정상적으로 동작하는 것이 아닐까?


<b><p>🔴 해결방안</p></b>
1. 모든 페이지 라우팅 처리를 useNavigate사용하거나 Anchor태그가 아닌 React 라우터를 이용하는 방법

2. S3 error 발생시 동일하게 build된 index.html을 렌더할 수 있도록하고, Cloudfront에서도 404오류 메세지를 200 ok로 수정하는 방법

<b><p>🔴 의사결정</p></b>
1. 첫번째 방법 채택시 페이지 라우팅시 새로고침이 되지 않아 로딩 속도가 빨라지고, 백엔드 서버에 데이터를 요청하는 횟수가 적어지지만 유저가 직접 url을 입력해 페이지 라우팅을 시도할 경우 404오류가 발생함

2. 두번째 방법 채택시 유저가 url을 입력해 페이지를 라우팅할 경우 404에러를 방지할 수 있으나 anchor태그 사용으로 서버에 잦은 데이터 요청을 보내기 때문에 서버에 부담이 됨

<b>※ 1,2번 방법 모두 채택하기로 결정

※ 서버의 부담을 줄이고 유저가 직접 url을 입력해 라우팅 할시 발생할 404오류를 처리할 수 있음</b>

</div>
</details>

## more info

<details>
<summary>API 명세서</summary>
<div markdown="1">
<img src ="https://user-images.githubusercontent.com/81402579/182878896-8bdbddc2-8244-48b7-b64a-3ea80a607cc2.png">
<img src = "https://user-images.githubusercontent.com/81402579/182878973-f3404687-e1e8-4602-8e73-8efcfe1a2ac4.png">
<img src = "https://user-images.githubusercontent.com/81402579/182879041-0c9fb569-e403-4b38-96cd-6bddb40c8ba9.png">
<img src = "https://user-images.githubusercontent.com/81402579/182879104-431ceec9-54e6-414a-843a-fc414f2288b9.png">
</div>
</details>
  
</div>



