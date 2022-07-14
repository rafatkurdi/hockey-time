import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatDate",
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string, time: boolean): any {
    //let parts: any = value.split('-');
    let date = new Date(value);
    if (time) {
      return (
        Number(date.getDate()) +
        "." +
        Number(date.getMonth() + 1) +
        "." +
        Number(date.getFullYear()) +
        " " +
        Number(date.getHours()) +
        ":" +
        Number(date.getMinutes()) +
        ":" +
        Number(date.getSeconds())
      );
    } else {
      return (
        Number(date.getDate()) +
        "." +
        Number(date.getMonth() + 1) +
        "." +
        Number(date.getFullYear())
      );
    }
  }
}
