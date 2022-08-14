const showspace = document.getElementById("showspace")

let fetchImages = async () => {
    let uri = "https://api.pexels.com/v1/search?query=nature&per_page=30"
    return await fetch(uri, {
        headers: {
            'Authorization': '563492ad6f91700001000001c0984e68177449b49c68e16fc9adb51d'
        }
    }).then((r) => r.json()).then((data) => data.photos)
}


let createDom = (images) => {
    const highlight = document.createElement("div")
    highlight.className = "highlight"
    const highlight_image = document.createElement('img')
    highlight_image.src=images[0].src.original
    highlight_image.alt=`Picture no ${images[0].photographer}`
    highlight.appendChild(highlight_image)
    showspace.appendChild(highlight)

    const scroller = document.createElement("div")
    scroller.className="scroller"
    for(var i = 1; i<(images.length-1);i++){
        const holder = document.createElement("div")
        holder.className="scrollerelem"
        holder.id = images[i].id
        const image = document.createElement("img")
        image.src=images[i].src.small
        image.alt=`Picture from ${images[i].photographer}`
        holder.appendChild(image)
        scroller.appendChild(holder)
    }
    showspace.appendChild(scroller)
}

// setup gallery
fetchImages().then((photos => {
    console.log(photos)
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