import React from 'react';
import { useState, useEffect } from 'react';

export default function Test() {
  // state
  const [data, setData] = useState([{}])

  useEffect(() => 
    {
    	fetch("/chartdata").then(
          response => response.json()
        ).then(
          data => {
            // 받아온 데이터를 data 변수에 update
            setData(data.members);
            console.log(data.members)
          }
        ).catch(
          (err) => console.log(err)
        )
    }, [])

  return (
    <div className='App'>
      <h1>test 하는 중...</h1>
      <div>
        {/* 삼항연산자 */}
        { (typeof data.users === 'undefined') ? (
          // fetch가 완료되지 않았을 경우에 대한 처리
          <p>loding...</p>
        ) : (
          data.members.map((u) => <p>{u.name}</p>)
        )}
      </div>
    </div>
  )
};