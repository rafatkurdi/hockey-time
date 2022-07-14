import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatTime",
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    let sec_num = value;
    let minutes: number | string = Math.floor(sec_num / 60);
    let seconds: number | string = sec_num - minutes * 60;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  }
}
