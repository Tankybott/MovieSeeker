const Logo: React.FC<{
  tailwindTextSize: string;
}> = ({ tailwindTextSize }) => {
  return (
    <div className="flex h-full justify-center items-center gap-4 z-50">
      <i className={`fi fi-sr-film h-auto leading-0 ${tailwindTextSize}`}></i>
      <h4
        className={`font-bold font-bebas  h-auto leading-0 ${tailwindTextSize}`}
      >
        Movie Seeker
      </h4>
    </div>
  );
};

export default Logo;
