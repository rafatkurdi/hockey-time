import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
import {
  Assist, CommonObject,
  Faceoff,
  Goal, GoalAgainst,
  matchEvents, matchEventsGoalKeeper,
  OverviewTeamType,
  Participation,
  Pass,
  Shift,
  Shot,
  VideToPlay,
  VideoCoachNotes
} from "src/app/interface/interface";
import { FormatDatePipe } from "src/app/pipes/format-date.pipe";
import { DefaultService } from "src/app/services/default.service";
import { PlaylistService } from "src/app/services/playlist.service";
import { AdminService } from "src/app/services/admin.service";
import { OverviewGamesData } from "src/app/interface/interface";
import { Router } from "@angular/router";
import {
  loading,
  showHide,
  swipeLeftRight,
  swipeRightLeft,
} from "../../animations/animations";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [showHide, swipeLeftRight, swipeRightLeft, loading],
})
export class HomeComponent implements OnInit, AfterViewInit {
  loading = false;
  admin = false;
  show_games = false;
  no_games = true;

  widget = "home";
  player_id = "";
  player_name = "";
  player_toi = 0;
  player_team = "";
  video_id = "";
  game_id = "";

  teams: OverviewTeamType[] | undefined = [];
  games: OverviewGamesData[] = [];
  selected_game: OverviewGamesData;
  match_events: matchEvents;
  match_goalkeeper_events: matchEventsGoalKeeper;
  VideoCoachNotes: VideoCoachNotes[] = [];
  shifts: Shift[] = [];
  shots: Shot[] = [];
  goals: Goal[] = [];
  assists: Assist[] = [];
  faceoffs: Faceoff[] = [];
  participations: Participation[] = [];
  passes: Pass[] = [];
  filtered: string[] = [];
  video_to_play: VideToPlay[];
  set_videos: VideToPlay[];

  goalsAgainst: Array<GoalAgainst>;
  saves: Array<CommonObject>;
  slotShotsSaved: Array<CommonObject>;
  crossIcePassShotsSaved: Array<CommonObject>;
  innerSlotShotsSaved: Array<CommonObject>;
  oddManRushesSaved: Array<CommonObject>;
  oneTimersSaved: Array<CommonObject>;
  reboundsSaved: Array<CommonObject>;

  window = window;
  window_height: number;

  constructor(
    private defaultService: DefaultService,
    private adminService: AdminService,
    private playlistService: PlaylistService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.window_height = window.screen.height;

    this.player_id =
      JSON.parse(sessionStorage.getItem("currentUser") || "").playerId || "";

    this.player_name =
      JSON.parse(sessionStorage.getItem("currentUser") || "").name || "";

    this.player_team =
      JSON.parse(sessionStorage.getItem("currentUser") || "").playerTeam || "";

    this.admin =
      JSON.parse(sessionStorage.getItem("currentUser") || "").admin || false;
    this.admin
      ? (this.getAdminLanguage(),
        this.getOverviewAdmin(),
        this.getPlaylistAdmin())
      : (this.getOverview(), this.getPlaylist());

    this.getTeams();

    this.getVideoCoachVideoClips();

  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  showGames(data: boolean): void {
    if (!data) {
      this.show_games = false;
    } else {
      this.show_games = true;
    }
  }

  setFiltered(filtered: string[]) {
    console.log("Filtered Home", filtered);
    this.filtered = filtered;
  }

  showPlaylist(data: string) {
    this.video_to_play = [];
    if (!this.loading) {
      this.widget = data;
    }
  }

  activeWidget(widget: string, enabled: number): void {
    this.video_to_play = [];
    if (!this.loading && enabled) {
      this.widget = widget;
    }
  }

  onGameSelect(item: OverviewGamesData): void {
    this.show_games = false;
    this.selected_game = item;
    console.log("Item", item);
    if (this.admin) {
      this.getMatchEventsAdmin();
    } else {
      this.getMatchEvents();
    }
  }

  setGame(games: OverviewGamesData[]): void {
    if (games.length != 0) {
      console.log("Games:", games);
      this.no_games = false;
      this.selected_game = games[0];
    } else {
      this.no_games = true;
      this.loading = false;
    }
  }

  setMatchEvents(): void {
    if(this.match_events?.shifts) {
      this.shifts = this.match_events.shifts;
      this.shots = this.match_events.shotsOnGoal;
      this.goals = this.match_events.goals;
      this.assists = this.match_events.assists;
      this.faceoffs = this.match_events.faceOffs;
      this.player_toi = this.match_events.toi;
      this.passes = this.match_events.passes;
      this.video_id = this.match_events.videoPlayer.videoId;
      this.setParticipations();
      console.log("Shots", this.shots?.length);
    } else {
      this.goalsAgainst = this.match_goalkeeper_events.goalsAgainst;
      this.saves = this.match_goalkeeper_events.saves;
      this.slotShotsSaved = this.match_goalkeeper_events.slotShotsSaved;
      this.crossIcePassShotsSaved = this.match_goalkeeper_events.crossIcePassShotsSaved;
      this.innerSlotShotsSaved = this.match_goalkeeper_events.innerSlotShotsSaved;
      this.oddManRushesSaved = this.match_goalkeeper_events.oddManRushesSaved;
      this.player_toi = this.match_goalkeeper_events.toi;
      this.oneTimersSaved = this.match_goalkeeper_events.oneTimersSaved;
      this.reboundsSaved = this.match_goalkeeper_events.reboundsSaved;
      this.video_id = this.match_goalkeeper_events.videoPlayer.videoId;
    }
  }

  //Set all participations types into 1 value
  setParticipations(): void {
    this.participations = [];
    if (this.match_events.positiveParticipation) {
      this.match_events.positiveParticipation?.map((participation) => {
        let part: Participation = participation;
        part.positive = true;
        this.participations.push(part);
      });
    }
    if (this.match_events.negativeParticipation) {
      this.match_events.negativeParticipation?.map((participation) => {
        let part: Participation = participation;
        part.positive = false;
        this.participations.push(part);
      });
    }
  }

  gameSorter() {
    this.games.sort((a, b) => {
      console.log("a", new Date(a.date).valueOf());
      console.log("b", new Date(b.date).valueOf());
      return new Date(b.date).valueOf() - new Date(a.date).valueOf();
    });
  }

  /* 🪛 Services 🪛 */

  //Get match history and their data
  getOverview(): void {
    this.loading = true;
    this.defaultService.getOverview(this.player_id)?.subscribe({
      next: (recivedData) => {
        this.games = recivedData;
        this.gameSorter();
        this.setGame(this.games);
        if (this.games.length != 0) {
          this.getMatchEvents();
        }
      },
      error: (err) => {
        this.loading = false;
        console.error("Bad API request: hS-gO", err);
        alert("Bad API request: hS-gO");
        this.logOut();
      },
    });
  }

  getOverviewAdmin(): void {
    this.loading = true;
    this.adminService.getPlayersOverview(this.player_id)?.subscribe({
      next: (recivedData) => {
        this.games = recivedData;
        this.getPlaylistAdmin();
        this.gameSorter();
        this.setGame(this.games);
        console.log("Real data Admin:", recivedData);
        if (this.games.length != 0) {
          this.getMatchEventsAdmin();
        }
      },
      error: (err) => {
        this.loading = false;
        console.error("Bad API request: hS-gO", err);
        alert("Bad API request: hS-gO");
        this.logOut();
      },
    });
  }

  getAdminLanguage() {
    this.adminService.getPlayerLanguage(this.player_id)?.subscribe({
      next: (recivedData) => {
        if (recivedData.language) {
          sessionStorage.setItem(
            "language",
            JSON.stringify(recivedData.language)
          );
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        this.loading = false;
        console.error("Bad API request: aS-gL", err);
        alert("Bad API request: aS-gL");
      },
    });
  }

  getVideoCoachVideoClips() {
    this.adminService.getVideoCoachVideoClips(this.player_id)?.subscribe({
      next: (recivedData) => {
        this.VideoCoachNotes = recivedData
      },
      error: (err) => {
        this.loading = false;
        console.error("Bad API request: aS-gL", err);
        alert("Bad API request: aS-gL");
      },
    });
  }

  getPlaylist() {
    this.playlistService.getPlaylist().subscribe({
      next: (recivedData) => {
        let playlist = recivedData;
        sessionStorage.setItem("playList", JSON.stringify(playlist));
      },
      error: (err) => {
        console.error("Bad API request: pS-gP", err);
        alert("Bad API request: pS-gP");
        //this.logOut();
      },
    });
  }

  getPlaylistAdmin() {
    this.playlistService.getAdminPlaylist(this.player_id)?.subscribe({
      next: (recivedData) => {
        let playlist = recivedData;
        sessionStorage.setItem("playList", JSON.stringify(playlist));
      },
      error: (err) => {
        console.error("Bad API request: pS-gPa", err);
        alert("Bad API request: pS-gPa");
        //this.logOut();
      },
    });
  }

  getMatchEvents(): void {
    this.loading = true;
    this.defaultService.getMatchEvents(this.selected_game.id)
    ?.subscribe({
      next: (recivedData) => {
        recivedData.goals ? this.match_events = recivedData : this.match_goalkeeper_events = recivedData;
        this.setMatchEvents();
        this.game_id = this.match_events ? this.match_events.videoPlayer.videoId : this.match_goalkeeper_events.videoPlayer.videoId;
        console.log(recivedData);
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error("Bad API request: dS-gMe", err);
        alert("Bad API request: dS-gMe");
        //this.logOut();
      },
    });
  }

  getMatchEventsAdmin(): void {
    this.loading = true;
    this.adminService
      .getMatchEventsAdmin(this.selected_game.id, this.player_id)
      ?.subscribe({
        next: (recivedData) => {
          recivedData.goals ? this.match_events = recivedData : this.match_goalkeeper_events = recivedData;
          this.setMatchEvents();
          this.game_id = this.match_events ? this.match_events.videoPlayer.videoId : this.match_goalkeeper_events.videoPlayer.videoId;
          console.log(recivedData);
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          console.error("Bad API request: dS-gMe", err);
          alert("Bad API request: dS-gMe");
          //this.logOut();
        },
      });
  }

  saveToPlaylist(item: any) {
    this.loading = true;
    let time = -1;
    let event = "";
    if (item.time) {
      time = item.time;
    } else {
      time = item.start;
    }
    console.log("item:", item);
    let videoTime = item.videoTime;
    let videoEndTime = item.videoEndTime || item.videoTime;
    let videoId = this.video_id;
    let matchId = this.selected_game.id;
    let name = "";
    let description = "";
    let date = "";
    if (item.realTime) {
      date = item.realTime.substring(0, 10);
    } else if (this.match_events.videoPlayer.time) {
      date = this.match_events.videoPlayer.time.substring(0, 10);
    }

    let type = "";
    let start = item.start || null;
    let end = item.end || null;

    if (this.widget == "all_shifts") {
      event = "shift";
    } else if (this.widget == "shots") {
      event = "shot";
    } else if (this.widget == "goal_scored") {
      event = "goal";
    } else if (this.widget == "goal_assists") {
      event = "assist";
    } else if (this.widget == "shot_assists") {
      event = "pass";
    } else if (this.widget == "faceoffs") {
      event = "faceOff";
    } else if (this.widget == "goals_against") {
      event = "goalsAgainst";
    } else if (this.widget == "saves_goalkeeper") {
      event = "saves";
    } else if (this.widget == "slot_shots_saved_goalkeeper") {
      event = "slotShotsSaved";
    } else if (this.widget == "cross_ice_pass_sots_saved_goalkeeper") {
      event = "crossIcePassShotsSaved";
    } else if (this.widget == "inner_slot_shots_saved") {
      event = "innerSlotShotsSaved";
    } else if (this.widget == "odd_man_rushes_saved") {
      event = "oddManRushesSaved";
    } else if (this.widget == "one_timers_saved") {
      event = "oneTimersSaved";
    } else if (this.widget == "rebounds_saved") {
      event = "reboundsSaved";
    } else if (this.widget == "plus_minus_participations") {
      if (item.positive) {
        event = "positiveParticipation";
      } else {
        event = "negativeParticipation";
      }
    }
    let playlistRaw = {
      event,
      time,
      videoTime,
      videoEndTime,
      videoId,
      matchId,
      name,
      description,
      date,
      type,
      start,
      end,
    };

    console.log("Playlist raw", playlistRaw);

    this.playlistService
      .addToPlaylist(
        event,
        time,
        videoTime,
        videoEndTime,
        videoId,
        matchId,
        name,
        description,
        date,
        type,
        start,
        end
      )
      ?.subscribe({
        next: (recivedData) => {
          this.loading = false;
          let playlist = JSON.parse(sessionStorage.getItem("playList") || "");
          if (playlist) {
            playlist.push(playlistRaw);
            sessionStorage.setItem("playList", JSON.stringify(playlist));
          }
        },
        error: (err) => {
          console.error("Bad API request: pS-sP", err);
          alert("Bad API request: pS-sP");
          this.loading = false;
          //this.logOut();
        },
      });
  }

  getTeams(): void {
    this.teams = JSON.parse(sessionStorage.getItem("teams") || "") || "";
  }

  closeWidget(): void {
    this.widget = "home";
  }

  playVideo(event: VideToPlay[]) {
    this.video_to_play = [];
    let to_play: VideToPlay[] = [];
    let has_id = false;

    event.forEach((video) => {
      if (video.videoId) {
        has_id = true;
        this.set_videos = [];
        this.video_to_play = to_play;
        to_play.push(video);
      }
    });

    if (event && !has_id) {
      event.forEach((video) => {
        video.videoId = this.video_id;
        to_play.push(video);
      });

      this.video_to_play = to_play;
    }
  }

  setVideo(event: VideToPlay[]) {
    this.set_videos = [];
    event.forEach((video) => {
      video.videoId = this.video_id;
    });
    console.log("Event", event);
    this.set_videos = event;
    this.cd.detectChanges();
    console.log("Set videos Home", this.set_videos);
  }

  logOut(): void {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("loaded_data");
    this.router.navigate([""]);
  }
}
