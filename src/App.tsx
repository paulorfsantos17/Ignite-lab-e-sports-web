import "./styles/main.css";
import logoImg from "./assets/Logo.svg";

import GameBunner from "./components/GameBunner";
import CreateAdBanner from "./components/CreateAdBanner";
import { useEffect, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./components/Form/Input";
import CreateAdModal from "./components/Form/CreateAdModal";
import axios from "axios";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games")
      .then((response) => setGames(response.data));
  }, []);
  

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImg} alt="Imagem Logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBunner
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.Ads}
            key={game.id}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      
      </Dialog.Root>
    </div>
  );
}

export default App;
