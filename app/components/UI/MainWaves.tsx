export default function WaveVideo() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-26 md:h-32 lg:h-42  pointer-events-none -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="
          w-full h-full object-cover opacity-5 blur-[5px] scale-100 transform-gpu
          [filter:brightness(0.7)_contrast(5.2)_saturate(1.4)_hue-rotate(400deg)] "
      >
        <source src="/waves.webm" type="video/webm" />
      </video>
    </div>
  );
}
