'use strict';

let cfg = {
	source: {
		folder: 'src/',
		html: 'src/slides.html',
		md:   'src/slides.md',
	},
	build: {
		html: 'build/slides.html',
		js: 'build/js/vendor/',
	},
};


require('longjohn');
let R = require('ramda');
let gulp = require('gulp');
let gutil = require('gulp-util');
let fsp = require('fs-promise');
let bowerFiles = require('gulp-main-bower-files');
let es = require('event-stream');
let argv  = require('yargs').argv;
let watch = require('node-watch');


gulp.task('default', ['build']);

gulp.task('build', (done) => {
	if (!argv.watch) {
		makeBuild()
		.then(R.nAry(0, done), done);
	} else {
		watch(cfg.source.folder, makeBuild);
		done();
	}
});

let makeBuild = () => {
	return new Promise((resolve, reject) => {
		Promise.all([
			fsp.readFile(cfg.source.md,   { encoding: 'utf-8' }),
			fsp.readFile(cfg.source.html, { encoding: 'utf-8' })
		])
		.then(R.apply(R.replace('<!-- SLIDES GO HERE -->')))
		.then(R.curryN(3, fsp.writeFile) (cfg.build.html, R.__, { encoding: 'utf-8' }))
		.then(R.tap(() => gutil.log('Built.')))
		.then(resolve, reject);
	});
};

gulp.task('vendor', () => {
	return gulp.src('bower.json')
		.pipe(bowerFiles())
		.pipe(es.mapSync(R.tap(console.log)))
		.pipe(gulp.dest(cfg.build.js));
})
