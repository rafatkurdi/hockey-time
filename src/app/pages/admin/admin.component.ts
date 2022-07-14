import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { loading } from "src/app/animations/animations";
import { AdminService } from "src/app/services/admin.service";

import {
  OverviewType,
  OverviewTeamType,
  OverviewTeamPlayerType,
  PlayerAdminData,
} from "src/app/interface/interface";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
  animations: [loading],
})
export class AdminComponent implements OnInit {
  selected_team = "";
  teams: OverviewTeamType[] = [];

  selected_players: OverviewTeamPlayerType[] = [];
  selected_playerId: string | undefined;

  selected_player_data: PlayerAdminData[] = [];
  selected_player_data_loaded = false;

  all_data: OverviewType;

  panelOpenState = false;
  loading = false;
  language = "";

  test_data: PlayerAdminData[] = [
    {
      id: "4b3403665fea6",
      url: "https://foo.bar/auth?do=login&client_id=0970752000&client_secret=4b3403665fea6",
      createdAt: "2021-11-30T09:37:23+0000",
      expiredAt: "2021-12-21T09:37:23+0000",
      active: true,
      visits: [
        {
          date: "2021-11-30T09:37:56+0000",
          ip: "127.0.0.1",
        },
        {
          date: "2021-11-30T09:37:56+0000",
          ip: "127.0.0.1",
        },
        {
          date: "2021-11-30T09:37:56+0000",
          ip: "127.0.0.1",
        },
      ],
    },
    {
      id: "4b3403665fea6",
      url: "https://foo.bar/auth?do=login&client_id=0970752000&client_secret=4b3403665fea6",
      createdAt: "2021-11-30T09:37:23+0000",
      expiredAt: "2021-12-21T09:37:23+0000",
      active: false,
      visits: [
        {
          date: "2021-11-30T09:37:56+0000",
          ip: "127.0.0.1",
        },
      ],
    },
  ];

  constructor(
    private router: Router,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {
    let user = JSON.parse(sessionStorage.getItem("currentUser") || "");
    if (!user.admin) {
      this.router.navigate([""]);
    }
  }

  ngOnInit(): void {
    this.loading = true;
    this.adminService.getOverview().subscribe({
      next: (recivedData) => {
        this.all_data = recivedData;
        recivedData.teams.forEach((team) => {
          this.teams.push(team);
        });
        this.loading = false;
        sessionStorage.setItem("teams", JSON.stringify(this.teams));
      },
      error: (err) => {
        this.loading = false;
        console.error("Bad API request: aS-gO", err);
        alert("Bad API request: aS-gO");
        this.logOut();
      },
    });
  }

  setTeamPlyers() {
    this.selected_playerId = undefined;
    this.selected_player_data_loaded = false;
    this.teams.forEach((team) => {
      if (team.shortcut == this.selected_team) {
        this.selected_players = team.players;

        this.selected_players.sort((a, b) => {
          if (a.surname < b.surname) {
            return -1;
          }
          if (a.surname > b.surname) {
            return 1;
          }
          return 0;
        });
      }
    });

    console.log("Selected_team", this.selected_team);
  }

  //Will load all selected player tokens infos
  loadPlayerData(): void {
    this.selected_player_data_loaded = false;
    this.loading = true;

    this.adminService.getPlayerAcces(this.selected_playerId)?.subscribe({
      next: (recivedData) => {
        //Data for player
        this.selected_player_data = recivedData;

        this.adminService
          .getPlayerLanguage(this.selected_playerId || "")
          ?.subscribe({
            next: (recivedData) => {
              this.language = recivedData.language;
              console.log("language", this.language);
              this.loading = false;
              this.selected_player_data_loaded = true;
            },
            error: (err) => {
              this.loading = false;
              console.error("Bad API request: aS-gPl", err);
              alert("Bad API request: aS-gPl");
            },
          });

        //this.selected_player_data = this.test_data;

        console.log("Loaded-01", this.selected_player_data);
      },
      error: (err) => {
        this.loading = false;
        console.error("Bad API request: aS-gPA", err);
        alert("Bad API request: aS-gPA");
        this.logOut();
      },
    });
  }

  setPlayerLanguage(language: string) {
    this.loading = true;
    this.adminService
      .setPlayerLanguage(this.selected_playerId || "", language)
      ?.subscribe({
        next: (recivedData) => {
          this.language = language;
          this.loading = false;
          this.selected_player_data_loaded = true;
        },
        error: (err) => {
          this.loading = false;
          console.error("Bad API request: aS-sPl", err);
          alert("Bad API request: aS-sPl");
        },
      });
  }

  simulatePlayer(): void {
    if (this.selected_playerId) {
      let user = JSON.parse(sessionStorage.getItem("currentUser") || "");
      user.playerId = this.selected_playerId;
      user.playerTeam = this.selected_team;
      sessionStorage.setItem("currentUser", JSON.stringify(user));

      let link = window.location.origin + "/home";
      window.open(link, "_blank");
    }
  }

  selectPlayer(id: string | undefined): void {
    this.selected_player_data_loaded = false;
    if (id) {
      this.selected_players.forEach((player) => {
        if (player.id == id) {
          let user = JSON.parse(sessionStorage.getItem("currentUser") || "");
          user.name = player.name + " " + player.surname;
          sessionStorage.setItem("currentUser", JSON.stringify(user));
          return;
        }
      });
    } else {
      let user = JSON.parse(sessionStorage.getItem("currentUser") || "");
      user.name = "";
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    }

    console.log("Selected players", this.selected_players);
  }

  logOut(): void {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("loaded_data");
    this.router.navigate([""]);
  }
}
