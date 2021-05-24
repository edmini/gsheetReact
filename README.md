## googlesheetsapis 와 node js 를 이용한 사이트 만들기

1. 참고 사이트
   1. https://developers.google.com/sheets/api/quickstart/nodejs
   2. https://www.youtube.com/playlist?list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz
   3. https://www.youtube.com/watch?v=MiPpQzW_ya0&t=2236s
   4. https://www.code-sample.com/2019/11/react-table-add-edit-delete-link-column.html
2. 설치 패키지
   1. react
   2. axios
   3. googleapis
   4. react-table
   5. semantic-ui-react
   6. cors - node server
   7. express - node server
3. node server
   1. console.cloud.google.com 에서 프로젝트 생성
   2. 프로젝트에서 google 로그인 키 생성
      1. API탐색 및 사용 설정
      2. API 및 서비스 사용 설정
      3. Google Sheets API - 사용
      4. CREDENTIAlS 생성
      5. Google Sheets API -> Web Server -> Application Data  등등
      6. Service account name 적당히 생성
      7. 사용자 인증 정보 -> +사용자 인정 정보 만들기
      8. 사용할 google sheet에서 공유 > 생성된 서비스 이메일 계정을 넣고 공유하기 (편집자 권한)
   3. 적당한 라우터 페이지 생성
      1. express와 router 생성
      2. const { google } = require('googleapis')
      3. const keys = require('2번에서 생성 후 다운로드한 키 json 파일로드')
      4. const connect = new google.auth.JWT(keys.client_email, null, key.private_key, [scope])
         1. scope 'https://www.googleapis.com/auth/spreadsheets' read, write 권한가짐
      5. sheets v4 에 연결
      6. get 메서드의 옵션 지정
         1. spreadsheetId : 사용할 sheet 주소의 id 부분
         2. range : 해당 sheet 의 sheetName!A1:A10 등등
         3. majorDimension : ROWS 인 경우 A1,B1,C1 순서 배열로, COLUMNS 인 경우 A1,A2,A3 순서
         4. 가져온 배열을 json 오브젝트 배열로 생성
      7. append 메서드 옵션 지정 post요청
         1. req.body 를 new Array(req.body) 로 배열로 생성
         2. spreadsheetId 위 와 동일
         3. range : 해당 시트명만 표기 sheetName 등
         4. resource : { values : req.body의 생성된 배열 }
         5. auth : connect

