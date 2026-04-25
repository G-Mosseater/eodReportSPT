export default function WaveBackground() {
  return (
  <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
  <svg
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    className="absolute top-0 left-0 w-[200%] h-full animate-wave-slow text-primary"
  >
    <path
      fill="currentColor"
      fillOpacity="0.05"
      d="M0,192L80,181.3C160,171,320,149,480,160C640,171,800,213,960,224C1120,235,1280,213,1360,202.7L1440,192L1440,320L0,320Z"
    />
  </svg>

  <svg
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    className="absolute top-0 left-0 w-[200%] h-full animate-wave-fast text-secondary"
  >
    <path
      fill="currentColor"
      fillOpacity="0.06"
      d="M0,224L60,218.7C120,213,240,203,360,186.7C480,171,600,149,720,154.7C840,160,960,192,1080,213.3C1200,235,1320,245,1440,250.7L1440,320L0,320Z"
    />
  </svg>
</div>
  );
}