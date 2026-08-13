const panelContent = document.getElementById('panelContent');
const assetSearch = document.getElementById('assetSearch');
const modal = document.getElementById('transitionModal');
const transitionGrid = document.getElementById('transitionGrid');

const assets = [
  ['Water flowing fro…','0:40'],['Beach rocks at du…','1:14'],['Cityscape at dusk','0:30'],['Large fountain','0:17'],
  ['Paddle boat on lake','0:07'],['Purple flowers','0:35'],['Public transport…','0:28'],['San Francisco To…','0:21']
];

function renderMedia(filter=''){
  const f = filter.toLowerCase();
  const shown = assets.filter(a => a[0].toLowerCase().includes(f));
  panelContent.innerHTML = `
    <div class="panel-note"><b>Remix Creative Commons videos</b><br>
      Search for Creative Commons licensed videos above or check out one of the example videos below.<br>
      <span class="learn">Learn more »</span>
    </div>
    <div class="asset-grid">${shown.map((a,i)=>`
      <div class="asset" draggable="true">
        <div class="thumb"></div><span class="dur">${a[1]}</span><span class="caption">${a[0]}</span>
      </div>`).join('')}</div>`;
}
renderMedia();

assetSearch.addEventListener('input', e => renderMedia(e.target.value));

const transitions = [
  ['Star Out.mp4', 't-star'],
  ['Star In.mp4', 't-star'],
  ['Puzzle Wipe Down.mp4', 't-wipe'],
  ['Puzzle Wipe Right.mp4', 't-wipe'],
  ['Heart Out.mp4', 't-star'],
  ['Rainbow Wipe horizontal.png', 't-cross'],
  ['Rainbow Vertical.png', 't-cross'],
  ['Circle In.mp4', 't-circle'],
  ['Circle Out.mp4', 't-circle'],
  ['2 Horizontal Blinds.mp4', 't-blinds'],
  ['2 Vertical Blinds.mp4', 't-blinds'],
  ['10x10 Checker Wipe.mp4', 't-pixel'],
  ['4x5 Checker Wipe.mp4', 't-pixel'],
  ['5 Vertical Blinds.mp4', 't-blinds'],
  ['5x8 Checker Wipe.mp4', 't-pixel'],
  ['6 Horizontal Blinds.mp4', 't-blinds'],
  ['4 Blinds.mp4', 't-blinds'],
  ['9 Vertical Blinds.mp4', 't-blinds'],
  ['16 Horizontal Blinds.mp4', 't-blinds'],
  ['Heart In.mp4', 't-star'],
  ['Checker Wipe 9x9.mp4', 't-pixel'],
  ['Clock Wipe.mp4', 't-circle'],
  ['Diamond In.mp4', 't-diamond'],
  ['Diamond Out.mp4', 't-diamond'],
  ['Checker Wipe 9x6.mp4', 't-pixel'],
  ['13x3 Checker Wipe.mp4', 't-pixel'],
  ['7 Stripes Wipes.mp4', 't-wipe'],
  ['Checker Wipe 9x6 Vertical.mp4', 't-pixel'],
  ['6x3 Checker Wipe.mp4', 't-pixel'],
  ['7x4 Checker Wipe.mp4', 't-pixel'],
  ['Custom Checker Wipe #1.mp4', 't-pixel'],
  ['Custom Checker Wipe #2.mp4', 't-pixel'],
  ['Custom Checker Wipe #3.mp4', 't-pixel'],
  ['Custom Checker Wipe #5.mp4', 't-pixel'],
  ['Custom Checker Wipe #6.mp4', 't-wipe'],
  ['Wipe Close Door.mp4', 't-wipe'],
  ['Wipe Open Door.mp4', 't-wipe'],
  ['3 Stripes Wipes.mp4', 't-wipe'],
  ['15 Stripes Wipes.mp4', 't-wipe'],
  ['11 Stripes Wipes.mp4', 't-wipe'],
  ['16 Vertical Blinds.mp4', 't-blinds'],
  ['13 Vertical Blinds.mp4', 't-blinds'],
  ['2x2 Checker Wipe.mp4', 't-pixel'],
  ['Checker Wipe 2x2 Vertical.mp4', 't-pixel'],
  ['Checker Wipe 16x16.mp4', 't-pixel'],
  ['Checker Wipe 16x16 Vertical.mp4', 't-pixel'],
  ['5 Stripes Wipes.mp4', 't-wipe'],
  ['Fade Grid.mp4', 't-pixel']
];

function renderTransitions(){
  transitionGrid.innerHTML = transitions.map(([name,cls])=>`
    <button class="transition ${cls}" data-name="${name}" title="Source: transitions/OYTVE_Transitions_Original.rar">
      <div class="transition-preview"></div><div class="transition-name">${name}</div>
    </button>`).join('');
}
renderTransitions();

document.querySelectorAll('.tool').forEach((tool, index) => {
  tool.addEventListener('click', () => {
    document.querySelectorAll('.tool').forEach(t=>t.classList.remove('active'));
    tool.classList.add('active');
    const panel = tool.dataset.panel;
    if(panel === 'transitions'){
      modal.classList.add('show');
    } else if(panel === 'audio'){
      panelContent.innerHTML = '<div class="panel-note"><b>Audio Library</b><br>Drag an audio track to the timeline.</div>';
    } else if(panel === 'photos'){
      panelContent.innerHTML = '<div class="panel-note"><b>Photos</b><br>Add photos to your project from your library.</div>';
    } else {
      renderMedia();
    }
  });
});

document.getElementById('closeModal').onclick = () => modal.classList.remove('show');
modal.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('show'); });
transitionGrid.addEventListener('click', e => {
  const item = e.target.closest('.transition');
  if(!item) return;
  modal.classList.remove('show');
  const clip = document.querySelector('.clip.selected') || document.querySelector('.clip-a');
  clip.style.outline = '2px solid #287fba';
  setTimeout(()=>clip.style.outline='',900);
});

const timeline = document.getElementById('timeline');
const playhead = document.getElementById('playhead');
let dragging = false;
function setPlayhead(clientX){
  const r = timeline.getBoundingClientRect();
  let x = Math.max(0, Math.min(r.width-5, clientX-r.left));
  playhead.style.left = x+'px';
  const pct = x/r.width;
  const seconds = Math.round(3 + pct*(12*60+42));
  const m = Math.floor(seconds/60), s = String(seconds%60).padStart(2,'0');
  playhead.querySelector('span').textContent = `${m}:${s}`;
  document.getElementById('timeLabel').textContent = `${m}:${s} / 12:45`;
  document.getElementById('previewProgress').style.width = (pct*100)+'%';
}
playhead.addEventListener('mousedown',()=>dragging=true);
document.addEventListener('mouseup',()=>dragging=false);
document.addEventListener('mousemove',e=>{if(dragging)setPlayhead(e.clientX)});
timeline.addEventListener('mousedown',e=>{if(!e.target.closest('.clip'))setPlayhead(e.clientX)});

document.querySelectorAll('.clip').forEach(c=>{
  c.addEventListener('click',()=> {
    document.querySelectorAll('.clip').forEach(x=>x.classList.remove('selected'));
    c.classList.add('selected');
  });
});

document.querySelector('.create-video').addEventListener('click',()=>{
  alert('This is a recreation prototype — the 2015-style editor UI is ready for your own media and transition assets.');
});
