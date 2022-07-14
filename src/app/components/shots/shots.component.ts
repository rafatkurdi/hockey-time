import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { Shot, Playlist, VideToPlay } from "src/app/interface/interface";

@Component({
  selector: "app-shots",
  templateUrl: "./shots.component.html",
  styleUrls: ["./shots.component.scss"],
})
export class ShotsComponent implements OnInit {
  @Output() saveToPlaylist = new EventEmitter<Shot>();
  @Output() playShot = new EventEmitter<VideToPlay[]>();
  @Output() setSelected = new EventEmitter<VideToPlay[]>();
  @Input() shots: Shot[] = [];

  set_video: VideToPlay[] = [];
  selected_shots: Shot[] = [];
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.shots.sort((a, b) => {
      return a.time - b.time;
    });
    this.shots.forEach((shot) => {
      shot.gameState = shot.gameState.replace(/:/g, "/");
    });

    this.setSaved();
    this.setSelectedVideo();
    this.cd.detectChanges();
  }

  selectShot(shot: Shot): void {
    if (this.selected_shots.length != 0) {
      let vasDeleted = false;
      this.selected_shots.forEach((item, index) => {
        if (item.time == shot.time) {
          this.selected_shots.splice(index, 1);
          vasDeleted = true;
          return;
        }
      });

      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == shot.videoTime) {
            video.selected = false;
            return;
          }
        });
      }

      if (!vasDeleted) {
        this.selected_shots.push(shot);
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == shot.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    } else {
      this.selected_shots.push(shot);

      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          /* console.log("time video:", video.videoTime);
          console.log("time shift:", shift.videoTime);
          console.log("_________________"); */
          if (video.videoTime + 5 == shot.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    }

    this.setSelected.emit(this.set_video);
  }

  isActive(shift: Shot): boolean {
    let isIn = false;
    this.selected_shots.forEach((item, index) => {
      if (item.time == shift.time) {
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
    this.shots.forEach((shot) => {
      shot.saved = false;
    });
    if (saved) {
      saved.forEach((item) => {
        if (item.event == "shot") {
          this.shots.forEach((shot) => {
            if (
              shot.videoTime == item.videoTime &&
              shot.realTime.substring(0, 10) == item.date
            ) {
              shot.saved = true;
              return;
            }
          });
        }
      });
    }
  }

  setSelectedVideo() {
    this.shots.forEach((shot) => {
      this.set_video.push({
        videoTime: shot.videoTime - 5,
        videoEndTime: shot.videoTime + 5,
        selected: false,
      });
    });
    this.setSelected.emit(this.set_video);
  }

  addToPlaylist(shot: Shot) {
    if (!shot.saved) {
      shot.saved = true;
      this.saveToPlaylist.emit(shot);
    }
  }

  playOne(shot: Shot) {
    let video: VideToPlay[] = [
      {
        videoTime: shot.videoTime - 5,
        videoEndTime: shot.videoTime + 5,
      },
    ];
    this.playShot.emit(video);
  }
}
