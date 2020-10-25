import { isParenthesizedExpression } from 'typescript'

const gulp = require('gulp')
const svgSprite = require('gulp-svg-sprite')
const plumber = require('gulp-plumber')
const { config } = require('./config')
const cheerio = require('gulp-cheerio')
const clean = require('gulp-clean')
const svgSymbols = require('gulp-svg-symbols')
const rename = require('gulp-rename')

function cleanColorized(cb) {
  gulp.src(['colorized/']).pipe(clean())
  cb()
}

function cleanBuild(cb) {
  gulp.src(['build/']).pipe(clean())
  cb()
}

function svgCheerio(cb) {
  const colors = ['tomato', 'green', 'blue', 'brown']
  colors.forEach((color) => {
    gulp
      .src(['assets/*.svg'])
      .pipe(
        cheerio(function ($, file) {
          $('path').each(function () {
            var path = $(this)
            path.attr('fill', color)
          })
        })
      )
      .pipe(
        rename(function (path) {
          path.dirname = path.basename
          path.basename += `-${color}`
        })
      )
      .pipe(gulp.dest('colorized'))
    // .pipe(gulp.dest(`${color}`, { cwd: 'colorized' }))
  })
  cb()
}

function patchingTogether(cb) {
  gulp.src(['colorized/**/*.svg']).pipe(svgSymbols()).pipe(gulp.dest('patch'))

  cb()
}

function svgSpriteGenerator(cb) {
  gulp
    .src('**/*.svg', { cwd: './colorized' })
    .pipe(plumber())
    .pipe(svgSprite(config))
    .on('error', function (error) {
      console.log(error)
    })
    .pipe(gulp.dest('build'))
  cb()
}

exports.patch = patchingTogether
exports.cleanColorized = cleanColorized
exports.cleanBuild = cleanBuild
exports.cheerio = svgCheerio
exports.sprite = svgSpriteGenerator
exports.default = gulp.task(svgSpriteGenerator)
