import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
// 다음에 오면 https://copycoding.tistory.com/275 참고해서 db 연결 후 리액트 연동 해보기
class App extends Component {

  id = 3 // 이미 0,1,2가 존재함으로 3으로 설정
  
  state = {
      input : '',
      todos :[
        {id:0 ,text : '리액트 소개' , checked : false},
        {id:1 ,text : '리액트 소개' , checked : true},
        {id:2 ,text : '리액트 소개' , checked : false}
    ]
  }

  handleChange = (e) => {
      this.setState({
          input : e.target.value // input의 다음 바뀔 값
      })
  }

  handleCreate = () => {
    const{input, todos} = this.state;
    this.setState({
        input : '',
        todos : todos.concat({
            id : this.id++,
            text : input,
            checked : false
        })
    });
  }
  
  handleKeyPress = (e) => {
      // 눌려진 키가 Enter면 handleCreate 호출
      if(e.key === 'Enter'){
          this.handleCreate();
      }
  }

  // 데이터가 선택 되는지 않되는지 확인 
  handleToggle = (id) => {
      const {todos} = this.state;

      // 파라미터로 받은 id를 가지고 몇번째 아이템인지 찾습니다.
      const index = todos.findIndex(todo => todo.id === id);
      const selected = todos[index]; // 선택한 객체 
      const nextTodos = [...todos];  // 배열을 복사
      
      // 기존의 값들을 복사하고, checked 값을 덮어쓰기
      nextTodos[index] = {
          ...selected,
          checked : !selected.checked
      };

      this.setState({
          todos: nextTodos
      });
  }
  handleRemove = (id) => {
      const {todos} = this.state;
      this.setState({
          todos : todos.filter(todo => todo.id !== id)
      });
  }
  render() {
    const{input ,todos} = this.state;
    const{
        handleChange,
        handleCreate,
        handleKeyPress,
        handleToggle,
        handleRemove
    } = this;

    return (
      <TodoListTemplate form={(
        <Form
        value={input}
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        onCreate={handleCreate}
        />
        )}>
          <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
      </TodoListTemplate>
    );
  }
}

export default App;