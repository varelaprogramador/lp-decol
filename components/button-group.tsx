import { event } from "../app/lib/facebook";
import { Button } from "./ui/button";

const BotaoLead = () => {
  const handleClick = () => {
    event("Lead");
    window.open("https://chat.whatsapp.com/InE138hOfcL9dtN0jWrAAE");
  };

  return (
    <Button
      className="bg-gold-400 hover:bg-gold-500 text-black font-bold  p-10 rounded-md text-base sm:text-lg transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] whitespace-normal break-words text-center"
      onClick={handleClick}
    >
      <span className="flex flex-wrap justify-center">
        QUERO ENTRAR PARA O GRUPO VIP AGORA
      </span>
    </Button>
  );
};

export default BotaoLead;
