class DomStuff {
  #mainContent = document.querySelector('.current');

  loading = (state) => {
    const loaderSvg = document.querySelector('loading');
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
}
