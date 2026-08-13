(function(){
const S=window.EditorState;const input=document.getElementById('projectInput');
function serial(){return {version:2,projectName:document.getElementById('projectName').value,clips:S.clips.map(({src,...x})=>x),audio:S.audio.map(({src,...x})=>x),texts:S.texts,transitionFor:S.transitionFor,zoom:S.zoom}}
window.saveProject=()=>{const blob=new Blob([JSON.stringify(serial(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=(document.getElementById('projectName').value||'project')+'.json';a.click();document.getElementById('saveState').textContent='Saved.'};
document.getElementById('saveBtn').onclick=window.saveProject;document.getElementById('loadBtn').onclick=()=>input.click();
input.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const p=JSON.parse(r.result);S.clips=p.clips||[];S.audio=p.audio||[];S.texts=p.texts||[];S.transitionFor=p.transitionFor||{};S.zoom=p.zoom||100;document.getElementById('projectName').value=p.projectName||'My Edited Video';window.renderTimeline()};r.readAsText(f)};
document.getElementById('newBtn').onclick=()=>{if(confirm('Start a new project?')){S.clips=[];S.audio=[];S.texts=[];S.transitionFor={};S.selectedClip=null;window.renderTimeline()}};
})();