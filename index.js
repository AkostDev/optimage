import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

(async () => {
	await imagemin(['input/*.jpg', 'input/*.png'], {
		destination: 'output',
		plugins: [
			imageminMozjpeg({
                quality: 70
            }),
            imageminPngquant()
		],
	});

	console.log('Images optimized');
})();