import * as THREE from 'three'
import Experience from '../Experience'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";



export default class BagAndGun {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.time = this.experience.time
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('BagAndGun')
        }
        this.setBag ()
        this.setGun()
        this.setScrollTrigger()
    }

    setBag(){
        this.bagModel = this.resources.items.bagModel
        this.bagModel.scene.scale.set(0.2, 0.2, 0.2)


        this.bagModel.scene.position.set(0.33, -0.09, 1.8)
        this.bagModel.scene.rotation.set(0.45, -0.53, 0.08)
        
        if(this.debug.active && false){
            this.debugFolder.add(this.bagModel.scene.position, "x").min(-5).max(5).step(0.01).name("Bag position x")
            this.debugFolder.add(this.bagModel.scene.position, "y").min(-5).max(5).step(0.01).name("Bag position y")
            this.debugFolder.add(this.bagModel.scene.position, "z").min(-5).max(5).step(0.01).name("Bag position z")
            this.debugFolder.add(this.bagModel.scene.rotation, "x").min(-5).max(5).step(0.01).name("Bag rotation x")
            this.debugFolder.add(this.bagModel.scene.rotation, "y").min(-5).max(5).step(0.01).name("Bag rotation y")
            this.debugFolder.add(this.bagModel.scene.rotation, "z").min(-5).max(5).step(0.01).name("Bag rotation z")
        }
        this.scene.add(this.bagModel.scene)
    }
    setGun(){
        
        this.gunModel = this.resources.items.gunModel
        this.gunModel.scene.scale.set(0.2, 0.2, 0.2)


        this.gunModel.scene.position.set(1.19, 0.08, 1.19)
        this.gunModel.scene.rotation.set(2.79, 0.94, 4.02)
        if(this.debug.active && false){
            this.debugFolder.add(this.gunModel.scene.position, "x").min(-5).max(5).step(0.01).name("Gun position x")
            this.debugFolder.add(this.gunModel.scene.position, "y").min(-5).max(5).step(0.01).name("Gun position y")
            this.debugFolder.add(this.gunModel.scene.position, "z").min(-5).max(5).step(0.01).name("Gun position z")
            this.debugFolder.add(this.gunModel.scene.rotation, "x").min(-5).max(5).step(0.01).name("Gun rotation x")
            this.debugFolder.add(this.gunModel.scene.rotation, "y").min(-5).max(5).step(0.01).name("Gun rotation y")
            this.debugFolder.add(this.gunModel.scene.rotation, "z").min(-5).max(5).step(0.01).name("Gun rotation z")
        }
        this.scene.add(this.gunModel.scene)
    }

    setScrollTrigger(){
        gsap.registerPlugin(ScrollTrigger)
        
        this.scrollTriggerObject1 = { 
            trigger : '#about',
            start : "top top",
            end : "bottom top",
            toggleActions : "reverse none reverse none",
            // markers : true,
            scrub : 1,
        }
        gsap.to(this.gunModel.scene.position,
            {
                scrollTrigger : this.scrollTriggerObject1, 
                x :  0.5,
                y : 0.08,
                z : 0.5,
            })
        gsap.to(this.bagModel.scene.position, 
            {
                scrollTrigger : this.scrollTriggerObject1 ,
                x :  -0.38,
                y : -0.09,
                z : 1.8
            })

        this.scrollTriggerObject2 = { 
            trigger : '#roadmap',
            start : "center top",
            end : "+=200%  top",
            // markers : true,
            scrub : 1,
        }
        gsap.to(this.gunModel.scene.position,
            {
                scrollTrigger : this.scrollTriggerObject2 ,
                y : 2,
            })
        gsap.to(this.bagModel.scene.position, 
            {
                scrollTrigger : this.scrollTriggerObject2 ,
                y : 2,
            })
    }
    update(){
        this.gunModel.scene.position.y += Math.sin(this.time.elapsed * 0.0015) * 0.0001
        this.bagModel.scene.position.y += Math.sin(this.time.elapsed * 0.0025) * 0.0001
        this.gunModel.scene.rotation.y += Math.sin(this.time.elapsed * 0.0018) * 0.0001
        this.bagModel.scene.rotation.y += Math.sin(this.time.elapsed * 0.0022) * 0.0001
    }
}