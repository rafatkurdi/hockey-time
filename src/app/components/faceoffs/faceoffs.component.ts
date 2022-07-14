import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { Faceoff, Playlist, VideToPlay } from "src/app/interface/interface";

@Component({
  selector: "app-faceoffs",
  templateUrl: "./faceoffs.component.html",
  styleUrls: ["./faceoffs.component.scss"],
})
export class FaceoffsComponent implements OnInit {
  @Output() saveToPlaylist = new EventEmitter<Faceoff>();
  @Output() playFaceOffs = new EventEmitter<VideToPlay[]>();
  @Output() setSelected = new EventEmitter<VideToPlay[]>();
  @Input() faceoffs: Faceoff[] = [];

  set_video: VideToPlay[] = [];
  selected_faceoffs: Faceoff[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.faceoffs.sort((a, b) => {
      return a.videoTime - b.videoTime;
    });
    this.faceoffs.forEach((faceoff) => {
      faceoff.gameState = faceoff.gameState.replace(/:/g, "/");
    });

    this.setSaved();
    this.setSelectedVideo();
    this.cd.detectChanges();
  }

  selectFaceoffs(faceoff: Faceoff): void {
    if (this.selected_faceoffs.length != 0) {
      let vasDeleted = false;
      this.selected_faceoffs.forEach((item, index) => {
        if (item.time == faceoff.time) {
          this.selected_faceoffs.splice(index, 1);
          vasDeleted = true;
          return;
        }
      });

      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == faceoff.videoTime) {
            video.selected = false;
            return;
          }
        });
      }

      if (!vasDeleted) {
        this.selected_faceoffs.push(faceoff);
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == faceoff.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    } else {
      this.selected_faceoffs.push(faceoff);
      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == faceoff.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    }
    this.setSelected.emit(this.set_video);
  }

  isActive(faceoff: Faceoff): boolean {
    let isIn = false;
    this.selected_faceoffs.forEach((item, index) => {
      if (item.time == faceoff.time) {
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
    this.faceoffs.forEach((faceoff) => {
      faceoff.saved = false;
    });
    console.log("Saved");
    if (saved) {
      saved.forEach((item) => {
        if (item.event == "faceOff") {
          this.faceoffs.forEach((faceoff) => {
            if (
              faceoff.videoTime == item.videoTime &&
              faceoff.realTime.substring(0, 10) == item.date
            ) {
              faceoff.saved = true;
              return;
            }
          });
        }
      });
    }
  }

  setSelectedVideo() {
    this.faceoffs.forEach((faceoff) => {
      this.set_video.push({
        videoTime: faceoff.videoTime - 5,
        videoEndTime: faceoff.videoTime + 5,
        selected: false,
      });
    });
    this.setSelected.emit(this.set_video);
  }

  addToPlaylist(faceoff: Faceoff) {
    if (!faceoff.saved) {
      faceoff.saved = true;
      this.saveToPlaylist.emit(faceoff);
    }
  }

  playOne(faceoff: Faceoff) {
    let video: VideToPlay[] = [
      {
        videoTime: faceoff.videoTime - 5,
        videoEndTime: faceoff.videoTime + 5,
      },
    ];
    this.playFaceOffs.emit(video);
  }
}
