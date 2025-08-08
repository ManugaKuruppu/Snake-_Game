import React from "react";

const Instructions = ({ level }) => (
  <div className="instructions" style={{marginTop: 24}}>
    <div style={{fontWeight:600, fontSize:'17px', marginBottom:'6px', color:'#222'}}>How to Play</div>
    <ul style={{textAlign:'left', margin:'0 auto', maxWidth:'320px', padding:'0 0 0 18px', fontSize:'15px', color:'#333', lineHeight:'1.7'}}>
      <li><b>Move:</b> Use <span style={{color:'#6366f1'}}>Arrow Keys</span> on your keyboard.</li>
      <li><b>Pause:</b> Press <span style={{color:'#6366f1'}}>P</span> to pause or resume the game.</li>
      <li><b>Eat Food:</b> Guide the snake to the <span style={{color:'#4caf50'}}>green squares</span> to grow and earn points.</li>
      <li><b>Avoid:</b> Don’t hit the <span style={{color:'#e53e3e'}}>red obstacles</span>, the wall, or your own body.</li>
      <li><b>Level Up:</b> Reach <span style={{color:'#6366f1'}}>{level * 50} points</span> to advance to the next level.</li>
    </ul>
  </div>
);

export default Instructions;
