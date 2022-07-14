import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonObject, Goal, Playlist, VideToPlay} from "../../interface/interface";

@Component({
  selector: 'app-rebounds-saved',
  templateUrl: './rebounds-saved.component.html',
  styleUrls: ['./rebounds-saved.component.scss']
})
export class ReboundsSavedComponent implements OnInit {

  @Output() saveToPlaylist = new EventEmitter<CommonObject>();
  @Output() playReboundsSaved = new EventEmitter<VideToPlay[]>();
  @Output() setSelected = new EventEmitter<VideToPlay[]>();
  @Input() goals: CommonObject[] = [];

  set_video: VideToPlay[] = [];
  selected_goals: CommonObject[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.goals.sort((a, b) => {
      return a.time - b.time;
    });
    this.goals.forEach((goal) => {
      goal.gameState = goal.gameState.replace(/:/g, "/");
    });

    this.setSaved();
    this.setSelectedVideo();
    this.cd.detectChanges();
  }

  selectGoal(goal: Goal): void {
    if (this.selected_goals.length != 0) {
      let vasDeleted = false;
      this.selected_goals.forEach((item, index) => {
        if (item.time == goal.time) {
          this.selected_goals.splice(index, 1);
          vasDeleted = true;
          return;
        }
      });

      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == goal.videoTime) {
            video.selected = false;
            return;
          }
        });
      }

      if (!vasDeleted) {
        this.selected_goals.push(goal);
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == goal.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    } else {
      this.selected_goals.push(goal);
      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == goal.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    }
  }

  isActive(goal: CommonObject): boolean {
    let isIn = false;
    this.selected_goals.forEach((item, index) => {
      if (item.time == goal.time) {
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
    this.goals.forEach((goal) => {
      goal.saved = false;
    });
    if (saved) {
      saved.forEach((item) => {
        if (item.event == "goalsAgainst") {
          this.goals.forEach((goal) => {
            if (
                goal.videoTime == item.videoTime &&
                goal.realTime.substring(0, 10) == item.date
            ) {
              goal.saved = true;
              return;
            }
          });
        }
      });
    }
  }

  setSelectedVideo() {
    this.goals.forEach((goal) => {
      this.set_video.push({
        videoTime: goal.videoTime - 5,
        videoEndTime: goal.videoTime + 5,
        selected: false,
      });
    });
    this.setSelected.emit(this.set_video);
  }

  addToPlaylist(goal: CommonObject) {
    if (!goal.saved) {
      goal.saved = true;
      this.saveToPlaylist.emit(goal);
    }
  }

  playOne(goal: CommonObject) {
    let video: VideToPlay[] = [
      {
        videoTime: goal.videoTime - 5,
        videoEndTime: goal.videoTime + 5,
      },
    ];
    this.playReboundsSaved.emit(video);
  }
}
