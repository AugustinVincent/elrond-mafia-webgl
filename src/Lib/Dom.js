import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default class DomManip{
    constructor(){
        this.twitterLogo = document.querySelector(".social-links-hover .twitter-logo")
        this.linkedinLogo = document.querySelector(".social-links-hover .linkedin-logo")
        this.START_TIME_PRESALE = 1654883400

        this.faqSection()
        this.teamHover()
        this.toggleMobileMenu()
        this.scrollProgress()
        // this.presaleTimer()
        window.requestAnimationFrame(() => this.update())

    }
    faqSection(){
        this.questions = Array.from(document.querySelectorAll(".question"))
        this.questionButtons = Array.from(document.querySelectorAll(".faq-title-container"))
        this.questionButtons.forEach((element, key) => {
            element.addEventListener('click', () => {
                this.questions[key].classList.toggle("isOpen")
            })
        });

    }

    teamHover(){
        this.cursorX = window.innerWidth /2
        this.cursorY = window.innerHeight /2
        window.addEventListener("mousemove", (e) => {
            this.cursorX = e.clientX
            this.cursorY = e.clientY
        })
    }

    toggleMobileMenu(){
        let menuIsOpen = false
        this.menuButton = document.querySelector('.menu-button')
        this.mobileMenu = document.querySelector('.mobile-links-container')
        this.menuLinks = Array.from(document.querySelectorAll('.mobile-links-container .link'))

        const closeMenu = () =>{
            const tl = gsap.timeline()
            tl.fromTo(".link", { x : 0 , opacity : 1},{
                x : -200,
                opacity :0,
                stagger: 0.1,
                duration : 0.3
            }, ">-0.5")
            .fromTo(".mobile-links-container",{ opacity : 1},{
                opacity : 0,
                duration : 0.5
            })
            this.mobileMenu.style.pointerEvents = "none"
            this.menuButton.classList.toggle("isOpen")
            menuIsOpen = false
        } 

        const openMenu = () => {
            const tl = gsap.timeline()
            tl.fromTo(".mobile-links-container",{ opacity : 0},
            {
                opacity : 1,
                duration : 0.5
            })
            .fromTo(".link", { x : -200, opacity : 0},
            {
                x : 0,
                opacity :1,
                stagger: 0.1,
                duration : 0.3
            }, ">-0.8")
            this.mobileMenu.style.pointerEvents = "all"
            this.menuButton.classList.toggle("isOpen")
            menuIsOpen = true
            
        }

        this.menuButton.addEventListener('click', () => {

            if(!menuIsOpen) openMenu()
            else closeMenu()

        })

        for(const link of this.menuLinks){
            link.addEventListener('click' , () => {
                closeMenu()
            })
        }

    }

    scrollProgress(){
        gsap.registerPlugin(ScrollTrigger)
        this.scrollProgressContainer = document.querySelector(".scroll-progress")
        this.sections = Array.from(document.querySelectorAll(".section"))
        this.scrollPoints = []
        this.pointLinkProgress = []

        for (let i = 0; i < this.sections.length; i++) {
            const element = this.sections[i]
            const point = document.createElement("a")
            point.setAttribute("href", `#${element.dataset.sectionName}`)
            point.classList.add("scroll-progress-point")
            this.scrollProgressContainer.appendChild(point)
            this.scrollPoints.push(point)

            this.topTriggerSection = "top"

            if(i == 1) this.topTriggerSection = `+=${window.innerHeight/2 + 1}`
            else if(i < this.sections.length - 1) this.topTriggerSection = "top"
            else this.topTriggerSection = "99%"

            if(i != 0){
                gsap.fromTo(point,{"--point-color" : "white"}, {
                    scrollTrigger : {
                        trigger : this.sections[i],
                        start : `${this.topTriggerSection} ${i < this.sections.length - 1 ? "center" : "bottom"}`,
                        toggleActions : "restart none none reverse",
                        duration : 0.3,
                    },
                    "--point-color" : "#D7340D"
                })
            }
        
            if(i < this.sections.length - 1){
                const pointLink = document.createElement("span")
                pointLink.classList.add("scroll-progress-link")
                this.scrollProgressContainer.appendChild(pointLink)

                const linkProgress = document.createElement("span")
                linkProgress.classList.add("point-link-progress")
                pointLink.appendChild(linkProgress)
                this.pointLinkProgress.push(linkProgress)
                if(i != 0){
                    gsap.to(linkProgress, {
                        scrollTrigger : {
                            trigger : this.sections[i],
                            start : `top ${i == 1 ? "top" : "center"}`,
                            end : "bottom center",
                            scrub : 1
                        },
                        height : "100%"
                    })
                }
                
            }
        }
        ScrollTrigger.create({
            trigger: '#about-section',
            start : "top top",
            onEnter : () => {
                gsap.fromTo(".scroll-progress-link:nth-child(2) .point-link-progress",{ height : "0%"}, {height : "100%", duration : 0.3})
            },
            onLeaveBack: () => {
                gsap.fromTo(".scroll-progress-link:nth-child(2) .point-link-progress",{ height : "100%"}, {height : "0%", duration : 0.3})
            },
          });

    }

    // presaleTimer(){
    //     this.timer = document.querySelector('.count-down')
    //     this.presaleSpan = document.querySelector('.presale-container>span')
    //     setInterval(() => {
    //         const timer = this.calculatePrivateTimeLeft()
    //         // console.log(timer.day)
    //         if(this.difference <= 0) this.presaleSpan.innerHTML = 'The presale is live now !'
    //         else this.timer.innerHTML = `${timer.days > 0 ? `${timer.days}d ` : ''}${timer.hours}h ${timer.minutes}m ${timer.seconds}s`

    //     }, 1000);
    // }
    calculatePrivateTimeLeft () {
        this.difference = +new Date(this.START_TIME_PRESALE * 1000) - +new Date();
    
        this.timeLeft = null;
        
        if (this.difference > 0) {
          this.timeLeft = {
            days : Math.floor((this.difference  / (1000 * 60 * 60 * 24))),
            hours: Math.floor((this.difference  / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((this.difference  / 1000 / 60) % 60),
            seconds: Math.floor((this.difference  / 1000) % 60)
          };
        }
        return this.timeLeft
        
      };

    update(){
        this.twitterLogo.style.left = `${this.cursorX}px`
        this.twitterLogo.style.top = `${this.cursorY}px`

        this.linkedinLogo.style.left = `${this.cursorX}px`
        this.linkedinLogo.style.top = `${this.cursorY}px`
        window.requestAnimationFrame(() => this.update())
    }

}