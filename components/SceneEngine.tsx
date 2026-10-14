'use client';

import { useEffect } from 'react';

// Scene player. Each [data-scene] lists step times (ms) in data-timeline; steps are added as
// cumulative classes s1…sN and steps.css reveals/hides by step. Plays once when ~40% visible.
// Without html.motion (reduced motion / no JS) CSS shows every scene's final state.
export function SceneEngine() {
  useEffect(() => {
    if (!document.documentElement.classList.contains('motion')) return;
    const timers: number[] = [];
    const play = (el: HTMLElement) => {
      (el.dataset.timeline ?? '').split(',').map(Number).filter((n) => !Number.isNaN(n))
        .forEach((t, i) => timers.push(window.setTimeout(() => el.classList.add(`s${i + 1}`), t)));
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        play(e.target as HTMLElement);
      }
    }, { threshold: 0.4 });
    document.querySelectorAll<HTMLElement>('[data-scene]').forEach((el) => io.observe(el));

    // Infinite figure loops run only while on screen.
    const loopIO = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.classList.toggle('paused', !e.isIntersecting);
    });
    document.querySelectorAll<HTMLElement>('[data-loop]').forEach((el) => loopIO.observe(el));

    return () => { io.disconnect(); loopIO.disconnect(); timers.forEach(clearTimeout); };
  }, []);
  return null;
}
