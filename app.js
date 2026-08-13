(function(){
const S=window.EditorState, video=document.getElementById('previewVideo'), transitionVideo=document.getElementById('transitionVideo'), fallback=document.getElementById('transitionFallback'), clock=document.getElementById('clock');
const mediaInput=document.getElementById('mediaInput'), audioTrack=document.getElementById('audioTrack');
function selected(){return S.clips.find(c=>c.id===S.selectedClip)}
function playSelected(){
 const c=selected();if(!c||c.type!=='video')return;
 transitionVideo.pause();transitionVideo.removeAttribute('src');transitionVideo.style.display='none';fallback.className='transition-fallback';
 video.src=c.src;video.currentTime=Math.max(0,c.start||0);video.play();
}
function showTransition(t){
 if(!t)return;
 transitionVideo.src=t.source;transitionVideo.currentTime=0;transitionVideo.style.display='block';
 transitionVideo.play().catch(()=>{fallback.className='transition-fallback active';fallback.dataset.transition=(t.name||'Transition').replace(/\.mp4|\.png/ig,'');});
}
window.previewTransitionEffect=(t,c,next)=>{
 if(!c||!next)return;
 video.pause();transitionVideo.pause();transitionVideo.style.display='none';fallback.className='transition-fallback active';fallback.dataset.transition=(t.name||'Transition').replace(/\.mp4|\.png/ig,'');
 setTimeout(()=>{fallback.className='transition-fallback';playSelected();},Math.max(600,Number(t.duration||1)*1000));
};
document.getElementById('playBtn').onclick=()=>{if(video.paused)playSelected();else video.pause()};
document.getElementById('muteBtn').onclick=()=>video.muted=!video.muted;
video.ontimeupdate=()=>{const c=selected();if(!c)return;const t=video.currentTime;const end=c.end||c.duration||video.duration||0;const tr=S.transitionFor[c.id];
 if(tr&&end&&t>=end-Math.min(Number(tr.duration||1),Math.max(.1,end-(c.start||0)))){showTransition(tr)}
 if(end&&t>=end){video.pause();video.currentTime=end}
 window.setPlayhead((S.clips.slice(0,S.clips.indexOf(c)).reduce((n,x)=>n+((x.end||x.duration||5)-(x.start||0)),0))+(t-(c.start||0)))};
video.onloadedmetadata=()=>{const c=selected();if(c&&(!c.duration||c.duration===0))c.duration=video.duration;window.renderTimeline()};
document.getElementById('scrubber').oninput=e=>{window.setPlayhead((e.target.value/1000)*S.duration);playSelected()};
document.getElementById('trimLeft').onclick=window.trimLeft;document.getElementById('trimRight').onclick=window.trimRight;document.getElementById('splitBtn').onclick=window.splitSelected;
document.getElementById('deleteBtn').onclick=()=>{if(S.selectedClip){S.clips=S.clips.filter(c=>c.id!==S.selectedClip);delete S.transitionFor[S.selectedClip];S.selectedClip=null;window.renderTimeline()}};
document.getElementById('transitionBtn').onclick=window.openTransitions;
document.getElementById('zoom').oninput=e=>window.setZoom(+e.target.value);
document.getElementById('zoomIn').onclick=()=>{const z=Math.min(180,S.zoom+10);document.getElementById('zoom').value=z;window.setZoom(z)};
document.getElementById('zoomOut').onclick=()=>{const z=Math.max(50,S.zoom-10);document.getElementById('zoom').value=z;window.setZoom(z)};
document.querySelectorAll('.tool').forEach(t=>t.onclick=()=>{
 document.querySelectorAll('.tool').forEach(x=>x.classList.remove('active'));t.classList.add('active');
 const p=t.dataset.panel;
 if(p==='media'){window.renderMediaPanel()}
 else if(p==='transitions'){window.openTransitions()}
 else if(p==='photos'){mediaInput.setAttribute('accept','image/*');mediaInput.click();mediaInput.setAttribute('accept','video/*,image/*')}
 else if(p==='audio'){document.getElementById('audioInput').click()}
 else if(p==='text'){document.getElementById('textModal').classList.add('show')}
 else if(p==='effects'){document.getElementById('panelContent').innerHTML='<div class="panel-note"><b>Enhancements</b><br>Use the classic editor controls below the timeline to trim, split, and arrange clips.</div>'}
 else document.getElementById('panelContent').innerHTML='<div class="panel-note"><b>2015 YouTube Video Editor Recreation</b><br>Drag media into the timeline, select a clip, then use the edit controls.</div>'
});
document.getElementById('closeText').onclick=()=>document.getElementById('textModal').classList.remove('show');
document.getElementById('insertText').onclick=()=>{
 const c=selected();const value=document.getElementById('textValue').value;const size=+document.getElementById('textSize').value;
 if(!c)return;S.texts.push({id:'t'+Date.now(),text:value,size,clipId:c.id});document.getElementById('textModal').classList.remove('show');
 const ov=document.getElementById('titleOverlay');ov.textContent=value;ov.style.fontSize=size+'px';ov.style.display='block';
};
document.getElementById('createBtn').onclick=()=>alert('Create video: this recreation keeps the classic 2015 editor workflow locally in your browser.');
document.getElementById('timeline').addEventListener('dblclick',()=>document.getElementById('mediaInput').click());
document.addEventListener('dragover',e=>e.preventDefault());
document.addEventListener('drop',e=>{
 e.preventDefault();const files=[...e.dataTransfer.files];files.filter(f=>f.type.startsWith('video/')||f.type.startsWith('image/')).forEach(f=>{const dt=new DataTransfer();dt.items.add(f);mediaInput.files=dt.files;mediaInput.dispatchEvent(new Event('change'))});
});
})();