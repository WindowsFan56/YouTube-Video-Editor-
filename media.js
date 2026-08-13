(function(){
const S=window.EditorState, store=window.MediaStore;
const mediaInput=document.getElementById('mediaInput'), audioInput=document.getElementById('audioInput');
const panel=document.getElementById('panelContent'), search=document.getElementById('assetSearch');

const cc=[['Water flowing fro…','0:40'],['Beach rocks at du…','1:14'],['Cityscape at dusk','0:30'],['Large fountain','0:17'],['Paddle boat on lake','0:07'],['Purple flowers','0:35'],['Public transport…','0:28'],['San Francisco To…','0:21']];
function renderCC(filter=''){
  const a=cc.filter(x=>x[0].toLowerCase().includes(filter.toLowerCase()));
  panel.innerHTML='<div class="panel-note"><b>Remix Creative Commons videos</b><br>Search for Creative Commons licensed videos above or check out one of the example videos below.<br><span class="learn">Learn more »</span></div><div class="asset-grid">'+a.map((x,i)=>`<div class="asset" draggable="true" data-cc="${i}"><div class="thumb"></div><span class="dur">${x[1]}</span><span class="caption">${x[0]}</span></div>`).join('')+'</div>';
  panel.querySelectorAll('.asset').forEach(el=>el.addEventListener('dragstart',e=>e.dataTransfer.setData('text/cc',el.dataset.cc)));
}
function addMedia(file){
  const id='m'+Date.now()+Math.random(); const url=URL.createObjectURL(file); store.set(id,{file,url});
  const isImage=file.type.startsWith('image/');
  S.clips.push({id,name:file.name,type:isImage?'image':'video',src:url,duration:isImage?5:0,start:0,end:0});
  window.renderTimeline();
}
mediaInput.addEventListener('change',e=>[...e.target.files].forEach(addMedia));
audioInput.addEventListener('change',e=>[...e.target.files].forEach(file=>{
  const id='a'+Date.now()+Math.random(),url=URL.createObjectURL(file);store.set(id,{file,url});
  S.audio.push({id,name:file.name,src:url,duration:0,start:0,end:0});window.renderTimeline();
}));
search.addEventListener('input',e=>renderCC(e.target.value));
window.openMediaPicker=()=>mediaInput.click(); window.openAudioPicker=()=>audioInput.click();
window.renderMediaPanel=renderCC; renderCC();
document.querySelector('.asset-panel').addEventListener('dragover',e=>e.preventDefault());
document.querySelector('.asset-panel').addEventListener('drop',e=>{e.preventDefault()});
})();