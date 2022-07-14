import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import {
  Participation,
  Playlist,
  VideToPlay,
} from "src/app/interface/interface";

@Component({
  selector: "app-positive-negative-participations",
  templateUrl: "./positive-negative-participations.component.html",
  styleUrls: ["./positive-negative-participations.component.scss"],
})
export class PositiveNegativeParticipationsComponent implements OnInit {
  @Output() saveToPlaylist = new EventEmitter<Participation>();
  @Output() playParticipation = new EventEmitter<VideToPlay[]>();
  @Output() setSelected = new EventEmitter<VideToPlay[]>();
  @Input() participations: Participation[] = [];

  set_video: VideToPlay[] = [];
  selected_participations: Participation[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.participations.sort((a, b) => {
      return a.videoTime - b.videoTime;
    });
    this.participations.forEach((participation) => {
      participation.gameState = participation.gameState.replace(/:/g, "/");
    });

    this.setSaved();
    this.setSelectedVideo();
    this.cd.detectChanges();
  }

  selectParticipations(participations: Participation): void {
    if (this.selected_participations.length != 0) {
      let vasDeleted = false;
      this.selected_participations.forEach((item, index) => {
        if (item.time == participations.time) {
          this.selected_participations.splice(index, 1);
          vasDeleted = true;
          return;
        }
      });

      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == participations.videoTime) {
            video.selected = false;
            return;
          }
        });
      }

      if (!vasDeleted) {
        this.selected_participations.push(participations);
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == participations.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    } else {
      this.selected_participations.push(participations);
      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == participations.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    }
    this.setSelected.emit(this.set_video);
  }

  isActive(participation: Participation): boolean {
    let isIn = false;
    this.selected_participations.forEach((item, index) => {
      if (item.time == participation.time) {
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
    this.participations.forEach((participation) => {
      participation.saved = false;
    });
    if (saved) {
      saved.forEach((item) => {
        if (
          item.event == "positiveParticipation" ||
          item.event == "negativeParticipation"
        ) {
          this.participations.forEach((participation) => {
            if (
              participation.videoTime == item.videoTime &&
              participation.realTime.substring(0, 10) == item.date
            ) {
              participation.saved = true;
              return;
            }
          });
        }
      });
    }
  }

  setSelectedVideo() {
    this.participations.forEach((participation) => {
      this.set_video.push({
        videoTime: participation.videoTime - 5,
        videoEndTime: participation.videoTime + 5,
        selected: false,
      });
    });
    this.setSelected.emit(this.set_video);
  }

  addToPlaylist(participation: Participation) {
    if (!participation.saved) {
      participation.saved = true;
      this.saveToPlaylist.emit(participation);
    }
  }

  playOne(participation: Participation) {
    let video: VideToPlay[] = [
      {
        videoTime: participation.videoTime - 5,
        videoEndTime: participation.videoTime + 5,
      },
    ];
    this.playParticipation.emit(video);
  }
}
