import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { loading } from "src/app/animations/animations";
import { PlaylistService } from "src/app/services/playlist.service";
import { Playlist } from "src/app/interface/interface";

@Component({
  selector: "app-pop-up",
  templateUrl: "./pop-up.component.html",
  styleUrls: ["./pop-up.component.scss"],
})
export class PopUpComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Playlist>();
  @Output() wasDeleted = new EventEmitter<boolean>();
  @Output() filtered = new EventEmitter<string[]>();
  @Input() pop_up_data: Playlist;
  @Input() pop_up_action = "";

  playlist: Playlist[] = [];
  events_count = {
    all: 0,
    shift: 0,
    shot: 0,
    goal: 0,
    assist: 0,
    pass: 0,
    faceOff: 0,
    positiveParticipation: 0,
    negativeParticipation: 0,
  };
  active_filters: string[] = [];

  loading = false;
  sucessfull = false;
  requested = false!;

  img = "";
  edit_header = "";
  edit_text = "";

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    console.log("Pop Up action", this.pop_up_action);

    if (this.pop_up_action != "filter") {
      if (this.pop_up_action == "delete") {
        this.img = "icoTrash";
      } else if (this.pop_up_data.type == "negative") {
        this.img = "negative_big";
      } else if (this.pop_up_data.type == "neutral") {
        this.img = "neutral_big";
      } else if (this.pop_up_data.type == "positive") {
        this.img = "positive_big";
      }

      if (this.pop_up_data.name) {
        this.edit_header = this.pop_up_data.name;
      }
      if (this.pop_up_data.description) {
        this.edit_text = this.pop_up_data.description;
      }
    } else {
      if (sessionStorage.getItem("filters") !== null) {
        let filters = JSON.parse(sessionStorage.getItem("filters") || "");

        if (filters) {
          this.active_filters = filters;
        }
      }

      this.getPlaylist();
    }

    console.log("pop_up_data", this.pop_up_data);
  }

  checkNullFilters() {
    let events_count = this.events_count;
    for (let key in this.events_count) {
      let test = key as keyof typeof events_count;
      if (this.events_count[test] == 0) {
        this.active_filters.forEach((filter, index) => {
          if (filter == (test as string)) {
            this.active_filters.splice(index, 1);
          }
        });
      }
      console.log("Key", this.events_count[test]);
    }
  }

  getPlaylist() {
    this.loading = true;
    this.playlist = JSON.parse(sessionStorage.getItem("playList") || "");
    this.playlist.forEach((item) => {
      this.events_count.all++;
      if (item.event == "shift") {
        this.events_count.shift++;
      } else if (item.event == "shot") {
        this.events_count.shot++;
      } else if (item.event == "goal") {
        this.events_count.goal++;
      } else if (item.event == "assist") {
        this.events_count.assist++;
      } else if (item.event == "pass") {
        this.events_count.pass++;
      } else if (item.event == "faceOff") {
        this.events_count.faceOff++;
      } else if (item.event == "positiveParticipation") {
        this.events_count.positiveParticipation++;
      } else if (item.event == "negativeParticipation") {
        this.events_count.negativeParticipation++;
      }
    });
    console.log("Ev count", this.events_count);
    this.checkNullFilters();
    this.loading = false;
  }

  saveAndExit() {
    this.loading = true;
    this.requested = true;

    this.playlistService
      .updatePlaylist(
        this.pop_up_data.id,
        this.pop_up_data.date,
        this.pop_up_data.type,
        this.pop_up_data.start || null,
        this.pop_up_data.end || null,
        this.edit_header,
        this.edit_text
      )
      ?.subscribe({
        next: (recivedData) => {
          this.loading = false;
          this.sucessfull = true;
          this.wasDeleted.emit(true);
          setTimeout(() => {
            this.closePopUp();
          }, 1000);
        },
        error: (err) => {
          this.loading = false;
          this.sucessfull = false;
          alert("Update failed, try again or contact our support");
          setTimeout(() => {
            this.closePopUp();
          }, 1000);
          //this.logOut();
        },
      });
    //this.closePopUp();
  }

  delete() {
    this.loading = true;
    this.requested = true;
    this.playlistService.removeFromPlaylist(this.pop_up_data.id)?.subscribe({
      next: (recivedData) => {
        this.loading = false;
        this.sucessfull = true;
        this.wasDeleted.emit(true);
        setTimeout(() => {
          this.closePopUp();
        }, 500);
      },
      error: (err) => {
        this.loading = false;
        this.sucessfull = false;
        alert("Removing failed, try again or contact our support");
        setTimeout(() => {
          this.closePopUp();
        }, 1000);
        //this.logOut();
      },
    });

    //this.closePopUp();
  }

  isActive(filter: string): boolean {
    let isIn = false;
    this.active_filters.forEach((item) => {
      if (item == filter) {
        isIn = true;
        return;
      }
    });
    return isIn;
  }

  selectAction(action: keyof typeof this.events_count): void {
    if (action == "all") {
      this.selectAll();
    } else {
      if (this.events_count[action] > 0) {
        if (this.active_filters.length != 0) {
          let vasDeleted = false;
          this.active_filters.forEach((item, index) => {
            if (item == action) {
              this.active_filters.splice(index, 1);
              vasDeleted = true;
              if (this.active_filters.includes("all")) {
                this.active_filters.splice(
                  this.active_filters.indexOf("all"),
                  1
                );
              }
              return;
            }
          });
          if (!vasDeleted) {
            this.active_filters.push(action);
          }
        } else {
          this.active_filters.push(action);
        }
      }
    }
  }

  selectAll() {
    if (this.active_filters.includes("all")) {
      this.active_filters = [];
    } else {
      this.active_filters = [];
      this.active_filters.push("all");
      if (this.events_count.shift > 0) {
        this.active_filters.push("shift");
      }
      if (this.events_count.pass > 0) {
        this.active_filters.push("pass");
      }
      if (this.events_count.shot > 0) {
        this.active_filters.push("shot");
      }
      if (this.events_count.goal > 0) {
        this.active_filters.push("goal");
      }
      if (this.events_count.assist > 0) {
        this.active_filters.push("assist");
      }
      if (this.events_count.faceOff > 0) {
        this.active_filters.push("faceOff");
      }
      if (this.events_count.positiveParticipation > 0) {
        this.active_filters.push("positiveParticipation");
      }
      if (this.events_count.negativeParticipation > 0) {
        this.active_filters.push("negativeParticipation");
      }
    }
  }

  saveFilters() {
    sessionStorage.setItem("filters", JSON.stringify(this.active_filters));
    this.filtered.emit(this.active_filters);
  }

  closePopUp() {
    this.close.emit(false);
  }
}
