
## html为百度搜索框 JSONP script标签的src属性。

## gulp test

# 注释：gulp笔记📒，因直接放在 gulpfile.js 文件中会影响任务执行耗时，所以统一记录在 readme 中。

# 旧版gulp语法
<!-- var gulp = require('gulp');
gulp.task('default', function(cb) {
  // 将你的默认的任务代码放在这
  console.log(`旧版gulp的语法
过年集五福啦···
啦啦啦，头次听说年会居然要在会议室度过···
gulp4.0.0版本中执行任务会报错的解决方法：gulp.parallel or gulp.series`)
  cb()
});
gulp.task('watch', function () {
  // gulp.series和gulp.parallel中是自己定义的任务。
  // gulp.watch('jsonp.html', gulp.series('default'));
  gulp.watch('../baidu/jsonp.html', gulp.parallel('default'));
}); -->

# 1.如果需要让任务（task）按顺序执行，请使用 series() 方法
# 2.对于希望以最大并发来运行的任务，可以使用 parallel() 方法将它们组合起来。这两个方法可以被嵌套至任意深度。