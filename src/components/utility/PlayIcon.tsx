export default function PlayIcon() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="w-10 h-10 lg:w-20 lg:h-20 rounded-2xl bg-white/10 backdrop-blur-[2px] flex items-center justify-center z-30">
        <i className="fi fi-sr-play text-lg lg:text-4xl text-white pointer-events-none leading-none flex items-center justify-center" />
      </div>
    </div>
  );
}
