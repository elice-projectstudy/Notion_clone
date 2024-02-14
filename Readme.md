#### 🌱 노션(notion)

#### 🌱 기간

2024.02.04 ~ 2024.02.12

#### 🌱 요구사항

문서 생성/수정/삭제
토글버튼/트리 구조

#### 🌱 파일 기능 소개

newList.js
- '+ 페이지 추가'버튼 클릭: 새 페이지 생성

subList.js
- 리스트의 '+'버튼 클릭: 해당 리스트의 하위페이지 생성

toggle.js
- 리스트의 '>'버튼 클릭: 해당 리스트의 하위페이지 숨김

Delete.js
- 리스트의 '-'버튼 클릭: 해당 리스트와 하위페이지 삭제

loadList.js
- 웹 페이지가 로드될 때 localStorage에 저장된 데이터의 리스트 생성
- 시작페이지 설정

saveData.js
- 리스트 제목 클릭: 해당 리스트의 페이지 로드
- title과 content input에 keyup 이벤트 발생: 리스트 제목 변경, localStorage에 데이터 저장 및 수정

#### 🌱 참고

https://velog.io/@gene028/notion-clone
https://github.com/sonsurim/surim-notion
https://ghost4551.tistory.com/144
