class DomStuff {
  #mainContent = document.querySelector('.current');

  loading = (state) => {
    const loaderSvg = document.querySelector('.loading');
    const errorBlock = document.querySelector('.error');

    if (state === 'loading') {
      loaderSvg.classList.remove('hide');
      errorBlock.classList.add('hide');
      this.#mainContent.classList.add('hide');
    } else {
      loaderSvg.classList.add('hide');
      this.#mainContent.classList.add('remove');
    }
  };

  renderForecast = ({ city, current }) => {
    const currentWrapper = document.querySelector('.current__wrapper');
    const { time, tempC, weatherCondition, iconUrl } = current;

    currentWrapper.textContent = '';

    currentWrapper.innerHTML = `
      <div class="current__degree">${tempC}&deg;</div>
      <div class="current__date">
        <div class="current__city">${city}</div>
        <div class="current__date">${time}</div>
      </div>
      <div class="current__weather">
        <div class="current__img">
          <img src="${iconUrl}" alt="weather icon">
        </div>
        <div class="current__weather-descr">${weatherCondition}</div>
      </div>
    `;
  };

  renderApp = (data) => {
    const error = document.querySelector('.error');
    const errorMessage = document.querySelector('.error__text');
    console.log(data);
    if (data.error) {
      this.#mainContent.classList.add('hide');
      error.classList.remove('hide');
      errorMessage.textContent = data.error.message;
    } else {
      this.#mainContent.classList.remove('hide');
      error.classList.add('hide');
      errorMessage.textContent = '';

      this.renderForecast(data);
    }
  };
}

export default DomStuff;
