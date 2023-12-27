# WonPrice
![Group_137](https://github.com/pearl-sea/seb45_main_003/assets/102569322/c5f733ed-9af9-49b8-9fc4-2315cfb7f7ad)


### 🗣️ 실시간 중고 경매 서비스
* 팀 명: 내 동년배들 다 코딩한다.
* 프로젝트 일정: 23-08-24 ~ 23-09-19
* 배포 주소: [wonprice.shop](https://wonprice.shop/)

---

###  🧑🏻‍🦳 WonPrice 멤버들
|FE (팀장)|FE|FE|BE|BE|BE (팀장)|
|:---:|:---:|:---:|:---:|:---:|:---:|
|<img src="https://github.com/codestates-seb/seb45_main_003/assets/105766506/07e1c4e1-ba37-4796-9a35-a0f5856670db" width="120" height="180"/>|<img src="https://github.com/codestates-seb/seb45_main_003/assets/105766506/fa24a999-b436-4284-85ef-65636dc4180f" width="120" height="180"/>|<img src="https://github.com/codestates-seb/seb45_main_003/assets/105766506/fe84f796-6fa9-435d-82ad-b7c4eb2f6229" width="120" height="180"/>|<img src="https://github.com/codestates-seb/seb45_main_003/assets/105766506/b97346d0-17d8-40aa-a59f-c1359944bc61" width="120" height="180"/>|<img src="https://github.com/codestates-seb/seb45_main_003/assets/105766506/c1a51383-e2d3-40f0-9e71-d0165ccf61f5" width="120" height="180"/>|<img src="https://github.com/codestates-seb/seb45_main_003/assets/105766506/b30905ac-7313-4b12-84ba-1e21a8a566d3" width="120" height="180"/>|
|허찬욱|박다해|박진주|서정욱|이지연|공대표|
|[sintobury](https://github.com/sintobury)|[eg1377](https://github.com/eg1377)|[pearl-sea](https://github.com/pearl-sea)|[Jung-seo](https://github.com/Jung-seo)|[Jeonni](https://github.com/Jeonni)|[C5ng](https://github.com/C5ng)|

### 프로젝트 설명
#### 프로젝트 소개
WonPrice는 사용자들 간의 거래 뿐만 아니라 경매도 진행할 수 있는 플랫폼입니다. 

이 플랫폼은 사용자들이 다양한 상품 및 서비스를 거래하고, 원하는 물건을 경매로 구매하거나 판매할 수 있는 온라인 플랫폼을 제공합니다.

#### 프로젝트 구상배경
프로젝트를 시작하기 전, 커머스 플랫폼을 개발하고자 했습니다. 

또한 플랫폼을 특별하게 만들기 위해 사용자들끼리 상호 작용할 수 있는 기능 중 하나인 사용자들이 실시간으로 상품을 경매하는 기능을 생각하였습니다. 

이러한 경매 기능은 사용자들에게 새로운 구매 경험을 제공하며 플랫폼이 더욱 흥미롭게 작용 될 수 있을 것이라 생각하여 시작하게 되었습니다.

#### 사용 기술 스택
##### React, Recoil, React-Query, TypeScript, React-hook-form, Styled component, Axios 

### 담당 파트
- 로그인, 회원가입, 마이페이지, 
- JWT 토큰을 통한 로그인 상태 관리
- 사용자와 관련된 이벤트발생시 생기는 알림을 폴링으로 가져오는 알림 컴포넌트
- 토큰 만료 확인을 위한 JWT 토큰 검증  커스텀 훅
- 사용자의 판매글 목록, 받은 후기글 목록, 참여중인 경매 현황 및 찜 목록 등 다양한 정보를 제공하는 마이페이지

### 발생했던 문제
찜 목록에서 불러온 찜목록의 현재 입찰가를 polling을 통해 불러오기 위해 refetch 주기를 30초로 설정했었는데 이 과정에서 체크박스의 연동이 원활하게 진행되지 않았습니다. 

결국 사용자가 한 화면에서 체크박스를 오래동안 사용하지 않을것이라는 의견을 통해 polling 후에는 체크박스가 모두 해제되게 구현하게 되었습니다.

리프레시 토큰을 통한 엑세스 토큰 재발급에서도 문제가 발생했었습니다. 

만약 리프레시 토큰도 만료가 된 경우에는 로그아웃을 시켰어야 했는데 이를 인터셉터에 넣기에는 컴포넌트 외부의 인터셉터코드에는 상태변경을 시도할 수 없었기 때문에 처리가 곤란했습니다.

이에 따로 토큰이 만료된 경우에 로그아웃을 시키는 커스텀 훅을 만들어 모든 페이지에서 항상 작동할 수 있도록 구현해 해결했습니다.

### 추가하고 싶었던 부분
한 페이지 내에서 토큰 재발급이 필요한 요청이 여러개인 경우 재발급 요청을 여러번 하게 되는 수정사항이 있었습니다. 

시간부족으로 인해 프로젝트 기간내에는 추가하지 못했지만 사용자가 불편함을 겪을 수 있는 부분이었던지라 고친 코드를 추가하고 싶었습니다.

개인적으로 요즘 웹에서 필수적이라고 생각하는 다크모드도 추가해 보고 싶었습니다. 

상태에 따라 CSS를 수정해야 하니 클래스를 추가하는 등의 방법으로 구현하면 될 것 같으나 이 또한 시간부족으로 구현하지 못했습니다.

로그인 파트를 맡은 만큼 소셜로그인 구현에도 관심은 있었으나 역시 시간부족으로 구현에는 실패해 다음에는 꼭 추가해보고 싶습니다. 



