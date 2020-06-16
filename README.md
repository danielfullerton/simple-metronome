# Simple Metronome

A lightweight, extensible, open source metronome.

## Prerequisites
To run the program locally, you will need:
* npm 
* nodejs

## Getting Started

    $ git clone https://github.com/danielfullerton/simple-metronome.git
    $ cd simple-metronome
    $ npm install
    $ npm run start:dev

_(Windows commands will differ slightly)_

After running the above, you can access the program at http://localhost:4200.

Alternatively, you can build the project using

    $ tsc
    
and run the bundled _**dist/index.js**_ file statically.

## Built With

* [Tone.js](https://tonejs.github.io/) - Used for loading/playing audio files
* [Typescript](https://www.typescriptlang.org/)
* [freeSFX](https://freesfx.co.uk/) - Provider of free SFX for metronome sounds.

## Authors

* **Daniel Fullerton** - [GitHub Page](https://github.com/danielfullerton)

## License

This project is licensed under the MIT License.
