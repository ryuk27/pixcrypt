const alert = require('cli-alerts');
const fs = require('fs');
const jimp = require('jimp');
const path = require('path');

// Function to decrypt an image
const decrypt = async flags => {
	// Ensure both --encrypt and --decrypt flags are not used together
	if (flags.encrypt) {
		alert({
			type: `warning`,
			name: `Invalid combination of flags`,
			msg: `Cannot use both --encrypt and --decrypt flags together`
		});
		process.exit(1);
	}

	// Get the file path for decryption
	const filePath = flags.decrypt;

	// Validate if a file path is provided
	if (!filePath) {
		alert({
			type: `warning`,
			name: `Invalid file path`,
			msg: `Please provide a valid file path`
		});
		process.exit(1);
	}

	// Check if the provided file path exists
	if (!fs.existsSync(filePath)) {
		alert({
			type: `warning`,
			name: `Invalid file path`,
			msg: `File does not exist, please provide a valid file path`
		});
		process.exit(1);
	}

	// Ensure a decryption key is provided
	if (!flags.key) {
		alert({
			type: `warning`,
			name: `Invalid key`,
			msg: `Please provide a valid key with --key/-k`
		});
		process.exit(1);
	}

	try {
		// Start spinner for reading the image
		const ora = (await import('ora')).default;
		const spinner = ora(`Reading Image...`).start();

		// Read the image file
		const image = await jimp.read(filePath);

		// Extract image metadata
		const extension = image.getExtension();
		const rgba = image.bitmap.data;
		const length = rgba.length;

		spinner.succeed(`Image read successfully`);

		// Start spinner for reading the key
		const spinner2 = ora(`Getting the key`).start();

		// Validate the key file path
		const keyPath = flags.key;
		if (!fs.existsSync(keyPath)) {
			spinner2.fail(`Invalid key path`);
			alert({
				type: `error`,
				name: `Invalid key path`,
				msg: `Please provide a valid key path with --key/-k`
			});
			process.exit(1);
		}

		// Decode the key from the file
		const key = fs.readFileSync(keyPath, 'utf8');
		const keyDecoded = Buffer.from(key, 'base64');
		const keyArray = Array.from(keyDecoded);

		// Validate the key length against the image data
		if (keyArray.length !== length) {
			spinner2.fail(`Invalid key`);
			alert({
				type: `error`,
				name: `Invalid key`,
				msg: `The key length does not match the image data`
			});
			process.exit(1);
		}

		spinner2.succeed(`Key read successfully`);

		// Start spinner for decryption
		const spinner3 = ora(`Decrypting...`).start();

		// Perform decryption by XORing each byte with the corresponding key byte
		for (let i = 0; i < length; i++) {
			rgba[i] = rgba[i] ^ keyArray[i];
		}

		// Update the image data with the decrypted data
		image.bitmap.data = rgba;

		spinner3.succeed(`Decryption successful`);

		// Start spinner for saving the decrypted image
		const spinner4 = ora(`Saving image...`).start();

		// Generate output file name
		const fileName = path.basename(filePath).replace(/\_encrypted$/, '');
		let fileNameWithoutExtension = `${fileName.split('.')[0]}_decrypted`;

		// Use custom file name if provided
		if (flags.outputImageFileName) {
			fileNameWithoutExtension = flags.outputImageFileName.split('.')[0];
		}

		// Ensure the output file name does not already exist
		if (fs.existsSync(`${fileNameWithoutExtension}.${extension}`)) {
			spinner4.fail(`Output image file already exists`);
			alert({
				type: `error`,
				name: `Output image file already exists: ${fileNameWithoutExtension}.${extension}`,
				msg: `Please provide a different file name with --outputImageFileName/-i flag`
			});
			process.exit(1);
		}

		// Save the decrypted image
		image.write(`${fileNameWithoutExtension}.${extension}`);
		spinner4.succeed(`Image saved successfully`);

		// Display success message
		alert({
			type: `success`,
			name: `Success`,
			msg: `Image decrypted successfully\nDecrypted Image: ${fileNameWithoutExtension}.${extension}`
		});
	} catch (err) {
		// Handle errors during decryption
		alert({
			type: `error`,
			name: `Error`,
			msg: `${err}`
		});
	}
};

module.exports = decrypt;
