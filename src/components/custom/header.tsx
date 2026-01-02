import TitleBar from "@/components/custom/titlebar";
import NavBar from "@/components/custom/navbar/navbar";

function Header() {
  return (
    <>
      <div className="bg-secondary flex flex-col w-full shadow-md gap-2 sm:gap-[2vh] px-[min(4vw,10px)] sm:px-[10vw] pt-[1.2vh]">
        <TitleBar />
        <NavBar />
      </div>
    </>
  );
}

export default Header;
