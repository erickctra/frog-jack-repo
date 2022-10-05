export interface cardProps {
  value: number;
  cardFigure: number;
}

export class Card {
  private props: cardProps;

	get value () {
		return this.props.value
	}

	get figure () {
		return this.props.cardFigure
	}

  constructor() {
    const randomValue = Math.floor(Math.random() * 13) + 1;
    
    const formatedValue = randomValue > 10 ? 10 : randomValue;
    const props: cardProps = { value: formatedValue, cardFigure: randomValue}

    this.props = props;
  }
}