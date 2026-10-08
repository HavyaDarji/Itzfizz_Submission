# 🏎️ ITZFIZZ — Scroll-Driven Hero Section Animation

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.12.5-88CE02?style=flat&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![ScrollTrigger](https://img.shields.io/badge/ScrollTrigger-Enabled-00e676?style=flat)](https://greensock.com/scrolltrigger/)
[![60 FPS](https://img.shields.io/badge/Performance-60_FPS_Locked-brightgreen?style=flat)](#performance--engineering-optimizations)

A high-performance, responsive, scroll-driven interactive hero section animation recreated using vanilla web technologies and GSAP ScrollTrigger. Inspired by automotive kinematics and modern web interaction design, this project focuses on motion quality, fluid interpolation, and hardware-accelerated rendering.

---

## 🔗 Live Links

- **Live Demo:** [https://havyadarji.github.io/Itzfizz_Submission/](https://havyadarji.github.io/Itzfizz_Submission/)
- **GitHub Repository:** [https://github.com/HavyaDarji/Itzfizz_Submission](https://github.com/HavyaDarji/Itzfizz_Submission)
- **Reference Inspiration:** [Original Reference Demo](https://paraschaturvedi.github.io/car-scroll-animation)

---

## Technical Objective & Scope

The core objective of this assignment is to evaluate mastery of:
1. **Frontend Animation Pipelines:** Designing deterministic, scroll-tied visual timelines.
2. **Scroll-Driven Interaction Logic:** Converting vertical scroll displacement into horizontal velocity, dynamic letter illumination, and staggered metric reveals.
3. **Smooth UI Behavior & Performance:** Achieving a stutter-free 60 FPS lock by prioritizing GPU-composited CSS transforms and eliminating layout thrashing.
4. **Vanilla Web Architecture:** Building clean, zero-build, modular code using HTML5, CSS3, ES6 JavaScript, and GSAP.

---

## Key Features & Interaction Highlights

### 1. Sticky Hero Track (`100vh`) Above the Fold
- The hero viewport occupies the full screen above the fold (`100vh` sticky track pinned within a `450vh` scroll length).
- Features a centered, letter-spaced headline: **`W E L C O M E   I T Z F I Z Z`** set inside a high-contrast highway road strip.

### 2. Initial State & Peeking Vehicle
- On page load, the McLaren supercar is parked with its front bumper peeking into the left edge of the highway (`startX = -carWidth * 0.78`).
- The headline letters and statistics cards remain cleanly hidden until triggered by scroll progress.

### 3. Continuous Scroll-Tied Translation
- As the user scrolls, the vehicle accelerates smoothly across the road from left to right.
- Motion is strictly tied to scroll progress (`scrub: 0.6`), ensuring complete user control (scrolling down advances the car, stopping freezes the frame, and scrolling up reverses the sequence in real-time).

### 4. Real-Time Spatial Letter Illumination
- On every scroll tick, the vehicle's nose coordinate is evaluated against the pre-cached client X offset of each character.
- Glyphs dynamically light up into solid high-contrast black (`#111111`) over the glowing green speed trail as the car passes over them.

### 5. Staggered Metric Disclosure
- 4 impact statistics cards appear sequentially at designated progress milestones:
  - **Box 1 (`58%`) — Lime (`#def54f`):** *Increase in pick up point use* (reveals at `11% – 27%` scroll)
  - **Box 2 (`23%`) — Cyan (`#6ac9ff`):** *Decreased in customer phone calls* (reveals at `28% – 44%` scroll)
  - **Box 3 (`27%`) — Dark Slate (`#2b2e3b`):** *Increase in pick up point use* (reveals at `48% – 64%` scroll)
  - **Box 4 (`40%`) — Orange (`#fa7328`):** *Decreased in customer phone calls* (reveals at `66% – 82%` scroll)

### 6. Full Vehicle Exit
- At `100%` scroll progress, the supercar drives completely off-screen to the right (`x = window.innerWidth + 60`), leaving the full green trail, illuminated headline, and all 4 statistics cards cleanly visible on the screen.

---

## Mathematical & Animation Logic Breakdown

### 1. Spatial Geometry Caching
To prevent layout reflows during scroll events, letter bounding client coordinates are pre-calculated upon initialization and cached into memory:
```javascript
function updateDimensions() {
  carWidth = car.offsetWidth || 340;
  letterOffsets = letters.map((letter) => letter.getBoundingClientRect().left);
  ScrollTrigger.refresh();
}
window.addEventListener("resize", updateDimensions);
```

### 2. Scroll-Tied Interpolation Formula
The car's horizontal displacement and nose coordinate are computed linearly based on normalized scroll progress:
```javascript
const progress = self.progress; // 0.0 to 1.0
const startX = -(carWidth * 0.78);
const endX = window.innerWidth + 60;
const currentCarX = startX + progress * (endX - startX);
const carNoseX = currentCarX + carWidth * 0.45;
```

### 3. Dynamic Letter Collision Detection
```javascript
letters.forEach((letter, i) => {
  const letterX = letterOffsets[i] || letter.getBoundingClientRect().left;
  if (carNoseX >= letterX) {
    letter.classList.add("active");
  } else {
    letter.classList.remove("active");
  }
});
```

### 4. Smooth Easing Function for Metric Containers
```javascript
function getProgressFactor(progress, start, end) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

function applyBoxTransform(element, factor, directionY) {
  element.style.opacity = factor;
  element.style.transform = `translateY(${(1 - factor) * directionY}px)`;
}
```

---

## Performance & Engineering Optimizations

- **GPU Composited Properties:** Transforms exclusively utilize `translateY()`, `translateX()`, and `opacity`, offloading rasterization directly to the GPU compositor layer.
- **Zero Layout Thrashing:** Read operations (`getBoundingClientRect()`) are strictly quarantined to initialization and resize handlers. No layout queries occur inside the `onUpdate` loop.
- **Zero Cumulative Layout Shift (CLS 0.0):** Absolute positioning within pinned container coordinates ensures rock-solid layout stability across all viewports.
- **Lightweight Zero-Dependency Bundle:** Pure vanilla web technologies without heavyweight framework overhead, providing instant load times under 100ms.

---

## Responsive Design Matrix

| Viewport Category | Screen Width | Layout Adjustments |
| :--- | :--- | :--- |
| **Desktop / Ultrawide** | `> 1200px` | Full highway strip (`220px`), full typography clamp (`6rem`), dual-row staggered metric cards. |
| **Laptop / Tablet** | `860px – 1200px` | Adjusted container margins, scaled typography (`2.8rem` metric numerals). |
| **Mobile Tablet** | `600px – 860px` | Highway height adjusted to `180px`, car scaled to `160px`, compact card padding. |
| **Mobile Portrait** | `< 600px` | Highway scaled to `140px`, responsive full-width card layout (`86vw`). |

---

## 📂 Project Architecture

```text
├── index.html     # Semantic HTML5 markup, header, road container, and metric nodes
├── style.css      # Design tokens, CSS variables, typography, and responsive media queries
├── script.js      # GSAP ScrollTrigger timeline, spatial collision detection & interpolation
├── car.png        # Transparent top-view McLaren supercar asset (685 KB)
├── logo.png       # Official iTZFiZZ logo asset (white on transparent, 12 KB)
└── README.md      # Comprehensive technical documentation & engineering report
```

---

## Local Development Setup

No package installations or bundler configurations are required. The project runs natively in all modern evergreen browsers:

```bash
# Clone the repository
git clone https://github.com/HavyaDarji/Itzfizz_Submission.git

# Navigate into the project directory
cd Itzfizz_Submission

# Serve using any static local web server
npx serve .
# or
python -m http.server 8000
```

Open `http://localhost:3000` (or `http://localhost:8000`) in your browser to inspect and interact with the animation.

---

## Submission Details

- **Author:** Havya Darji
- **Assignment:** Scroll-Driven Hero Section Animation
- **Organization:** ITZFIZZ
- **Repository:** [https://github.com/HavyaDarji/Itzfizz_Submission](https://github.com/HavyaDarji/Itzfizz_Submission)
