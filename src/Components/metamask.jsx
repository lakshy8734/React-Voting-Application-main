import React, { useRef, useEffect } from "react";

const MetamaskLogo = () => {
  const canvasRef = useRef(null);
  const logoImgRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const logo = {
      x: 870,
      y: 20,
      width: 200,
      height: 130,
    };

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const angle = Math.atan2(mouseY - logo.y, mouseX - logo.x);
      const rotation = angle + (3 / 2) * Math.PI;

      ctx.save();
      ctx.translate(logo.x + logo.width / 2, logo.y + logo.height / 2);
      ctx.rotate(rotation);

      // Make sure logoImgRef.current is an HTMLImageElement
      if (logoImgRef.current instanceof HTMLImageElement) {
        ctx.drawImage(
          logoImgRef.current,
          -logo.width / 2,
          -logo.height / 2,
          logo.width,
          logo.height
        );
      }

      ctx.restore();

      requestAnimationFrame(draw);
    }

    let mouseX = 0;
    let mouseY = 0;

    canvas.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    draw();

    // Cleanup event listener when component unmounts
    return () => {
      canvas.removeEventListener("mousemove", () => {});
    };
  }, []);

  return (
    <div>
      {/* Add the Metamask logo image */}
      <img
        ref={logoImgRef}
        src="https://1000logos.net/wp-content/uploads/2022/05/MetaMask-Symbol-500x281.png"
        alt="Metamask Logo"
        style={{ display: "none" }}
      />
      <canvas
        ref={canvasRef}
        id="canvas"
        style={{ position: "absolute", top: 0, left: 0 }}
      ></canvas>
    </div>
  );
};

export default MetamaskLogo;
