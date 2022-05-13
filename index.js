import sizeOf from 'image-size';
import * as fs from 'fs';
import * as path from 'path';
import imageThumbnail from 'image-thumbnail';

const inputFilePath = 'input';
const outputFilePath = 'output';

(async () => {
	let files = fs.readdirSync(inputFilePath)

	files.forEach((file) => {
		let extname = path.extname(file).toLowerCase();
		if (extname === '.jpg' || extname === '.jpeg' || extname === '.png') {
			let imagePathInput = inputFilePath + '/' + file;
			let imagePathOutput = outputFilePath + '/' + file;

			let dimensions = sizeOf(imagePathInput);
			let imageWidth = dimensions.width;
			let imageHeight = dimensions.height;

			if (imageWidth > imageHeight && imageWidth > 1200) {
				imageThumbnail(imagePathInput, {
					width: 1200,
					jpegOptions: {
						force: true,
						quality: 90
					}
				}).then(imageMini => {
					fs.writeFileSync(imagePathOutput, imageMini);
				});
			}
			else if (imageHeight > imageWidth && imageHeight > 1200) {
				imageThumbnail(imagePathInput, {
					height: 1200,
					jpegOptions: {
						force: true,
						quality: 90
					}
				}).then(imageMini => {
					fs.writeFileSync(imagePathOutput, imageMini);
				});
			}
			else {
				imageThumbnail(imagePathInput, {
					width: imageWidth,
					height: imageHeight,
					jpegOptions: {
						force: true,
						quality: 90
					}
				}).then(imageMini => {
					fs.writeFileSync(imagePathOutput, imageMini);
				});
			}
		}
	})

	console.log('Images optimized');
})();