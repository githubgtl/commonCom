import React, {useState} from 'react';
import './index.css'
const Draggle = function({ children }){
    const [position, setPosition] = useState({ x: 0, y: 0 }); // 表示拖拽元素的坐标
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 }); // 鼠标相对于拖拽组件的初始位置偏移量
    function handleMouseDown(e){
        // 按下的时候可以拖动
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        })
    }
    function handleMouseMove(e){
        // 移动的时候判断能否拖拽
        requestAnimationFrame(() => {
            // 更新位置
            if(isDragging){
                setPosition({
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y
                })
            }
        });
        
    }
    function handleMouseUp(){
        setIsDragging(false)
    }
    return (<div
        className='move'
        style={{top: position.y + 'px', left: position.x + 'px'}}
        onMouseDown={handleMouseDown} // 鼠标按下的时候
        onMouseMove={handleMouseMove} // 鼠标移动
        onMouseUp={handleMouseUp} // 鼠标松开
        onMouseLeave={handleMouseUp} // 当鼠标离开时停止拖动
        >
            {children}
    </div>)
}

export default Draggle