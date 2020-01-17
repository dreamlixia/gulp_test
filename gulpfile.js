const { series, parallel, src, dest } = require('gulp')
const uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
var del = require('del');

const projectname = require('./package.json').name
const buildfile = '.build'
const PROJECT_DIR = projectname + '/' + buildfile

function delFiles(cb) {
  console.log('删除gulp_test文件')
  del(projectname)
  cb()
}

exports.buildModule = series(delFiles, streamTaskHtml, uglifyCss, uglifyJs)

function streamTaskHtml() {
  return src('src/*.html')
    .pipe(htmlmin())
    .pipe(dest(PROJECT_DIR + '/html/'));
}
exports.streamTaskHtml = streamTaskHtml;

function streamTaskImg() {
  return src(['src/img/*'])
    .pipe(dest(PROJECT_DIR + '/img/'));
}
exports.streamTaskImg = streamTaskImg;

function uglifyCss() {
  return src('src/css/*.css')
    .pipe(minifyCss())
    .pipe(dest(PROJECT_DIR + '/css'));
}
exports.uglifyCss = uglifyCss

//可用
function uglifyJs() {
  return src('src/*.js')
    .pipe(uglify())
    .pipe(dest(PROJECT_DIR + '/js'));
}
exports.uglifyJs = uglifyJs

const babel = require('gulp-babel')
function script() {
  return src('src/*')
      .pipe(babel({
          presets: ['es2015'] // es5检查机制
      }))
      .pipe(uglify())
      .on('error', function(err) {
          gutil.log(gutil.colors.red('[Error]'), err.toString());
      })
      .pipe('dist/*')
}
exports.script = script
// ------------------------- 分割线 -------------------------

function defaultTask(cb) {
  console.log(`新版gulp4.0.0的语法`)
  cb();
}

function clean(cb) {
  console.log(`clean时打印`)
  cb()
}

function build(cb) {
  console.log(`build时打印`)
  console.log(process.env.NODE_ENV)
  cb()
}

function promiseTask() {
  return Promise.resolve('the value is ignored');
}
exports.promiseTask = promiseTask;

const { EventEmitter } = require('events');
function eventEmitterTask() {
  const emitter = new EventEmitter();
  setTimeout(() => emitter.emit('finish'), 0);
  return emitter;
}
exports.eventEmitterTask = eventEmitterTask;

const { exec } = require('child_process');
function childProcessTask() {
  return exec('date');
}
exports.childProcessTask = childProcessTask;

const { Observable } = require('rxjs');
function observableTask() {
  return Observable.of(1, 2, 3);
}
exports.observableTask = observableTask;

exports.clean = clean
// exports.build = build
// exports.default = defaultTask
// exports.default = series(clean, build)
// exports.default = parallel(clean, build)
exports.build = series(clean, parallel(defaultTask, build), series(build, clean))