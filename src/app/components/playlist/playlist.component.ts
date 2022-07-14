import {
  Component,
  Input,
  OnChanges,
  OnInit,
  EventEmitter,
  Output,
} from "@angular/core";
import { PlaylistService } from "src/app/services/playlist.service";
import { Playlist, VideToPlay } from "src/app/interface/interface";

@Component({
  selector: "app-playlist",
  templateUrl: "./playlist.component.html",
  styleUrls: ["./playlist.component.scss"],
})
export class PlaylistComponent implements OnInit, OnChanges {
  @Output() playPlaylist = new EventEmitter<VideToPlay[]>();
  @Input() filtered: string[] = [];

  playlist: Playlist[] = [];
  playlist_filtered: Playlist[] = [];
  record: Playlist;

  show_pop_up: boolean = false;
  admin = false;

  player_id = "";
  pop_up_action = "";

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.player_id =
      JSON.parse(sessionStorage.getItem("currentUser") || "").playerId || "";

    this.admin =
      JSON.parse(sessionStorage.getItem("currentUser") || "").admin || false;

    this.admin ? this.getAdminPlaylist() : this.getPlaylist();
  }

  ngOnChanges(): void {
    this.checkPlaylist();
    console.log("Filtered pl:", this.filtered);
  }

  checkPlaylist() {
    this.playlist_filtered = [];
    if (this.filtered.length > 0 && !this.filtered.includes("all")) {
      this.playlist.map((item) => {
        this.filtered.forEach((filter) => {
          if (item.event == filter) {
            this.playlist_filtered.push(item);
            return;
          }
        });
      });
    } else {
      this.playlist_filtered = this.playlist;
    }
    console.log("Filtered playlist", this.playlist_filtered);
  }

  getPlaylist(): void {
    this.playlistService.getPlaylist()?.subscribe({
      next: (recivedData) => {
        this.playlist = recivedData;
        this.playlist.reverse();
        this.playlist_filtered = this.playlist;
        this.getEnemyTeam();
        this.savePlaylist();
        this.checkPlaylist();
      },
      error: (err) => {
        console.error("Bad API request: pS-gP", err);
        alert("Bad API request: pS-gP");
        //this.logOut();
      },
    });
  }

  getAdminPlaylist(): void {
    this.playlistService.getAdminPlaylist(this.player_id)?.subscribe({
      next: (recivedData) => {
        this.playlist = recivedData;
        this.playlist.reverse();
        this.savePlaylist();
        this.checkPlaylist();
      },
      error: (err) => {
        console.error("Bad API request: pS-gAp", err);
        alert("Bad API request: pS-gAp");
        //this.logOut();
      },
    });
  }

  savePlaylist() {
    sessionStorage.setItem("playList", JSON.stringify(this.playlist));
  }

  getEnemyTeam() {
    let player_team =
      JSON.parse(sessionStorage.getItem("currentUser") || "").playerTeam || "";

    this.playlist.forEach((item) => {
      let enemy = "";

      let enemy_team = item.videoId
        .substring(item.videoId.length - 7)
        .split("-");
      enemy_team[0] == player_team
        ? (item.enemyTeam = enemy_team[1])
        : (item.enemyTeam = enemy_team[0]);
    });
  }

  togglePopUp() {
    if (this.show_pop_up) {
      this.show_pop_up = false;
    } else if (!this.show_pop_up) {
      this.show_pop_up = true;
    }
  }

  openPopUp(item: Playlist, type: string) {
    console.log("item", item);
    this.record = item;
    this.pop_up_action = type;
    this.togglePopUp();
  }

  reloadPlaylist(reload: boolean) {
    if (reload) {
      this.admin ? this.getAdminPlaylist() : this.getPlaylist();
    }
  }

  playOne(item: Playlist) {
    let video: VideToPlay[] = [
      {
        videoTime: item.videoTime - 5,
        videoEndTime: item.endVideoTime + 5,
        videoId: item.videoId,
      },
    ];
    this.playPlaylist.emit(video);
  }
}
