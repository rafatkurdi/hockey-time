import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { Pass, Playlist, VideToPlay } from "src/app/interface/interface";

@Component({
  selector: "app-shot-assists",
  templateUrl: "./shot-assists.component.html",
  styleUrls: ["./shot-assists.component.scss"],
})
export class ShotAssistsComponent implements OnInit {
  @Output() saveToPlaylist = new EventEmitter<Pass>();
  @Output() playShotAssist = new EventEmitter<VideToPlay[]>();
  @Output() setSelected = new EventEmitter<VideToPlay[]>();
  @Input() passes: Pass[] = [];

  set_video: VideToPlay[] = [];
  selected_passes: Pass[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.passes.sort((a, b) => {
      return a.videoTime - b.videoTime;
    });
    this.passes.forEach((pass) => {
      pass.gameState = pass.gameState.replace(/:/g, "/");
    });

    this.setSaved();
    this.setSelectedVideo();
    this.cd.detectChanges();
  }

  selectPass(pass: Pass): void {
    if (this.selected_passes.length != 0) {
      let vasDeleted = false;
      this.selected_passes.forEach((item, index) => {
        if (item.time == pass.time) {
          this.selected_passes.splice(index, 1);
          vasDeleted = true;
          return;
        }
      });

      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == pass.videoTime) {
            video.selected = false;
            return;
          }
        });
      }

      if (!vasDeleted) {
        this.selected_passes.push(pass);
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == pass.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    } else {
      this.selected_passes.push(pass);
      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == pass.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    }
    this.setSelected.emit(this.set_video);
  }

  isActive(pass: Pass): boolean {
    let isIn = false;
    this.selected_passes.forEach((item, index) => {
      if (item.time == pass.time) {
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
    this.passes.forEach((pass) => {
      pass.saved = false;
    });
    if (saved) {
      saved.forEach((item) => {
        if (item.event == "pass") {
          this.passes.forEach((pass) => {
            console.log("Pass", pass);
            if (pass.videoTime == item.videoTime) {
              pass.saved = true;
              return;
            }
          });
        }
      });
    }
  }

  setSelectedVideo() {
    this.passes.forEach((pass) => {
      this.set_video.push({
        videoTime: pass.videoTime - 5,
        videoEndTime: pass.videoTime + 5,
        selected: false,
      });
    });
    this.setSelected.emit(this.set_video);
  }

  addToPlaylist(pass: Pass) {
    if (!pass.saved) {
      pass.saved = true;
      this.saveToPlaylist.emit(pass);
    }
  }

  playOne(pass: Pass) {
    let video: VideToPlay[] = [
      {
        videoTime: pass.videoTime - 5,
        videoEndTime: pass.videoTime + 5,
      },
    ];
    this.playShotAssist.emit(video);
  }
}
