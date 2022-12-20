class AnimationList {
  constructor({ animationList, path, targetElement }) {
    const animationListErrorMsg = 'Animation List Required, please provide the lottie animation list name'
    const pathErrorMsg = 'Animation List Required, please provide the lottie animation list name'
    const targetElementErrorMsg = 'Target element is Required, please provide an element to inject the html'

    if (!animationList.length || animationList === 'undefined') this.#exceptionHandler(animationListErrorMsg)
    if (!path || path === 'undefined') this.#exceptionHandler(pathErrorMsg)
    if (!targetElement || targetElement === 'undefined') this.#exceptionHandler(targetElementErrorMsg)


    if (typeof bodymovin === 'undefined') {
      this.#loadExternalScript().then((value) => console.log(value)).catch((error) => console.error(error))
    }

    // add all the required styles for the list
    this.#addStyle(`
    body {
      color: inherit;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
      text-align: center;
    }

    code {
      font-family: Consolas, 'courier new';
      color: greenyellow;
      background-color: black;
      padding: 2px;
      font-size: 105%;
    }

    .code-container {
      padding: 1em;
      width: 60%;
      margin: 0 auto;
      text-align: left;
      background-color: black;
      margin-bottom: 3em;
    }

    .animation-container {
      width: 60%;
      margin: 0 auto;
      height: 50vh;
      object-fit: contain;
      overflow-y: scroll;
      background-color: grey;
      margin-bottom: 4em;
      transition: background-color ease-in-out 200ms;
      color: white;
    }

    .title-code {
      color: yellow;
      font-family: Consolas, 'courier new';
      font-size: 1em;
      margin-left: 4em;
    }

    .color-list-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2em;
      margin-bottom: 2em;
    }

    .border-option {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }

    .color-maroon {
      background-color: maroon;
    }

    .color-yellow {
      background-color: yellow;
    }

    .color-white {
      background-color: white;
    }

    .color-blue {
      background-color: blue;
    }

    .color-grey {
      background-color: grey;
    }

    .color-active {
      border: 4px black solid;
    }
    `);

    this.#init(animationList, path, targetElement)
  }

  /**
   * @description function to generate html of the animation list from local lottie files
   * @param {string[]} animationList 
   * @param {string} path 
   * @param {HTMLElement | string} targetElement 
   */
  #init(animationList, path, targetElement) {
    const LOTTIE_ANIMATION_PATH = path;

    animationList.forEach((animation) => {
      const element = document.createElement('div');
      element.setAttribute('id', animation);
      element.setAttribute('class', 'animation-container');

      const title = document.createElement('h1');
      title.textContent = animation;
      element.append(title);

      const codeContainer = document.createElement('div');
      const htmlParagraph = document.createElement('pre');
      const htmlParagraphText = document.createElement('code');

      const jsParagraph = document.createElement('pre');
      const jsParagraphText = document.createElement('code');

      htmlParagraph.innerHTML += `<span class="title-code">// html code</span>`;
      htmlParagraphText.textContent = `
        <div id="${animation}"></div>
        `;
      htmlParagraph.append(htmlParagraphText);

      jsParagraph.innerHTML += `<span class="title-code">// register Bodymovin</span>`;
      jsParagraphText.textContent = `
        bodymovin.loadAnimation({
          container: document.getElementById('${animation}'),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '${LOTTIE_ANIMATION_PATH}${animation}.json',
          name: ${animation},
        })
        `;
      jsParagraph.append(jsParagraphText);

      codeContainer.append(htmlParagraph, jsParagraph);
      codeContainer.setAttribute('class', 'code-container');

      const colorListContainer = document.createElement('div');
      colorListContainer.setAttribute('class', 'color-list-container');
      const colorList = ['grey', 'yellow', 'maroon', 'white', 'blue'];

      colorList.forEach((color) => {
        const borderOption = document.createElement('span');
        borderOption.setAttribute('class', `border-option color-${color}`);
        borderOption.setAttribute('data-color', color);
        colorListContainer.append(borderOption);
      });

      let elementToappend;
      if (typeof targetElement === 'string') elementToappend = document.querySelector(targetElement);
      else if (typeof targetElement === 'object') elementToappend = targetElement;
      else this.#exceptionHandler('Target Element should be css selector, or HTMLElement')

      elementToappend.append(element, colorListContainer, codeContainer);
      elementToappend.style.padding = '2em 0em';
    });

    const borderOptions = document.querySelectorAll('.border-option');

    borderOptions.forEach((option) => {
      option.addEventListener('click', () => {
        const animationContainers = document.querySelectorAll(
          '.animation-container'
        );
        animationContainers.forEach((container) => {
          container.style.backgroundColor = option.getAttribute('data-color');
        });
      });
    });

    setTimeout(() => {
      animationList.forEach((animation) => {
        bodymovin.loadAnimation({
          container: document.getElementById(animation),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: `${LOTTIE_ANIMATION_PATH}/${animation}.json`,
          name: animation,
        });
      });
    }, 1000)
  }

  /**
   * @description function to inject css style to the page
   * @param {string} styleString 
   */
  #addStyle(styleString) {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
  }


  /**
   * @default function to load external script (cdn/other)
   */
  #loadExternalScript() {
    return new Promise((resolve, reject) => {
      const lottieScript = document.createElement('script')
      lottieScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.10.0/lottie.min.js')
      lottieScript.setAttribute('integrity', 'sha512-17otjw7eTNU9MtpB7mFfXEwB6yDjA2qjDFkKSvsywI1PRAgpyOo+cp/wPSE/1kK4fFjA9OKsZVO1tr93MGNCEw==')
      lottieScript.setAttribute('crossorigin', 'anonymous')
      lottieScript.setAttribute('referrerpolicy', 'no-referrer')
      lottieScript.async = true
      document.head.appendChild(lottieScript)

      resolve('cdn loaded')
      reject('error on get cdn...')
    })
  }

  /**
   * @description function to handle error exception
   * @param {string} message 
   */
  #exceptionHandler(message) {  
    throw new ReferenceError(message)
  }
}
