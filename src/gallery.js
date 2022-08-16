const showspace = document.getElementById("showspace")

let fetchImages = async () => {
    let uri = "https://api.pexels.com/v1/search?query=nature&per_page=60"
    return await fetch(uri, {
        headers: {
            'Authorization': '563492ad6f91700001000001c0984e68177449b49c68e16fc9adb51d'
        }
    }).then((r) => r.json()).then((data) => data.photos)
}


let createDom = (images) => {
    // create and append dom element and listeners to each image
    const scroller = document.createElement("div")
    scroller.className="scroller"
    for(var i =0; i<(images.length);i++){
        const holder = document.createElement("div")
        holder.className="card"
        holder.id = images[i].id
        const image = document.createElement("img")
        const info = document.createElement("dom")
        info.className="info"
        image.src=images[i].src.medium
        info.innerHTML=`<p>${images[i].photographer}</p>`
        holder.appendChild(image)
        holder.appendChild(info)
        holder.onclick  = (ev) => {
            if (!ev.currentTarget.highlighted){
            document.querySelectorAll(".card").forEach((card) => {
                card.classList.remove("highlight")
                card.classList.remove("showinfo")
            })
            ev.currentTarget.classList.add("highlight")
            ev.currentTarget.classList.add("showinfo")
            ev.currentTarget.highlighted = true
            //scroll into view
            //ev.currentTarget.scrollIntoView({behavior: "smooth", block: "center"}) 
            const space = document.getElementById("showspace")
            const tgtOffset = ev.currentTarget.offsetLeft - (space.offsetWidth/2)+200;
            space.scrollTo({top:0,left: tgtOffset, behavior: "smooth"})
            
        } else {
            // fix for hover
            ev.currentTarget.classList.remove("highlight")
            ev.currentTarget.classList.remove("showinfo")
            ev.currentTarget.highlighted = false
        }
        }
        scroller.appendChild(holder)
    }
    showspace.appendChild(scroller)
}

// setup gallery
fetchImages().then((photos => {
    createDom(photos)
}))

// highlight image on click
document.querySelectorAll(".scroller>div").forEach(el =>
    {
        el.addEventListener('click', event => {
            var uri = `https://api.pexels.com/v1/photos/${el.id}`
            fetch(uri, {
                headers: {
                    'Authorization': '563492ad6f91700001000001c0984e68177449b49c68e16fc9adb51d'
                }
            })
                .then((r) => r.json())
                .then((data) => {
                    var photosrc = data.src.original
                    var selection = document.getSelection(".highlight>img")
                    selection[0].src = photosrc
                })
        })
    }
)
