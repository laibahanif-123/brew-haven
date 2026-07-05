import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Hide until mouse moves to prevent weird placement on load

  useEffect(() => {
    const moveCursor = (e) => {
      if (!isVisible) setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over a clickable element
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  // Don't render on mobile devices (touch screens)
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* The trailing dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-crema rounded-full pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* The expanding circle */}
      <div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-crema pointer-events-none z-[9998] transition-all duration-200 ease-out mix-blend-difference ${
          isHovering ? "scale-[2.5] bg-crema/20 border-transparent" : "scale-100 bg-transparent"
        }`}
        style={{
          transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)`,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Global style to hide default cursor */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, a, button {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
