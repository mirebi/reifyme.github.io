import"./modulepreload-polyfill.c7c6310f.js";/* empty css             */const a=document.getElementById("showspace");let h=async()=>await fetch("https://api.pexels.com/v1/search?query=nature&per_page=30",{headers:{Authorization:"563492ad6f91700001000001c0984e68177449b49c68e16fc9adb51d"}}).then(t=>t.json()).then(t=>t.photos),s=e=>{const t=document.createElement("div");t.className="highlight";const l=document.createElement("img");l.src=e[0].src.original,l.alt=`Picture no ${e[0].photographer}`,t.appendChild(l),a.appendChild(t);const c=document.createElement("div");c.className="scroller";for(var r=1;r<e.length-1;r++){const o=document.createElement("div");o.className="scrollerelem",o.id=e[r].id;const n=document.createElement("img");n.src=e[r].src.small,n.alt=`Picture from ${e[r].photographer}`,o.appendChild(n),c.appendChild(o)}a.appendChild(c)};h().then(e=>{console.log(e),s(e)});document.querySelectorAll(".scroller>div").forEach(e=>{e.addEventListener("click",t=>{var l=`https://api.pexels.com/v1/photos/${e.id}`;fetch(l,{headers:{Authorization:"563492ad6f91700001000001c0984e68177449b49c68e16fc9adb51d"}}).then(c=>c.json()).then(c=>{var r=c.src.original,o=document.getSelection(".highlight>img");o[0].src=r})})});