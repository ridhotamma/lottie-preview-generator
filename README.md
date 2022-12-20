# lottie-preview-generator
Generate lottie animation from local files

# how to use it?

```
1. create location path name variable
2. list all the lottie json files from your local directories
3. instatiate the class


you may have the folder structure like this:
├── static
│   ├── json
│   │   ├── animation-1
│   │   ├── animation-2
│   │   ├── animation-3
├── images
├── js

example:

// your local lottie files
const LOTTIE_ANIMATION_PATH = '/static/json';

// your lottie list based on name in the directory
const LOTTIE_LIST = ['animation-1', 'animation-2', 'animation-3']

// element to inject by generator
const targetElement = document.querySelector('.test')

const options = {
  targetElement: targetElement,
  path: LOTTIE_ANIMATION_PATH,
  animationList: LOTTIE_LIST
}

new AnimationList(options)
```
