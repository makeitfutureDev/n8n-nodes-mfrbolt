const gulp = require('gulp');

gulp.task('build:icons', () => {
  return gulp.src('nodes/**/*.svg')
    .pipe(gulp.dest('dist/nodes'));
});

gulp.task('default', gulp.series('build:icons'));