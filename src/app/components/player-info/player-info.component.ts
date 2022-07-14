import { Component, Input, OnInit } from "@angular/core";
import { OverviewGamesData } from "src/app/interface/interface";

@Component({
  selector: "app-player-info",
  templateUrl: "./player-info.component.html",
  styleUrls: ["./player-info.component.scss"],
})
export class PlayerInfoComponent implements OnInit {
  @Input() no_games = true;
  @Input() selected_game: OverviewGamesData;
  @Input() player_name = "";
  @Input() player_toi = 0;
  @Input() player_team = "";
  constructor() {}

  ngOnInit(): void {}
}
