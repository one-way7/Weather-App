import Api from './api';
import DomStuff from './domstuff';

class Handlers {
  #api = new Api();

  #domStuff = new DomStuff();

  #searchButton = document.querySelector('.additional__button');

  #searchInput = document.querySelector('.additional__input input');

  load = async (city = 'Paris') => {
    this.#domStuff.loading('loading');
    const weatherData = await this.#api.getWeatherData(city);
    this.#domStuff.renderApp(weatherData);
    this.#domStuff.loading('finished');
  };

  #handleClick = () => {
    const input = this.#searchInput.value.trim();
    if (input === '') return;
    this.load(input);
  };

  clickHandler = () => {
    this.#searchButton.addEventListener('click', this.#handleClick);
  };
}

export default Handlers;
