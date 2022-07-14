import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { timeout } from "rxjs";
import { goYOut, loading } from "src/app/animations/animations";
import { DefaultService } from "src/app/services/default.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  animations: [goYOut],
})
export class LoginComponent implements OnInit, AfterViewInit {
  secter = "";
  email = "";
  logged = false;

  loading = false;

  post = {
    client_id: "",
    client_secret: "",
  };

  constructor(private router: Router, private defaultService: DefaultService) {}

  ngOnInit(): void {
    sessionStorage.clear();
  }

  ngAfterViewInit(): void {}

  adminLogin(): void {
    if (this.checkLogin()) {
      //Temporary, until API-endpoint will be functional! (this.logged)
      /* this.logged = true; */
      this.loading = true;
      this.defaultService
        .getToken({ client_id: this.email, client_secret: this.secter })
        .subscribe({
          next: (recivedData) => {
            this.setUserData(recivedData);
            console.log(recivedData);
            this.loading = false;
            this.logged = true;
          },
          error: (err) => {
            this.loading = false;
            console.error("getToken failure", err);
            alert("Wrong name or password");
          },
        });
    }
  }

  private setUserData(recived_data: any): void {
    let token_data = recived_data;
    if (recived_data != undefined) {
      token_data.admin = true;
      sessionStorage.setItem("currentUser", JSON.stringify(token_data));
      this.logged = true;
    } else {
      alert("Upps! Something went wrong.");
    }
  }

  login(): void {
    if (this.logged) {
      this.router.navigate(["admin"]);
    }
  }

  private checkLogin(): boolean {
    let enabled = true;
    if (this.secter === "" && this.email == "") {
      enabled = false;
      alert("Please fill out password & E-mail");
    } else if (this.secter === "") {
      enabled = false;
      alert("Please fill out password");
    } else if (this.email === "") {
      enabled = false;
      alert("Please fill out E-mail");
    }

    return enabled;
  }
}
