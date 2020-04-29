const { series, parallel, src, dest, lastRun, watch } = require('gulp')
const uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
var del = require('del');
var preprocess = require('gulp-preprocess')

const projectname = require('./package.json').name
const buildfile = '.build'
const PROJECT_DIR = projectname + '/' + buildfile

//环境变量
const env = process.env.NODE_ENV
let target = env === 'production' ? './dist' : './pre'
console.log('当前环境：'+env+'对应打包地址：'+target)

function delFiles(cb) {
  del(projectname)
  cb()
}

function streamTaskHtml() {
  return src('src/*.html')
    .pipe(preprocess({
        context: {
        // 此处可接受来自调用命令的 NODE_ENV 参数，默认为 development 开发测试环境
          NODE_ENV: process.env.NODE_ENV || 'development',
        },
    })) 
    .pipe(htmlmin())
    .pipe(dest(PROJECT_DIR + '/html/'));
}
exports.streamTaskHtml = streamTaskHtml;

function images() {
  // return src('src/img/*', { since: lastRun(images) })
  return src('src/img/*.jpg', { since: lastRun(images) })
    .pipe(imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
      svgoPlugins: [{
          removeViewBox: false
      }],
  }))
    .pipe(dest(PROJECT_DIR + '/img/'));
}
exports.images = images

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

exports.buildModule = series(delFiles, streamTaskHtml, uglifyCss, uglifyJs)//images


// ------------------------- 分割线 (以下为练习) -------------------------

// function defaultTask(cb) {
//   console.log(`新版gulp4.0.0的语法`)
//   cb();
// }

// function clean(cb) {
//   console.log(`clean时打印`)
//   cb()
// }

// function build(cb) {
//   console.log(`build时打印`)
//   console.log(process.env.NODE_ENV)
//   cb()
// }

// function promiseTask() {
//   return Promise.resolve('the value is ignored');
// }
// exports.promiseTask = promiseTask;

// const { EventEmitter } = require('events');
// function eventEmitterTask() {
//   const emitter = new EventEmitter();
//   setTimeout(() => emitter.emit('finish'), 0);
//   return emitter;
// }
// exports.eventEmitterTask = eventEmitterTask;

// const { exec } = require('child_process');
// function childProcessTask() {
//   return exec('date');
// }
// exports.childProcessTask = childProcessTask;

// const { Observable } = require('rxjs');
// function observableTask() {
//   return Observable.of(1, 2, 3);
// }
// exports.observableTask = observableTask;

// exports.clean = clean
// // exports.build = build
// // exports.default = defaultTask
// // exports.default = series(clean, build)
// // exports.default = parallel(clean, build)
// exports.build = series(clean, parallel(defaultTask, build), series(build, clean))