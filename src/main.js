import {
    WebGLRenderer,
    Color,
    Scene,
    PerspectiveCamera,
    DirectionalLight,
    PointsMaterial,
    Points,
    BufferGeometry,
    BufferAttribute,
    TextureLoader
} from "three";

const container = document.querySelector('#scene-container')

// mouse movement

let mouseX = 0
let mouseY = 0
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

// gen array with randomized particle positions
const randomizeParticlePos = (particleCount) => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
        arr[i] = (Math.random() - 0.5) * 10
    }

    return arr
}


// render loop
const BGRender = () => {
    const renderer = new WebGLRenderer({antialias: true})
    renderer.physicallyCorrectLights = true

    // create a scene
    const scene = new Scene()
    scene.background = new Color(0x222222)

    // create cam
    const fov = 50
    const aspect = container.clientWidth / container.clientHeight
    const near = 0.1
    const far = 10
    const camera = new PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(0, 0, 5)
    //camera.rotation.set(0.0,0.3,0.0)
    //camera.rotation.set(-0.6,-0.003,0)

    // add a light source
    const color = 0xffffff
    const light = new DirectionalLight(color, 3)
    light.position.set(10, 10, 5)
    scene.add(light)

    // create a texture loader
    const loader = new TextureLoader()

    // add a temp geometry
    const geom = new BufferGeometry()
    geom.setAttribute("position",
        new BufferAttribute(randomizeParticlePos(10000), 3, true))
    const mat = new PointsMaterial({
        size: 0.03,
        //map: loader.load("https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"),
        map: loader.load("../texture.png"),
        transparent: true,
        color: 0xc0c0c0
    })
    const pointField = new Points(geom, mat)
    pointField.position.set(0, 0, 0)
    scene.add(pointField)

    // render
    const render = (delta) => {
        delta *= 0.001 // in seconds
        if (resizeRenderer(renderer)) {
            camera.aspect = container.clientWidth / container.clientHeight
            camera.updateProjectionMatrix()
        }
        pointField.rotation.x = delta * Math.PI * 0.02 + mouseY * 0.0002
        pointField.rotation.y = delta * Math.PI * 0.02 + mouseX * 0.0002
        pointField.rotation.z = delta * Math.PI * 0.02
        renderer.render(scene, camera)

        //loop again
        requestAnimationFrame(render)
    }

    container.append(renderer.domElement)
    // kick off the render loop
    requestAnimationFrame(render)
}

BGRender()

// auto resizer
const resizeRenderer = (renderer) => {
    const canvas = renderer.domElement
    const needResize = canvas.width !== container.clientWidth || canvas.height !== container.clientHeight
    if (needResize) {
        renderer.setSize(container.clientWidth, container.clientHeight, false)
    }
    return needResize
}

