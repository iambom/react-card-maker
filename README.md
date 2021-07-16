# React Card Maker

💻  <https://bomin-react-card-maker.netlify.app>


 ## 🛠 Skill & Tool
 **`HTML5`**  **`CSS3`**  **`Javascript`**  **`React.js`**  **`npm`** **`firebase`** **`cloudinary`** 
 
## 💡 기능
### Firebase Authentication을 이용한 로그인, 인증 유지 🔒
 - 구글과 깃허브 계정을 통한 로그인
 - 페이지 새로고침 시 로그인 되어 있는 경우 로그인 유지
 
### Firebase Realtime Database를 이용한 계정별 데이터 동기화 🔗
 

### 카드 아이템 Create, Read, Update, Delete 구현 📜
 - 링크 이동을 위한 react-router 사용
 - cloudinary를 이용한 이미지 업로드 구현
 
## 📖 프로젝트를 하며 배운 것
 - **Router로 페이지 이동 시 props를 넘겨줄 수 있다.**    
 버튼 클릭 시 history.push(pathname)을 통해 routing으로 이동하여 부모 자식의 간의 컴포넌트가 아니어도 props로 넘겨줄 수 있다.
 넘겨줄 때 함수형 컴포넌트의 경우 useHistory()를 사용해 history에 접근하여 props를 넘겨준다.
    ```
    const Login = ({authService}) => {
      const history = useHistory();
      const goToMaker = userId => {
          history.push({
              pathname: '/maker',
              state: {id: userId},
        })
    }
    ```
    ```
    const onLogin = (event) => {
        authService
            .login(event.currentTarget.textContent)
            .then(data => goToMaker(data.user.uid));
      }
    }
    ```
    넘겨 받은 props를 받을 때는 useLocation()을 사용하여 받는다. 여기서는 useHistory().location.state를 이용했지만 
    useLocation().state를 사용해도 같은 props를 받을 수 있다.
   ```
    const Maker = ({ FileInput, authService, cardRepository}) => {
      const historyState = useHistory().location.state;
      const [userId, setUserId] = useState(historyState && historyState.id);
    }
   ```
    ❓ 적용 계기    
    user를 식별하여 데이터 저장소를 만들기 위함이다. 로그인 했을 때 user별로 다른 데이터를 가지고 있어야 하기 때문.
    
 - **React에서 Form의 내용을 업데이트 할 때는 onChange를 사용한다.**                 
 
   ```
   const onChange = (event) => {
        if(event.currentTarget == null){
            return;
        }
        event.preventDefault();
        updateCard({
            ...card,
            [event.currentTarget.name]: event.currentTarget.value,
        })
    };
   ```
   ```
   return(
        <form className={styles.form}>
            <input ref={nameRef} type="text" name="name" value={name} onChange={onChange}/>
            <input ref={companyRef} type="text" name="company" value={company} onChange={onChange}/>
            <select ref={themeRef} name="theme" value={theme} onChange={onChange}>
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="colorful">colorful</option>
            </select>
            <textarea ref={messageRef} name="message" value={message} onChange={onChange} />
            <div className={styles.fileInput}>
              <ImageFileInput />  
            </div>
            <Button name="Delete" onClick={onSubmit}/>
        </form>
    )
   ```
        
     ❓ 적용 계기    
     value에 props만 넣었더니 아래처럼 에러 같은 경고가 떴음.    
      (value를 defaultValue로 바꾸면 경고는 사라지지만 defaultValue는 초기값을 지정할 때 쓰이는 속성으로, 
     주기적인 업데이트로 값을 업데이트 하는 경우에는 value를 써야 함.)     
     
     
     > You provided a value prop to a form field without an onChange handler. This will render a read-only field. If the field should be mutable use defaultValue. Otherwise, set either onChange or readOnly.
 
 - **자바스크립트의 Object를 이용하여 데이터를 관리한다.**    
   object를 배열의 index를 이용하는 것처럼 접근할 수 있다.    
   
   ```
   const person = {
      name : "kim",
      phone : "010-1111-1111"
    }

    person.phone = person['phone']
   ```
   
   따라서, Card state의 id를 card의 key로 이용하고, card 자체의 object를 value로 사용한다.
   ```
   // array
    const [cards, setCards] = useState([
        {
            id:'1',
            name:'Ellie',
            company:'samsung',
            theme:'dark',
            email:'ellie@gmail.com',
            message: 'go for it',
            fileName:'ellie',
            fileURL: null
        },
        {
            id:'2',
            name:'Jay',
   ```
   ```
    // object
    const [cards, setCards] = useState({
        '1' : {
            id:'1',
            name:'Ellie',
            company:'samsung',
            theme:'dark',
            email:'ellie@gmail.com',
            message: 'go for it',
            fileName:'ellie',
            fileURL: null
        },
        '2' : {
            id:'2',
            name:'Jay',
   ```
   Object로 바꾸면 더 이상 배열이 아니어서 map 함수 사용할 수 없다. 그래서 Cards state 안에 있는 모든 key를 받아와 각 key의 value인 object들을
   card의 prop으로 넘겨준다.     
   **Object.keys()** API를 이용해 key들을 배열로 받아올 수 있다.
   ```
   const Editor = ({cards, addCard, updateCard, deleteCard }) => (
    <section className={styles.editor}>
        <h1 className={styles.title}>Card Maker</h1>
        {
            Object.keys(cards).map(key => (
                <CardEditForm key={key} card={cards[key]} updateCard={updateCard} deleteCard={deleteCard}/>
            ))
        }
        <CardAddForm onAdd={addCard} />
    </section>
    );
   ```
   updated[card.id] = card; 는 card를 updated라는 object에 card.id의 속성값으로 card를 저장하게 된다. object안의 id가 123이었다면,     
   const card = {id: '123', name: 'kim' ... }인 데이터가 updated[card.id] = card 코드가 수행 됐을 때, updated 오브젝트에는 { 123: {id: '123', name: 'kim' ... }} 가 저장된다.
   
   ```
   const updateCard = card => {
        const updated = {...cards};
        updated[card.id] = card;
        setCards(updated);
   }
   ```
   
   
   ❓ 적용 계기    
   기존에는 card 데이터를 배열로 관리하고 있었는데, 배열에 데이터들이 순차적으로 들어있고 새로운 업데이트를 하기 위해 
   배열의 첫 번째 인덱스부터 동일한 아이디가 나올 때까지 순차적으로 조회 후 변경된 아이템만 업데이트 한다.    
    => 배열의 크기가 커지면 성능에 좋지 않음.    
         
         
   
 - **useState()에 콜백함수를 전달할 수도 있다.**    
    useState에 콜백함수를 전달하는 것 같이 사용하면 useState를 부르는 시점의 상태를 받아와서 업데이트 해주는 것과 같다.     
    updated[card.id] = card의 card.id가 기존에 Object에 없었다면 새 카드를 추가하는 코드가 된다.
    
    ```
    const updateCard = card => {
        setCards(cards => {
            const updated = {...cards};
            updated[card.id] = card;
            return updated;
        })
    }
    ```
    ❓ 적용 계기    
    state가 오래된 경우 동기적으로 업데이트가 불가할 수도 있다.
    