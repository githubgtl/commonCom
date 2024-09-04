import React, {useState} from "react";

const FPS = function() {
    const [fps, setFPS] = useState(0)
    function calculateFPS(){
        let count = 0
        let currentTime = Date.now()
        function _calculate(){
            let lastTime = Date.now()
            count++ 
            if(lastTime - currentTime >= 1000){ // 每s计算一次
                setFPS(count)
                count = 0
                lastTime = currentTime
            }
            requestAnimationFrame(_calculate)
        }
        _calculate()
    }
    calculateFPS()
    return (<div>
        {fps}
    </div>)
}

export default FPS