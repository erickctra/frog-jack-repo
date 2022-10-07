import React, { Component } from "react";
import { useEffect, useState } from "react";
import { Card } from "./entities/card";



function App() {

  const [gameStarted, setGameStarted] = useState(false);

  const [dealerDeck, setDealerDeck] = useState<Card[]>([]);
  const [yourDeck, setYourDeck] = useState<Card[]>([]);

  const [dealerSum, setDealerSum] = useState(0);
  const [yourSum, setYourSum] = useState(0);


  const [seconds, setSeconds] = useState(0);
  const [stopLoading, setStopLoading] = useState(true);

  const [canPlay, setCanPlay] = useState(true);


  const [winner, setWinner] = useState<'dealer' | 'you' | 'tie' | ''>('');

  useEffect(() => {
    // start game / deal cards
    if (!gameStarted) {
      setDealerSum(buildDeck(dealerDeck));
      setYourSum(buildDeck(yourDeck));
    }
    console.log(" ")
  }, [])

  yourSum > 21 ? console.log(`%c estourou `, `background: #222; color: #a8324c`) : '';
  // yourSum === 21 ? console.log(`%c ganhou `, `background: #222; color: #bada55`) : '' ;
  winner != '' ? console.log(`%c ${winner} ganhou `, `background: #222; color: #eba434`) : null;

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

  var timer: number;
  var ll: boolean = true;


  // se o contador zerar/ jogador sem movimentos/ passar, o dealer irá jogar
  useEffect(() => {
    console.log('outro player')
  }, [canPlay])

  // timer de 6 segundos, caso o jogador nao jogue ele perde a vez.

  useEffect(() => {
    if (yourDeck.length > 2) {
      timer = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000)

      setStopLoading(true);

      console.log(seconds);
      if (seconds >= 6) {
        clearInterval(timer);
        setStopLoading(false);
      }

      seconds >= 6 ? setCanPlay(false) : '';
      yourSum >= 21 ? setStopLoading(false) : '';
      yourSum >= 21 ? setSeconds(10) : '';

      return () => clearInterval(timer);
    }

  }, [seconds]);


  const restart = () => {
    if (canPlay) {
      clearInterval(timer);
      setSeconds(10);

      setCanPlay(false);
      dealerPlay();
    } else {
      console.log('you cant play')
    }
  }
  const stopT = () => {

    if (canPlay) {
      clearInterval(timer);
      setSeconds(10);


      if (yourSum < 21) {

        const card = new Card();
        const newDeck = yourDeck;
        const newSum = yourSum + card.value;
        newDeck.push(card);

        setYourSum(newSum)
        setYourDeck(newDeck);

        setSeconds(0);
        setStopLoading(false);

      } else {
        console.log('voce ja tem 21, nao deveria comprar mais')
      }
    } else {
      console.log('you cant play')
    }
  }

  return (
    <div className="w-96 flex justify-center items-center flex-col h-auto">
      <a className="text-2xl text-secondary antialiased underline text-center mt-6" href="">https://github.com/erickctra</a>

      {/* dealer hand */}
      <div className="flex justify-center mt-20 relative scale-[0.8] md:scale-100">
        <h1 className="text-3xl text-primary absolute -top-8 -right-10">{dealerSum}</h1>

        {dealerDeck.map((card, index) => {
          if (canPlay) {
            const hidden = index == 0 ? "bg-[url('/src/assets/cards/cardBack.png')] -rotate-6 -mt-3" : "bg-[url('/src/assets/cards/card.png')]";
            return <div key={index} className={`flex justify-center items-center text-4xl text-[#6D5C5C]  bg-cover w-24 h-36 -ml-6 ${hidden}`}>{index != 0 ? card.figure : ''}</div>
          } else {
            return <div key={index} className={`flex justify-center items-center text-4xl text-[#6D5C5C] bg-[url('/src/assets/cards/card.png')] bg-cover w-24 h-36 -ml-6`}>{card.figure}</div>
          }
        })}
      </div>

      <div className="bg-[url('/src/assets/cards/dealerShadow.png')] bg-inherit bg-no-repeat w-40 h-4 mt-10"></div>

      {canPlay ? '' : '...'}


      {/* your hand */}
      <div id="playerHand" className="flex justify-center mt-20 relative scale-[0.7] md:scale-100">
        <h1 className="text-3xl text-primary absolute -top-8 -right-10">{yourSum}</h1>

        {yourDeck.map((card, index) => {
          return <div key={index} className={`flex justify-center items-center text-6xl text-[#6D5C5C] bg-[url('/src/assets/cards/card.png')] bg-cover w-32 h-48 -ml-6 animate-getCard -rotate-2`}>{card.figure}</div>
        })}

        {yourSum > 21 ? <h1 className="text-red-500 text-4xl absolute top-0 z-50 animate-getAlert">estourou</h1> : null}

      </div>

      <div className="bg-[url('/src/assets/cards/yourShadow.png')] bg-inherit bg-no-repeat w-60 h-10 mt-10 relative scale-[0.8] md:scale-100"></div>

      {/* Game Controls */}

      <div className="mt-14">
        <div className="w-full h-[6px] rounded-full bg-shadow mb-4 relative">
          {stopLoading && yourDeck.length > 2 ? (

            <div className="absolute top-0 bottom-0 bg-primary animate-actionLoader"></div>
          ) : ''}
        </div>

        {/* {loading ? loadingBar() : ''} */}

        <div >
          <button onClick={stopT} className={`text-3xl w-48 h-14 rounded-md ${canPlay ? 'bg-primary text-bg' : 'bg-shadow text-secondary'} transition-all`}>hit</button>
          <button onClick={restart} className="text-3xl w-14 h-14 bg-b-secondary text-bg rounded-md ml-4">.</button>
        </div>
        <a className="text-3xl text-secondary underline " href="">how to play</a>
      </div>

    </div>
  )
}

export default App
