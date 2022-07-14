var gulp = require("gulp");
var gutil = require("gulp-util");
var ftp = require("gulp-ftp");

/* gulp.task("prod", function () {
  return gulp.src("dist/**").pipe(
    ftp({
      host: "esports-10-www4.superhosting.cz",
      user: "statistics_player_www",
      pass: "vedshanag3",
      remotePath: "/var/home/www/statistics.datasport.cz/subdomains/player/www",
    })
  );
}); */

gulp.task("prod", function () {
  return (
    gulp
      .src("dist/logiq-frontend-players/**")
      .pipe(
        ftp({
          host: "esports-10-www4.superhosting.cz",
          user: "statistics_player_www",
          pass: "vedshanag3",
          /* remotePath: "/home/www/statistics.datasport.cz/subdomains/player/www", */
        })
      )
      // you need to have some kind of stream after gulp-ftp to make sure it's flushed
      // this can be a gulp plugin, gulp.dest, or any kind of stream
      // here we use a passthrough stream
      .pipe(gutil.noop())
  );
});
