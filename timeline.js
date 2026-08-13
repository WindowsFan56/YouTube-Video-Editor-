(function(){
const S=window.EditorState, track=document.getElementById('clipTrack'), timeline=document.getElementById('timeline'), playhead=document.getElementById('playhead');
let dragging=null, dragIndex=-1;
function fmt(t){t=Math.max(0,Math.round(t));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0')}
function clipWidth(c){return Math.max(90,(Math.max(.5,(c.end||c.duration||5)-(c.start||0))*S.zoom*.55))}
function recalc(){S.duration=S.clips.reduce((n,c)=>n+Math.max(.5,(c.end||c.duration||5)-(c.start||0)),0);document.getElementById('clock').textContent=fmt(S.currentTime)+' / '+fmt(S.duration)}
function renderRuler(){const r=document.getElementById('ruler');r.innerHTML='';const w=Math.max(1000,S.duration*S.zoom*.55);r.style.width=w+'px';for(let i=0;i<=Math.ceil(S.duration);i+=10){const s=document.createElement('span');s.style.left=(i*S.zoom*.55)+'px';s.textContent=fmt(i);r.appendChild(s)}}
function render(){
  track.innerHTML=''; let pos=0;
  S.clips.forEach((c,i)=>{
    const d=Math.max(.5,(c.end||c.duration||5)-(c.start||0));const el=document.createElement('div');el.className='clip'+(S.selectedClip===c.id?' selected':'');el.style.width=clipWidth(c)+'px';el.draggable=true;el.dataset.index=i;
    el.innerHTML=`<span class="clip-label">${c.name}</span><span class="clip-duration">${fmt(d)}</span>`+(S.transitionFor[c.id]?`<span class="transition-badge" title="${S.transitionFor[c.id].name}">↗ ${Number(S.transitionFor[c.id].duration||1).toFixed(1)}s</span>`:'');
    el.addEventListener('click',()=>{S.selectedClip=c.id;render()});
    el.addEventListener('dragstart',()=>{dragging=c;dragIndex=i;el.classList.add('dragging')});
    el.addEventListener('dragend',()=>{dragging=null;dragIndex=-1;el.classList.remove('dragging')});
    el.addEventListener('dragover',e=>e.preventDefault());
    el.addEventListener('drop',e=>{e.preventDefault();if(!dragging||dragging===c)return;const from=S.clips.indexOf(dragging),to=S.clips.indexOf(c);S.clips.splice(from,1);S.clips.splice(to,0,dragging);S.selectedClip=dragging.id;render()});
    track.appendChild(el);pos+=d;
  });
  renderRuler(); recalc();
}
function selected(){return S.clips.find(c=>c.id===S.selectedClip)}
function trim(which){
  const c=selected();if(!c)return;
  const p=S.currentTime;
  if(which==='left' && p>c.start)c.start=Math.min(p,c.end||c.duration);
  if(which==='right' && p>(c.start||0))c.end=Math.max(p,c.start+.2);
  render();
}
window.splitSelected=()=>{
  const c=selected();if(!c)return;const p=S.currentTime;if(p<=c.start+.1||p>=(c.end||c.duration)-.1)return;
  const copy={...c,id:c.id+'b',name:c.name+' (split)',start:p,end:c.end||c.duration};c.end=p;S.clips.splice(S.clips.indexOf(c)+1,0,copy);S.selectedClip=copy.id;render();
};
window.trimLeft=()=>trim('left');window.trimRight=()=>trim('right');window.renderTimeline=render;
playhead.addEventListener('mousedown',()=>playhead.dataset.drag='1');document.addEventListener('mouseup',()=>delete playhead.dataset.drag);
timeline.addEventListener('mousemove',e=>{if(playhead.dataset.drag!=='1')return;const r=timeline.getBoundingClientRect(),x=Math.max(0,e.clientX-r.left+timeline.scrollLeft-35),t=x/(S.zoom*.55);S.currentTime=Math.min(S.duration,t);playhead.style.left=x+'px';document.getElementById('clock').textContent=fmt(S.currentTime)+' / '+fmt(S.duration)});
window.setPlayhead=t=>{S.currentTime=Math.max(0,Math.min(S.duration,t));playhead.style.left=(S.currentTime*S.zoom*.55)+'px';document.getElementById('clock').textContent=fmt(S.currentTime)+' / '+fmt(S.duration)};
window.setZoom=z=>{S.zoom=z;render()};
render();
})();