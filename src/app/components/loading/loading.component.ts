import { Component, OnInit } from "@angular/core";
import { loading } from "src/app/animations/animations";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrls: ["./loading.component.scss"],
  animations: [loading],
})
export class LoadingComponent implements OnInit {
  spin = false;
  constructor() {}

  ngOnInit(): void {}

  rotate() {
    this.spin = true;
  }
}
