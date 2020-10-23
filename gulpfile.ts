const gulp = require('gulp')
const svgSprite = require('gulp-svg-sprite')
const plumber = require('gulp-plumber')

function sprite(cb) {
  const config2 = {
    shape: {
      dimension: {
        // Set maximum dimensions
        maxWidth: 64,
        maxHeight: 64,
      },
      spacing: {
        // Add padding
        // paddingBottom: 32,
        // paddingTop: 0,
        // paddingLeft: 16,
        // paddingRight: 16,
        padding: [0, 16, 32, 16],
      },
      dest: 'out/intermediate-svg', // Keep the intermediate files
    },
    mode: {
      view: {
        // Activate the «view» mode
        bust: false,
        render: {
          scss: true, // Activate Sass output (with default options)
        },
      },
      symbol: true, // Activate the «symbol» mode
    },
  }
  gulp
    .src('**/*.svg', { cwd: './assets' })
    .pipe(plumber())
    .pipe(svgSprite(config2))
    .on('error', function (error) {
      console.log(error)
    })
    .pipe(gulp.dest('out'))
  cb()
}

exports.sprite = sprite
exports.hello = hello
exports.build = build
exports.default = gulp.series(clean, build)
