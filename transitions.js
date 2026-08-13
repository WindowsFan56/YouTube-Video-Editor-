(function(){
const S=window.EditorState;
const names=["Star Out.mp4","Star In.mp4","Puzzle Wipe Down.mp4","Puzzle Wipe Right.mp4","Heart Out.mp4","Rainbow Wipe horizontal.png","Rainbow Vertical.png","Circle In.mp4","Circle Out.mp4","2 Horizontal Blinds.mp4","2 Vertical Blinds.mp4","10x10 Checker Wipe.mp4","4x5 Checker Wipe.mp4","5 Vertical Blinds.mp4","5x8 Checker Wipe.mp4","6 Horizontal Blinds.mp4","4 Blinds.mp4","9 Vertical Blinds.mp4","16 Horizontal Blinds.mp4","Heart In.mp4","Checker Wipe 9x9.mp4","Clock Wipe.mp4","Diamond In.mp4","Diamond Out.mp4","Checker Wipe 9x6.mp4","13x3 Checker Wipe.mp4","7 Stripes Wipes.mp4","Checker Wipe 9x6 Vertical.mp4","6x3 Checker Wipe.mp4","7x4 Checker Wipe.mp4","Custom Checker Wipe #1.mp4","Custom Checker Wipe #2.mp4","Custom Checker Wipe #3.mp4","Custom Checker Wipe #5.mp4","Custom Checker Wipe #6.mp4","Wipe Close Door.mp4","Wipe Open Door.mp4","3 Stripes Wipes.mp4","15 Stripes Wipes.mp4","11 Stripes Wipes.mp4","16 Vertical Blinds.mp4","13 Vertical Blinds.mp4","2x2 Checker Wipe.mp4","Checker Wipe 2x2 Vertical.mp4","Checker Wipe 16x16.mp4","Checker Wipe 16x16 Vertical.mp4","5 Stripes Wipes.mp4","Fade Grid.mp4"];
const modal=document.getElementById('transitionModal'),grid=document.getElementById('transitionGrid'),q=document.getElementById('transitionSearch'),durationInput=document.getElementById('transitionDuration');
function selected(){return S.clips.find(x=>x.id===S.selectedClip)}
function maxDurationFor(c){
 const i=S.clips.indexOf(c); if(i<0||i>=S.clips.length-1)return 0;
 const next=S.clips[i+1];
 const a=Math.max(.1,(c.end||c.duration||5)-(c.start||0));
 const b=Math.max(.1,(next.end||next.duration||5)-(next.start||0));
 return Math.max(.1,Math.min(10,a/2,b/2));
}
function clampDuration(value,c){
 const max=maxDurationFor(c); if(!max)return 0;
 return Math.max(.1,Math.min(max,+value||1));
}
function syncControls(){
 const c=selected(), t=c&&S.transitionFor[c.id];
 durationInput.value=t?clampDuration(t.duration||1,c).toFixed(1):'1.0';
 durationInput.disabled=!t;
 document.getElementById('clearTransition').disabled=!t;
 document.getElementById('previewTransition').disabled=!t;
}
function render(filter=''){
 const filtered=names.filter(n=>n.toLowerCase().includes(filter.toLowerCase()));
 grid.innerHTML=filtered.map(n=>`<button class="transition" data-name="${n}"><div class="transition-preview"><span class="preview-label">TRANSITION</span></div><div class="transition-name">${n}</div></button>`).join('');
 syncControls();
}
function open(){render();modal.classList.add('show')}
window.openTransitions=open;
window.openTransitionManager=open;
grid.addEventListener('click',e=>{
 const b=e.target.closest('.transition');if(!b)return;
 const c=selected(); if(!c)return;
 const max=maxDurationFor(c);
 if(!max){alert('Select a clip that has another clip after it. A transition is placed between two clips.');return;}
 const d=clampDuration(durationInput.value||1,c);
 S.transitionFor[c.id]={name:b.dataset.name,source:'transitions/assets/'+b.dataset.name,duration:d,enabled:true};
 durationInput.value=d.toFixed(1); window.renderTimeline(); syncControls();
});
q.addEventListener('input',e=>render(e.target.value));
durationInput.addEventListener('change',()=>{
 const c=selected(),t=c&&S.transitionFor[c.id];if(!t)return;t.duration=clampDuration(durationInput.value,c);durationInput.value=t.duration.toFixed(1);window.renderTimeline();
});
document.getElementById('clearTransition').onclick=()=>{const c=selected();if(!c)return;delete S.transitionFor[c.id];window.renderTimeline();syncControls()};
document.getElementById('previewTransition').onclick=()=>{
 const c=selected(),t=c&&S.transitionFor[c.id]; if(!c||!t)return;
 const i=S.clips.indexOf(c),next=S.clips[i+1];
 if(!next){alert('No following clip to preview the transition with.');return}
 window.previewTransitionEffect(t,c,next);
};
document.getElementById('closeTransition').onclick=()=>modal.classList.remove('show');
document.getElementById('transitionManagerBtn').onclick=open;
})();
