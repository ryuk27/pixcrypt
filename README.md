# Pixcrypt

Welcome to **Pixcrypt**—the superhero of image encryption! 🦸‍♂️🦸‍♀️ This nifty little CLI tool allows you to turn your precious images into a pile of gibberish 🧩 and provides you with a magic key 🗝️ to unlock it later. Because, hey, no one else gets to peek at your pics without your permission!

![GitHub package.json version](https://img.shields.io/github/package-json/v/ryuk27/pixcrypt?style=for-the-badge)&nbsp;
![GitHub Repo stars](https://img.shields.io/github/stars/ryuk27/pixcrypt?logo=github&style=for-the-badge)
![npm](https://img.shields.io/npm/dt/pixcrypt?style=for-the-badge&logo=npm)

## Table of Contents

- [Pixcrypt](#pixcrypt)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
  - [Commands](#commands)
  - [Options](#options)
- [Examples](#examples)
  - [Encrypting an Image](#encrypting-an-image)
  - [Decrypting an Image](#decrypting-an-image)
- [Limitations](#limitations)

## Tech Stack

Built with the magic of **Node.js**! 🎩✨

![Node](https://img.shields.io/badge/NodeJS-05122A?style=for-the-badge&logo=node.js)&nbsp;

## Installation

To install Pixcrypt and start encrypting like a pro:

```sh
npm i -g pixcrypt
```

Don’t want to install it? No worries! You can use it right from the web with npx:

```sh
npx pixcrypt <command> [option]
```

## Usage

Let the fun begin! Use Pixcrypt like this:

```sh
pixcrypt <command> [option]
```

### Commands

- **`help`**: Need a hand? This will show you all the cool things Pixcrypt can do! 😎

### Options

- **`-e, --encrypt`**: Turn your image into a mystery! 🔒
- **`-d, --decrypt`**: Unlock the mystery with your magic key 🗝️
- **`-c, --clear`**: Clear the console (because who likes clutter?) 💨
- **`--noClear`**: Don't clear the console, if you're feeling rebellious. 😎
- **`-v, --version`**: Show off the Pixcrypt version (you're probably using the coolest one!). 🎉
- **`-k, --key`**: Provide the key you saved to decrypt your masterpiece. 🗝️
- **`-i, --outputImageFileName`**: Name your encrypted (or decrypted) image like a true artist. 🎨
- **`-p, --outputKeyFileName`**: Name the key file (because it's important!). 🗃️

## Examples

### Encrypting an Image
To encrypt `myImage.png` and call it `encryptedImageName.png` while saving the key to `keyFile.txt`, run:

```sh
pixcrypt -e myImage.png -i encryptedImageName.png -p keyFile.txt
```

output

```sh
pixcrypt v0.0.1 by ryuk27
An image encryption node-js CLI

✔ Image read successfully
✔ Output image file name is valid
✔ Output key file name is valid
✔ Image data read successfully
✔ Key generated successfully
✔ Image encrypted successfully
✔ Image saved successfully
✔ Key saved successfully

✔ Image encrypted successfully  
   Encrypted Image: encryptedImageName.png  
   Key: keyFile.txt

Give it a star on GitHub: https://github.com/ryuk27/pixcrypt
```

## Decrypting an Image

To decrypt `encryptedImage.png` using `key.txt` and get back `decryptedImage.png`, run:

```sh
pixcrypt -d encryptedImage.png -k key.txt -i decryptedImage.png
```

output

```sh
pixcrypt v0.0.1 by ryuk27
An image encryption node-js CLI

✔ Image read successfully
✔ Key read successfully
✔ Decryption successful
✔ Image saved successfully

✔ Image decrypted successfully  
   Decrypted Image: decryptedImage.png

Give it a star on GitHub: https://github.com/ryuk27/pixcrypt
```
## Limitations

Limitations
PNG Images: Encryption and decryption work like a charm! 🖼️🔐
JPG/JPEG Images: These formats are a bit cheeky and lossy, so some pixel values may change during the process. But don’t worry, your image will still look nearly identical, just with a few quirky differences. 🤪
Go ahead and encrypt those images! Have fun, and if you like Pixcrypt, give it a star on GitHub. 🎉
