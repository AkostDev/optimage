import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import sizeOf from 'image-size';
import * as fs from 'fs';
import * as path from 'path';
import imageThumbnail from 'image-thumbnail';

const inputFilePath = 'input';
const outputFilePath = 'output';

(async () => {
	let files = await fs.readdirSync(inputFilePath);

	await files.forEach(async file => {
		let extname = path.extname(file).toLowerCase();
		if (extname == '.jpg' || extname == '.png') {
			let imagePath = inputFilePath + '/' + file;
			let dimensions = sizeOf(inputFilePath + '/' + file);
			let imageWidth = dimensions.width;
			let imageHeight = dimensions.height;

			if (imageWidth > imageHeight && imageWidth > 1200) {
				let imageMini = await imageThumbnail(imagePath, {
					width: 1200
				})
				fs.writeFileSync(imagePath, imageMini);
			}
			else if (imageHeight > imageWidth && imageHeight > 1200) {
				let imageMini = await imageThumbnail(imagePath, {
					height: 1200
				})
				fs.writeFileSync(imagePath, imageMini);
			}
		}
	});

	await imagemin([inputFilePath + '/*.{jpg,png,JPG,PNG}'], {
		destination: outputFilePath,
		plugins: [
			imageminMozjpeg({
                quality: 80
            }),
            imageminPngquant()
		],
	});

	console.log('Images optimized');
})();