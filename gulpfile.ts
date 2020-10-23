const gulp = require('gulp')
const svgSprite = require('gulp-svg-sprite')
const plumber = require('gulp-plumber')
const { config } = require('./config')

function svgSpriteGenerator(cb) {
  gulp
    .src('**/*.svg', { cwd: './assets' })
    .pipe(plumber())
    .pipe(svgSprite(config))
    .on('error', function (error) {
      console.log(error)
    })
    .pipe(gulp.dest('out'))
  cb()
}

exports.sprite = sprite
exports.default = gulp.task(svgSpriteGenerator)
