import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";



export default class Scroll{
    constructor(){
        gsap.registerPlugin(ScrollTrigger)

        
        this.homePage()
        this.aboutPage()
        this.playToEarnTitle()
        this.roadmapPage()
        this.teamPage()
        this.faqPage()
    }

    homePage(){
        const scrollTrigger = {
            trigger : '#about-section',
            start : "top top ",
            toggleActions : "restart none none reverse",
            // markers : true,
        }
        this.homePageSection = document.querySelector("#home-section")

        ScrollTrigger.create({
            trigger: '#about-section',
            start : "top top",
            onEnter : () => this.homePageSection.style.pointerEvents = "none",
            onLeaveBack: () => this.homePageSection.style.pointerEvents = "all",
          });
        // ScrollTrigger.create({
        //     trigger: '#about-section',
        //     start : "top bottom ",
        //     // onEnter : () => window.scroll(0, window.innerHeight + 20),
        // });


        gsap.to(".big-title:first-child",{
            scrollTrigger,
            x : "150%",
            duration : 0.8,
            ease : "power1.out"
        })

        gsap.to(".big-title:nth-child(2)",{
            scrollTrigger,
            x : "-150%",
            duration : 0.8,
            ease : "power1.out"
        })
        gsap.to(".backgroundContainer",{
            scrollTrigger,
            opacity : "0",
            duration : 0.8,
            ease : "power1.out"
        })

        gsap.to(".petals-loop",{
            scrollTrigger,
            opacity : "0",
            duration : 0.5,
            ease : "power1.out"
        })

        gsap.to(".avatar",{
            scrollTrigger,
            opacity : "0",
            duration : 0.5,
            ease : "power1.out"
        })

        gsap.to(".scroll-button-container",{
            scrollTrigger,
            opacity : 0,
            duration : 0.5,
            ease : "power1.out"
        })

        gsap.to("#home",{
            scrollTrigger,
            pointerEvents : "none",
            duration : 0.5,
            ease : "power1.out"
        })
    }

    playToEarnTitle()
    {
        const tl = gsap.timeline({
            scrollTrigger : {
                trigger : '#play-to-earn',
                start : "top-100px center ",
                toggleActions : "restart none none reverse",
            }
        })
        tl
        .from(".play-to-earn-title", {
            x : -200,
            opacity : 0,
            duration : 0.6
        })
        .from("#play-to-earn .content",{
            x :200,
            opacity : 0,
            duration : 0.6,
        }, ">-0.4")
    }

    aboutPage()
    {
        const tl = gsap.timeline({
            scrollTrigger : {
                trigger : '#about-section',
                start : "top-100px center ",
                toggleActions : "restart none none reverse",
            }
        })
        tl
        .from(".about-title", {
            x : -200,
            opacity : 0,
            duration : 0.6
        })
        .from("#about-section .content",{
            x :200,
            opacity : 0,
            duration : 0.6,
        }, ">-0.4")
    }

    roadmapPage(){
        const tl = gsap.timeline({
            scrollTrigger : {
                trigger : '#roadmap',
                start : "top center ",
                toggleActions : "restart none none reverse",
            }
        })
        tl
        .from(".roadmap-title", {
            x : -200,
            opacity : 0,
            duration : 0.6
        })
        .from(".phase-card:nth-child(1)",{
            y :200,
            opacity : 0,
            duration : 0.6,
        }, ">-0.6")
        .from(".phase-card:nth-child(2)",{
            y :200,
            opacity : 0,
            duration : 0.6,
        }, ">-0.2")
        .from(".phase-card:nth-child(3)",{
            y :200,
            opacity : 0,
            duration : 0.6,
        }, ">-0.2")
    }

    teamPage(){
        gsap.from(".team-title", {
            scrollTrigger : {
                trigger : '#team',
                start : "top center ",
                toggleActions : "restart none none reverse",
            },
            x : -200,
            opacity : 0,
            duration : 0.6
        })
    }

    faqPage(){
        const tl = gsap.timeline({
            scrollTrigger : {
                trigger : '#faq',
                start : "top 80% ",
                toggleActions : "restart none none reverse",
            }
        })

        tl
        .from(".faq-title", {
            x : -200,
            opacity : 0,
            duration : 0.6
        })
        .from(".faq-img", {
            clipPath : 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
            opacity : 0,
            duration : 0.6
        }, ">-0.6")
        .from(".question",{
            x :200,
            stagger : 0.2,
            opacity : 0,
            duration : 0.4,
        }, ">-0.6")
    }
}