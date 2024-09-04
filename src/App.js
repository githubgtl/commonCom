// import logo from './logo.svg';
import './App.css';
import Draggle from './componont/Draggle/index';
import FPS from './componont/computedFPS/index';
import LazyLoading from './componont/LazyLoading';
import { useEffect, useState, useRef } from 'react';
function App() {
  const imgRefs = useRef([]);
    const handleCallback = (element) => {
        if (element) {
            element.src = element.dataset.src;
        }
    };
  return (
    <div className="App">
     <Draggle>
      <div style={{width: '100px', height: '100px'}}>
        
      </div>
     </Draggle>
    <FPS></FPS>
    {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} style={{ height: "500px", backgroundColor: 'red' }}>
                    <img
                        ref={el => imgRefs.current[index] = el} // 使用 ref
                        src="1" 
                        data-src={`https://picsum.photos/200/200?random=${index + 1}`} 
                    />
                </div>
            ))}
            <LazyLoading elements={imgRefs.current} callback={handleCallback} />
    </div>
  );
}

export default App;
