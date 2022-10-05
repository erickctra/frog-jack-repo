import { useEffect, useState } from "react";
import { Card } from "./entities/card";

function App() {

  const [dealerDeck, setDealerDeck] = useState<Card[]>([]);
  const [yourDeck, setYourDeck] = useState<Card[]>([]);

  const [dealerSum, setDealerSum] = useState(0);
  const [yourSum, setYourSum] = useState(0);

  const [canHit, setCanHit] = useState(true);

  const [winner, setWinner] = useState<'dealer' | 'you' | 'tie' | ''>('');

  useEffect(() => {
    // start game / deal cards
    setDealerSum(buildDeck(dealerDeck));
    setYourSum(buildDeck(yourDeck));

  }, [])

  yourSum > 21 ? console.log(`%c estourou `, `background: #222; color: #a8324c`) : '';
  // yourSum === 21 ? console.log(`%c ganhou `, `background: #222; color: #bada55`) : '' ;
  winner != '' ? console.log(`%c ${winner} ganhou `, `background: #222; color: #eba434`) : null;

  if (canHit === false && winner === '') {
    dealerPlay()
  }

  function dealerPlay() {
    if (yourSum === 21 && dealerSum < 21) {
      dealerHit() ? '' : setWinner("you");
    }
    else if (dealerSum === 21 && yourSum < 21) {
      setWinner("dealer");
    }
    else if (dealerSum === 21 && yourSum === 21 || yourSum === dealerSum) {
      dealerHit() ? '' : setWinner("tie");
    }
    else if (dealerSum > 21 && yourSum < dealerSum) {
      setWinner("you");
    }
    else if (yourSum > 21 && dealerSum < yourSum) {
      setWinner("dealer");
    }
    else if (dealerSum < yourSum) {
      dealerHit() ? '' : setWinner("you")
    }
    else if (yourSum < dealerSum) {
      setWinner("dealer");
    }
  }

  function buildDeck(deck: Card[]): number {
    let sum = 0;

    for (let index = 0; index < 2; index++) {
      const card = new Card;
      sum = sum + card.value;
      deck.push(card);
    }

    return sum;
  }

  function hit() {
    if (yourSum < 21 && canHit) {
      const card = new Card();
      const newDeck = yourDeck;
      const newSum = yourSum + card.value;
      newDeck.push(card);

      setYourSum(newSum)
      setYourDeck(newDeck);
    } else {
      console.log(`%c your score goes over 21 `, `background: #222; color: #a8324c`);
      setCanHit(false);
      dealerPlay();
    }
  }

  function dealerHit() {
    if (dealerSum < 16) {
      const card = new Card();
      const newDeck = dealerDeck;
      const newSum = dealerSum + card.value;
      newDeck.push(card);

      setDealerSum(newSum)
      setDealerDeck(newDeck);

      return true;
    } else {
      return false;
    }
  }


  console.log(`dealerSum ${dealerSum}`);
  console.log(`%c ${yourSum} `, `background: #222; color: #bada55`);


  return (
    <div className="w-96 flex justify-center items-center flex-col h-auto">
      <a className="text-2xl text-secondary antialiased underline text-center mt-6" href="">https://github.com/erickctra</a>

      {/* dealer hand */}
      <div className="flex justify-center mt-20 relative scale-[0.8] md:scale-100">
        <h1 className="text-3xl text-primary absolute -top-8 -right-10">1</h1>

        <div className="bg-[url('/src/assets/cards/cardBack.png')] bg-cover w-24 h-36 z-10 -rotate-6 -mt-3"></div>
        <div className="bg-[url('/src/assets/cards/card.png')] bg-cover w-24 h-36 -ml-6"></div>
      </div>

      <div className="bg-[url('/src/assets/cards/dealerShadow.png')] bg-inherit bg-no-repeat w-40 h-4 mt-10"></div>


      {/* your hand */}
      <div id="playerHand" className="flex justify-center mt-20 relative scale-[0.8] md:scale-100">
        <h1 className="text-3xl text-primary absolute -top-8 -right-10">{yourSum}</h1>



        {yourDeck.map((card, index) => {
          return <div key={index} className="flex justify-center items-center text-6xl text-[#6D5C5C] bg-[url('/src/assets/cards/card.png')] bg-cover w-32 h-48 -ml-6">{card.figure}</div>
        })}
      </div>

      <div className="bg-[url('/src/assets/cards/yourShadow.png')] bg-inherit bg-no-repeat w-60 h-10 mt-10 relative scale-[0.8] md:scale-100"></div>

      {/* Game Controls */}

      <div className="mt-14">
      <div className="w-full h-[6px] rounded-full bg-shadow mb-4"></div>

        <div >
          <button className="text-3xl w-48 h-14 bg-primary text-bg rounded-md">hit</button>
          <button className="text-3xl w-14 h-14 bg-b-secondary text-bg rounded-md ml-4">.</button>
        </div>
        <a className="text-3xl text-secondary underline " href="">how to play</a>
      </div>

    </div>
  )
}

export default App
