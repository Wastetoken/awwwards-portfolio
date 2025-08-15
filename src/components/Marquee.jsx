import { Icon } from "@iconify/react/dist/iconify.js";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(Observer);

const Marquee = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    
    // Validate items
    if (!items || items.length === 0) return null;
    
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0] ? items[0].offsetLeft || 0 : 0,
      times = [],
      widths = [],
      xPercents = [],
      curIndex = 0,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
      totalWidth,
      curX,
      distanceToStart,
      distanceToLoop,
      item,
      i;
    gsap.set(items, {
      xPercent: (i, el) => {
        if (!el) return 0;
        let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")) || 100);
        let x = parseFloat(gsap.getProperty(el, "x", "px")) || 0;
        let xPercent = gsap.getProperty(el, "xPercent") || 0;
        
        // Ensure we don't divide by zero
        if (w === 0) w = 100;
        
        xPercents[i] = snap((x / w) * 100 + xPercent);
        return isFinite(xPercents[i]) ? xPercents[i] : 0;
      },
    });
    gsap.set(items, { x: 0 });
    totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
      (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
      item = items[i];
      if (!item) continue;
      
      curX = (xPercents[i] / 100) * widths[i];
      distanceToStart = (item.offsetLeft || 0) + curX - startX;
      distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") || 1);
      
      // Ensure finite values
      let duration1 = distanceToLoop / pixelsPerSecond;
      let duration2 = (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond;
      
      if (!isFinite(duration1)) duration1 = 1;
      if (!isFinite(duration2)) duration2 = 1;
      
      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: duration1,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration: duration2,
            immediateRender: false,
          },
          duration1
        )
        .add("label" + i, distanceToStart / pixelsPerSecond);
      times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length);
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex) {
        vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      curIndex = newIndex;
      vars.overwrite = true;
      return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    return tl;
  }

  useEffect(() => {
    let tl, observer;

    const timer = setTimeout(() => {
      const validItems = itemsRef.current.filter(item => item !== null && item.offsetWidth > 0);
      if (validItems.length === 0) return;

      tl = horizontalLoop(validItems, {
        repeat: -1,
        paddingRight: 30,
        reversed: reverse,
        speed: 1,
      });
      
      if (!tl) return;

      observer = Observer.create({
        onChangeY(self) {
          let factor = 2.5;
          if ((!reverse && self.deltaY < 0) || (reverse && self.deltaY > 0)) {
            factor *= -1;
          }
          gsap
            .timeline({
              defaults: {
                ease: "none",
              },
            })
            .to(tl, { timeScale: factor * 2.5, duration: 0.2, overwrite: true })
            .to(tl, { timeScale: factor / 2.5, duration: 1 }, "+=0.3");
        },
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (tl) tl.kill();
      if (observer) observer.kill();
    };
  }, [items, reverse]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap ${className}`}
    >
      <div className="flex">
        {items.map((text, index) => (
          <span
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="flex items-center px-8 gap-x-16"
          >
            {text} <Icon icon={icon} className={iconClassName} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;