import React, { useState, useEffect, useRef } from 'react';

const listOrigin = [
  {
    action: 'drink',
    complete: false
  }, {
    action: 'eat',
    complete: true
  }
]

const TodoList = () => {

  const [list, setList] = useState(listOrigin)
  const [num, setNum] = useState(0)

  const [updateTime, setUpdateTime] = useState(null)

  const myRef = useRef()

  useEffect(()=>{
    setUpdateTime(new Date().toLocaleString())
    console.log('----- TodoItem update -----')
    return () => {
      console.log('----- TodoItem destory -----')
    }
  }, [list, num])

  // addItem
  const addItem = () => {
    if(!myRef.current.value || list.find((e) => { return e.action === myRef.current.value })) {
      alert('请输入内容或内容重复')
      return
    }
    const newList = [...list, {action: myRef.current.value}]
    setList(() => {
      console.log(newList, list)
      return newList
    })
    myRef.current.value = ''
  }

  // deleteItem
  const deleteItem = (index) => {
    const newList = [...list]
    newList.splice(index, 1)
    setList(newList)
  }

  // updateItem
  const updateItem = (index) => {
    const newList = [...list]
    newList[index]['complete'] = !newList[index]['complete']
    setList(newList)
  }

  // addNum
  const addNum = () => {
    let newNum = num
    setNum(++newNum)
  }

  return (
    <div>
      <div>updateTime: {updateTime}</div>
      <br />
      
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <input type="text" ref={myRef}/>
        <button onClick={addItem}>ADD</button>
      </div>
      <br />

      {
        list.map((item, index) => {
          return <TodoItem item={item} key={index} index={index} deleteItem={deleteItem} updateItem={updateItem}></TodoItem>
        })
      }
      <br />
      <br />
      
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>{num}</div>
        <button onClick={()=>{addNum()}}>addNum</button>
      </div>
    </div>
  );
}

// TodoItem
const TodoItem = ({item, index, deleteItem, updateItem}) => {

  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{color: item.complete?'green':'red'}}>{item.action}</div>
      <button onClick={()=>{updateItem(index)}}>{item.complete?'completed':'uncompleted'}</button>
      <button onClick={()=>{deleteItem(index)}}>DELETE</button>
    </div>
  )
}

export default TodoList;
