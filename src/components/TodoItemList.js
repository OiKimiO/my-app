import React,{Component} from 'react';
import TodoItem from './TodoItem';
// todos : todo 객체들이 들어있는 배열
// onToggle : 체크박스를 키고 끄는 함수
// onRemove : 아이템을 삭제시키는 함수
// class형 컴포넌트를 만드는 이유 ? 
// 이후에 컴포넌트 성능을 최적화 시킬수 있기 때문
class TodoItemList extends Component {

    shouldComponentUpdate(nextProps,nextState){
        return this.props.todos !== nextProps.todos;
    }

    render() {
        const{todos, onToggle, onRemove} = this.props;
        const todoList = todos.map(
            ({id, text, checked}) => (
                <TodoItem 
                    id={id}
                    text={text}
                    checked={checked}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id}
                />
            )
        );
        return(
            <div>
               {todoList}
            </div>
        );
    }
}

export default TodoItemList;