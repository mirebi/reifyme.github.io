import {content} from '../public/content.js'
import {marked} from "marked";

let contentArea = document.getElementById("contentarea")

content.forEach(content => {
    let elem = document.createElement('dom')
    elem.className="post"
    elem.innerHTML = `
    <div class="title"> 
     ${content.title}
    </div>
    <div class="content">
    ${marked.parse(content.content)}
    </div>
    <div class="tags">
    #${content.tags.join(" #")}
    </div>
</div>
    `
    contentArea.appendChild(elem)
})
