import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { OverviewGamesData } from "src/app/interface/interface";

@Component({
  selector: "app-game",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.scss"],
})
export class GameComponent implements OnInit {
  @Input() games: OverviewGamesData[] = [];
  @Input() selected_game: OverviewGamesData;
  @Output() onSelectedGame: EventEmitter<OverviewGamesData> =
    new EventEmitter<OverviewGamesData>();

  no_games = false;

  constructor() {}

  ngOnInit(): void {
    if (this.games == undefined) {
      this.no_games = true;
    }
  }

  setGame(toSet: OverviewGamesData) {
    this.selected_game = toSet;
    this.onSelectedGame.emit(this.selected_game);
  }
}
