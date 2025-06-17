export default function JoinButton() {
  return (
    <a
      href={import.meta.env.BASE_URL + "join"}
      className="p-2 px-5 cursor-pointer bg-gradient bg-main-gradient text-lg lg:text-md xl:text-lg text-white rounded-lg inline-block"
    >
      Join
    </a>
  );
}
