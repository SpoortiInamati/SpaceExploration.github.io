   document.addEventListener("DOMContentLoaded", () => {

            const nav = document.querySelector("#gooeyNav");
            const items = nav.querySelectorAll("li");
            const container = document.querySelector(".gooey-nav-container");
            const filterEl = document.querySelector(".effect.filter");
            const textEl = document.querySelector(".effect.text");

            let activeIndex = 0;

            const noise = n => n / 2 - Math.random() * n;

            const getXY = (distance, index, total) => {
                const angle = ((360 + noise(8)) / total) * index * (Math.PI / 180);
                return [distance * Math.cos(angle), distance * Math.sin(angle)];
            };

            const createParticle = (i, distances, r, count, colors, time, variance) => {
                const rotate = noise(r / 10);
                return {
                    start: getXY(distances[0], count - i, count),
                    end: getXY(distances[1] + noise(7), count - i, count),
                    scale: 1 + noise(0.2),
                    time: time * 2 + noise(variance * 2),
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10
                };
            };

            function makeParticles() {
                const count = 15;
                const distances = [90, 10];
                const r = 100;
                const colors = [1, 2, 3, 1, 2, 3, 1, 4];
                const animationTime = 600;
                const variance = 300;

                for (let i = 0; i < count; i++) {
                    const p = createParticle(i, distances, r, count, colors, animationTime, variance);

                    const particle = document.createElement("span");
                    const point = document.createElement("span");

                    particle.className = "particle";
                    particle.style.setProperty("--start-x", `${p.start[0]}px`);
                    particle.style.setProperty("--start-y", `${p.start[1]}px`);
                    particle.style.setProperty("--end-x", `${p.end[0]}px`);
                    particle.style.setProperty("--end-y", `${p.end[1]}px`);
                    particle.style.setProperty("--scale", p.scale);
                    particle.style.setProperty("--color", `var(--color-${p.color})`);
                    particle.style.setProperty("--time", `${p.time}ms`);
                    particle.style.setProperty("--rotate", `${p.rotate}deg`);

                    point.className = "point";
                    particle.appendChild(point);
                    filterEl.appendChild(particle);

                    setTimeout(() => particle.remove(), p.time);
                }
            }

            function updateEffectPosition(li) {
                const rect = li.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const style = {
                    left: `${rect.x - containerRect.x}px`,
                    top: `${rect.y - containerRect.y}px`,
                    width: `${rect.width}px`,
                    height: `${rect.height}px`
                };

                Object.assign(filterEl.style, style);
                Object.assign(textEl.style, style);

                textEl.textContent = li.textContent;
            }

            items.forEach((li, index) => {
                li.addEventListener("click", () => {
                    if (activeIndex === index) return;

                    items[activeIndex].classList.remove("active");
                    li.classList.add("active");

                    activeIndex = index;

                    updateEffectPosition(li);

                    textEl.classList.remove("active");
                    void textEl.offsetWidth;
                    textEl.classList.add("active");

                    filterEl.querySelectorAll(".particle").forEach(p => p.remove());
                    makeParticles();
                });
            });

            updateEffectPosition(items[activeIndex]);
            textEl.classList.add("active");

            new ResizeObserver(() =>
                updateEffectPosition(items[activeIndex])
            ).observe(container);

        });