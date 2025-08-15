import { Icon } from "@iconify/react/dist/iconify.js";

const SimpleMarquee = ({
  items,
  className = "text-white bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
  speed = 40,
}) => {
  return (
    <div className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase ${className}`}>
      <div 
        className={`flex whitespace-nowrap ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {/* First set of items */}
        {items.map((text, index) => (
          <span
            key={`first-${index}`}
            className="flex items-center px-6 gap-x-6 shrink-0"
          >
            {text} <Icon icon={icon} className={iconClassName} />
          </span>
        ))}
        {/* Duplicate set for seamless loop */}
        {items.map((text, index) => (
          <span
            key={`second-${index}`}
            className="flex items-center px-6 gap-x-6 shrink-0"
          >
            {text} <Icon icon={icon} className={iconClassName} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default SimpleMarquee;