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

  #setAnimationTimeout = (elem) => {
    setTimeout(() => {
      elem.classList.remove('hide');
    }, 100);

    setTimeout(() => {
      elem.classList.add('opac');
    }, 255);
  };

  #renderForecast = ({ city, current }) => {
    const currentWrapper = document.querySelector('.current__wrapper');
    const { time, tempC, weatherCondition, iconUrl } = current;

    currentWrapper.classList.add('hide');
    currentWrapper.classList.remove('opac');
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

    this.#setAnimationTimeout(currentWrapper);
  };

  #renderWeatherDetails = ({ current }) => {
    const detailsDivContainer = document.querySelector('.additional__wrapper');
    const { cloudy, windSpeed, humidity, rain } = current;

    detailsDivContainer.classList.add('hide');
    detailsDivContainer.classList.remove('opac');
    detailsDivContainer.textContent = '';

    detailsDivContainer.innerHTML = `
      <div class="additional__item">
        <div class="additional__detail-name">Cloudy</div>
        <div class="additional__detail-value">${cloudy}%</div>
      </div>

      <div class="additional__item">
        <div class="additional__detail-name">Humidity</div>
        <div class="additional__detail-value">${humidity}%</div>
      </div>

      <div class="additional__item">
        <div class="additional__detail-name">Wind</div>
        <div class="additional__detail-value">${windSpeed}km/h</div>
      </div>

      <div class="additional__item">
        <div class="additional__detail-name">Rain</div>
        <div class="additional__detail-value">${rain}mm</div>
      </div>
    `;

    this.#setAnimationTimeout(detailsDivContainer);
  };

  #renderDailyForecast = ({ daily }) => {
    const dailyForecastWrapper = document.querySelector('.daily__wrapper');
    let dailyForecastTemplate = '';

    dailyForecastWrapper.classList.add('hide');
    dailyForecastWrapper.classList.remove('opac');
    dailyForecastWrapper.textContent = '';

    daily.forEach((item) => {
      const { day, minTempC, maxTempC, iconUrl } = item;

      dailyForecastTemplate += `
        <div class="daily__item">
          <p class="daily_day">${day}</p>
          <div class="daily__icon">
            <img src="${iconUrl}" alt="weather icon">
          </div>
          <div class="daily_degrees">${minTempC}&deg; / ${maxTempC}&deg;</div>
        </div>
      `;
    });

    dailyForecastWrapper.innerHTML = dailyForecastTemplate;
    this.#setAnimationTimeout(dailyForecastWrapper);
  };

  renderApp = (data) => {
    const error = document.querySelector('.error');
    const errorMessage = document.querySelector('.error__text');

    if (data.error) {
      this.#mainContent.classList.add('hide');
      error.classList.remove('hide');
      errorMessage.textContent = data.error.message;
    } else {
      this.#mainContent.classList.remove('hide');
      error.classList.add('hide');
      errorMessage.textContent = '';

      this.#renderForecast(data);
      this.#renderWeatherDetails(data);
      this.#renderDailyForecast(data);
    }
  };
}

export default DomStuff;
