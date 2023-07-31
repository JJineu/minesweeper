# Minesweeper
- 지뢰 찾기 웹 게임입니다.


## 프로젝트 실행
```
yarn install
yarn start
```

## 프로젝트 구조 및 기술 스택
- React18 cra, Redux(RTK), TypeScript 를 사용했습니다.
- 게임 상태를 Redux 라이브러리를 통해 전역으로 관리할 수 있도록 설계했습니다. 

```
    "@reduxjs/toolkit": "^1.9.5",
    "@types/node": "^16.7.13",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.1",
    "react-scripts": "5.0.1",
    "typescript": "^4.4.2",
    "web-vitals": "^2.1.0"
```

## 게임 동작 및 상세 내용
- 게임 난이도 변경이 가능하며, 난이도 커스텀 기능이 있습니다.
- 셀을 클릭하면 게임이 시작되며, 첫 번째 셀은 지뢰가 아닙니다.
- DFS 알고리즘을 활용하여 지뢰를 탐색합니다.
- 우클릭 시 깃발을 표시할 수 있습니다.