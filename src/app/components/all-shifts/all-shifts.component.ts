import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { Playlist, Shift, VideToPlay } from "src/app/interface/interface";

@Component({
  selector: "app-all-shifts",
  templateUrl: "./all-shifts.component.html",
  styleUrls: ["./all-shifts.component.scss"],
})
export class AllShiftsComponent implements OnInit {
  @Output() saveToPlaylist = new EventEmitter<Shift>();
  @Output() playShift = new EventEmitter<VideToPlay[]>();
  @Output() setSelected = new EventEmitter<VideToPlay[]>();
  @Input() shifts: Shift[] = [];

  set_video: VideToPlay[] = [];
  selected_shifts: Shift[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.shifts.sort((a, b) => {
      return a.start - b.start;
    });
    this.shifts.forEach((shift) => {
      shift.gameState = shift.gameState.replace(/:/g, "/");
    });

    this.setSaved();
    this.setSelectedVideo();
    this.cd.detectChanges();
  }

  selectShift(shift: Shift): void {
    if (this.selected_shifts.length != 0) {
      let vasDeleted = false;
      this.selected_shifts.forEach((item, index) => {
        if (item.start == shift.start) {
          this.selected_shifts.splice(index, 1);
          vasDeleted = true;
          return;
        }
      });

      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == shift.videoTime) {
            video.selected = false;
            return;
          }
        });
      }

      if (!vasDeleted) {
        this.selected_shifts.push(shift);
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == shift.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    } else {
      this.selected_shifts.push(shift);
      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == shift.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    }
    this.setSelected.emit(this.set_video);
  }

  isActive(shift: Shift): boolean {
    let isIn = false;
    this.selected_shifts.forEach((item, index) => {
      if (item.start == shift.start) {
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
    this.shifts.forEach((shift) => {
      shift.saved = false;
    });
    if (saved) {
      saved.forEach((item) => {
        if (item.event == "shift") {
          this.shifts.forEach((shift) => {
            if (
              shift.videoTime == item.videoTime &&
              shift.realTime.substring(0, 10) == item.date
            ) {
              shift.saved = true;
              return;
            }
          });
        }
      });
    }
  }

  setSelectedVideo() {
    this.shifts.forEach((shitf) => {
      this.set_video.push({
        videoTime: shitf.videoTime - 5,
        videoEndTime: shitf.videoEndTime + 5,
        selected: false,
      });
    });
    console.log("set Video", this.set_video);
    this.setSelected.emit(this.set_video);
  }

  addToPlaylist(shift: Shift) {
    if (!shift.saved) {
      shift.saved = true;
      this.saveToPlaylist.emit(shift);
    }
  }

  playOne(shitf: Shift) {
    let video: VideToPlay[] = [
      {
        videoTime: shitf.videoTime - 5,
        videoEndTime: shitf.videoEndTime + 5,
      },
    ];
    this.playShift.emit(video);
  }
}
