# ITZFIZZ — Scroll-Driven Hero Section Animation

A clean, responsive, 60FPS scroll-driven hero section animation recreated using vanilla web technologies and GSAP ScrollTrigger, inspired directly by the reference demo.

## Live Demo & Reference

- Reference Demo: https://paraschaturvedi.github.io/car-scroll-animation

## Requirements Met

- 1. Hero Section Layout: Occupies the first screen (100vh sticky track within the scroll section). Features a prominent letter-spaced headline WELCOME ITZFIZZ inside the road strip, with 4 impact metric cards positioned cleanly above and below the road.
- 2. Initial State: Front bumper of the car peeks onto the left edge on page load.
- 3. Scroll-Based Animation: The sports car translates along the road in direct sync with scroll progress using GSAP ScrollTrigger (scrub: 0.6). As the car moves, a vibrant green speed trail expands dynamically behind it, and the letters of WELCOME ITZFIZZ illuminate in real-time as the vehicle passes each character.
- 4. Staggered Metric Cards: The 4 statistics cards (58%, 23%, 27%, 40%) appear one by one at designated scroll checkpoints with smooth fade and slide transitions.
- 5. Motion & Performance: Pure GPU-accelerated CSS transforms (translate, scale, opacity), zero layout reflows on scroll, and fully responsive across mobile, tablet, and desktop viewports.

## Tech Stack

- HTML5
- CSS3 (Vanilla)
- JavaScript (ES6+)
- GSAP 3.12 & ScrollTrigger

## Project Files

- index.html: Semantic markup and structure
- style.css: CSS styling, color schemes, and responsive layout
- script.js: GSAP ScrollTrigger animation logic & spatial detection
- car.png: Transparent top-view McLaren sports car asset
- logo.png: Official iTZFiZZ logo asset
- README.md: Project documentation

## How to Run Locally

```bash
npx serve .
```
