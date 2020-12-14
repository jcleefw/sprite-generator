const gulp = require('gulp')
const svgSprite = require('gulp-svg-sprite')
const plumber = require('gulp-plumber')
const { config } = require('./config')
const cheerio = require('gulp-cheerio')
const clean = require('gulp-clean')
const rename = require('gulp-rename')
const fs = require('fs')
const colors = require('./colors').default

function cleanup(cb) {
  gulp.src(['colorized/']).pipe(clean())
  gulp.src(['build/']).pipe(clean())
  cb()
}

function svgCheerio(cb) {
  Object.entries(colors).forEach(([key, value]) => {
    gulp
      .src(['assets/*.svg'])
      .pipe(
        cheerio(function ($, file) {
          $('path').each(function () {
            var path = $(this)
            if (path.attr('fill')) {
              path.attr('fill') === 'grey'
                ? path.attr('fill', value['fade'])
                : path.attr('fill', value['solid'])
            }

            if (path.attr('stroke')) {
              path.attr('stroke', value['solid'])
            }
          })
        })
      )
      .pipe(
        rename(function (path) {
          // path.dirname = path.basename // use this if you want to horizontal group the same symbol in a row
          path.dirname = key // use this if you want to horizontal group the same color in a row
          path.basename += `-${key}`
        })
      )
      .pipe(gulp.dest('colorized'))
  })
  cb()
}

function svgRowSpriteGenerator(cb) {
  const dirs = fs.readdirSync('./colorized')
  dirs.forEach((dir) => {
    gulp
      .src(`./${dir}/*.svg`, { cwd: './colorized' })
      .pipe(plumber())
      .pipe(svgSprite(config('horizontal', [0, 16, 32, 16])))
      .on('error', function (error) {
        console.log(error)
      })
      .pipe(gulp.dest(`${dir}`, { cwd: 'colorized/horizontal' }))
  })

  cb()
}

function svgPackedSpriteGenerator(cb) {
  const dirs = fs.readdirSync('./colorized')
  dirs.forEach((dir) => {
    gulp
      .src(`**/*.svg`, { cwd: './colorized/horizontal' })
      .pipe(plumber())
      .pipe(svgSprite(config('vertical')))
      .on('error', function (error) {
        console.log(error)
      })
      .pipe(gulp.dest('build'))
  })

  cb()
}

exports.pack = svgPackedSpriteGenerator
exports.spriteRow = svgRowSpriteGenerator
exports.cheerio = svgCheerio
exports.cleanup = cleanup
exports.default = gulp.series(svgCheerio, svgRowSpriteGenerator, svgPackedSpriteGenerator)
