import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { loading } from "src/app/animations/animations";
import { DefaultService } from "src/app/services/default.service";
import { OverviewTeamType, OverviewType } from "src/app/interface/interface";
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  animations: [loading],
})
export class AuthComponent implements OnInit {
  user = {
    client_id: "",
    client_secret: "",
  };
  teams: OverviewTeamType[] = [];

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private defaultService: DefaultService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    sessionStorage.clear();
    console.log("Local storage 1", sessionStorage);
    this.route.queryParams.subscribe((params) => {
      if (params["do"] && params["do"] == "login") {
        if (params["client_id"] && params["client_secret"]) {
          this.user.client_id = params["client_id"];
          this.user.client_secret = params["client_secret"];
          this.login();
        } else {
          this.loading = false;
          alert("Something went wrong! ERR: aI-gP");
        }
      } else {
        this.loading = false;
        alert("Something went wrong! ERR: aI-wTd");
      }
    });
  }

  login(): void {
    console.log("this user", this.user);
    this.defaultService.getToken(this.user).subscribe({
      next: (recivedData) => {
        this.setUserData(recivedData);
        console.log(recivedData);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error("getToken failure", err);
        alert("Wrong login link");
      },
    });
  }

  setUserData(recived_data: any): void {
    let token_data = recived_data;

    if (recived_data != undefined) {
      token_data.admin = false;
      token_data.playerId = this.user.client_secret;
      sessionStorage.setItem("currentUser", JSON.stringify(token_data));
      this.getTeams();
    } else {
      alert("Upps! Something went wrong.");
    }
  }

  //Make setLocalStorege async bcs auth token
  /* locSetItemsAsync(key: string, value: any) {
    return Promise.resolve().then(() => {
      sessionStorage.setItem(key, value);
    });
  } */

  getLanguage() {
    this.defaultService.getPlayerLanguage()?.subscribe({
      next: (recivedData) => {
        if (recivedData.language) {
          sessionStorage.setItem(
            "language",
            JSON.stringify(recivedData.language)
          );
        }
      },
      error: (err) => {
        this.loading = false;
        console.error("Bad API request: pS-gL", err);
        alert("Bad API request: pS-gL");
      },
    });
  }

  getTeams(): void {
    this.defaultService.getCompetetionOverview().subscribe({
      next: (recivedData) => {
        let teams: OverviewTeamType[] = [];
        recivedData.teams.forEach((team) => {
          teams.push(team);
          this.teams.push(team);
        });
        this.loading = false;
        sessionStorage.setItem("teams", JSON.stringify(teams));
        this.findPlayer();
        this.router.navigate(["home"]);
        console.log(teams);
        this.getLanguage();
      },
      error: (err) => {
        location.reload();
        console.error("Bad API request: aS-gO", err);
        //alert("Bad API request: aS-gO");
      },
    });
  }

  findPlayer() {
    let founded = false;
    this.teams.forEach((team) => {
      team.players.forEach((player) => {
        if (player.id == this.user.client_id) {
          let user = JSON.parse(sessionStorage.getItem("currentUser") || "");
          user.name = player.name + " " + player.surname;
          user.playerTeam = team.shortcut;
          sessionStorage.setItem("currentUser", JSON.stringify(user));
          founded = true;
          return;
        }
      });
      if (founded) {
        return;
      }
    });
  }
}
