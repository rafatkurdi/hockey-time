import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { Assist, Playlist, VideToPlay } from "src/app/interface/interface";

@Component({
  selector: "app-goal-assists",
  templateUrl: "./goal-assists.component.html",
  styleUrls: ["./goal-assists.component.scss"],
})
export class GoalAssistsComponent implements OnInit {
  @Output() saveToPlaylist = new EventEmitter<Assist>();
  @Output() playGoalAssist = new EventEmitter<VideToPlay[]>();
  @Output() setSelected = new EventEmitter<VideToPlay[]>();
  @Input() assists: Assist[] = [];

  set_video: VideToPlay[] = [];
  selected_assists: Assist[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.assists.sort((a, b) => {
      return a.videoTime - b.videoTime;
    });
    this.assists.forEach((assist) => {
      assist.gameState = assist.gameState.replace(/:/g, "/");
    });

    this.setSaved();
    this.setSelectedVideo();
    this.cd.detectChanges();
  }

  selectAssist(assists: Assist): void {
    if (this.selected_assists.length != 0) {
      let vasDeleted = false;
      this.selected_assists.forEach((item, index) => {
        if (item.time == assists.time) {
          this.selected_assists.splice(index, 1);
          vasDeleted = true;
          return;
        }
      });
      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == assists.videoTime) {
            video.selected = false;
            return;
          }
        });
      }

      if (!vasDeleted) {
        this.selected_assists.push(assists);
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == assists.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    } else {
      this.selected_assists.push(assists);
      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == assists.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    }
    this.setSelected.emit(this.set_video);
  }

  isActive(assists: Assist): boolean {
    let isIn = false;
    this.selected_assists.forEach((item, index) => {
      if (item.time == assists.time) {
        isIn = true;
        return;
      }
    });
    return isIn;
  }

  setSaved() {
    let saved: Playlist[] = JSON.parse(
      sessionStorage.getItem("playList") || ""
    );
    this.assists.forEach((assist) => {
      assist.saved = false;
    });
    if (saved) {
      saved.forEach((item) => {
        if (item.event == "assist") {
          this.assists.forEach((assist) => {
            if (
              assist.videoTime == item.videoTime &&
              assist.realTime.substring(0, 10) == item.date
            ) {
              assist.saved = true;
              return;
            }
          });
        }
      });
    }
  }

  setSelectedVideo() {
    this.assists.forEach((assist) => {
      this.set_video.push({
        videoTime: assist.videoTime - 5,
        videoEndTime: assist.videoTime + 5,
        selected: false,
      });
    });
    this.setSelected.emit(this.set_video);
  }

  addToPlaylist(assist: Assist) {
    if (!assist.saved) {
      assist.saved = true;
      this.saveToPlaylist.emit(assist);
    }
  }

  playOne(assist: Assist) {
    let video: VideToPlay[] = [
      {
        videoTime: assist.videoTime - 5,
        videoEndTime: assist.videoTime + 5,
      },
    ];
    this.playGoalAssist.emit(video);
  }
}
