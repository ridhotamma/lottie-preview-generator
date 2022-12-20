# lottie-preview-generator
Generate lottie animation from local files

# how to use it?

```
1. create location path name
2. list all the lottie json files
3. instatiate the class

example:

// your local lottie files
const LOTTIE_ANIMATION_PATH = '/static/json';

// your lottie list based on name in the directory
const LOTTIE_LIST = ['animation-1', 'animation-2', 'animation-3']

// element to inject by generator
const targetElement = document.querySelector('.animation-container')

const options = {
  targetElement: targetElement,
  path: LOTTIE_ANIMATION_PATH,
  animationList: LOTTIE_LIST
}

new AnimationList(options)
```
