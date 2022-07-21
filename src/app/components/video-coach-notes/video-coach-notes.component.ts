import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { Playlist,VideoCoachNotes, VideToPlay } from "src/app/interface/interface";

@Component({
  selector: 'app-video-coach-notes',
  templateUrl: './video-coach-notes.component.html',
  styleUrls: ['./video-coach-notes.component.scss']
})
export class VideoCoachNotesComponent implements OnInit {

  @Output() saveToPlaylist = new EventEmitter<VideoCoachNotes>();
  @Output() playVideo = new EventEmitter<VideToPlay[]>();
  @Output() setSelected = new EventEmitter<VideToPlay[]>();
  @Input() videoCoachNotes: VideoCoachNotes[] = [];

  set_video: VideToPlay[] = [];
  selected_videoCoachNotes: VideoCoachNotes[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.videoCoachNotes.sort((a, b) => {
      return a.videoTime - b.videoTime;
    });
    // this.videoCoachNotes.forEach((shift) => {
    //   shift.gameState = shift.gameState.replace(/:/g, "/");
    // });

    this.setSaved();
    this.setSelectedVideo();
    this.cd.detectChanges();
  }

  selectVideoNote(videoCoachNotes: VideoCoachNotes): void {
    if (this.selected_videoCoachNotes.length != 0) {
      let vasDeleted = false;
      this.selected_videoCoachNotes.forEach((item, index) => {
        if (item.videoTime == videoCoachNotes.videoTime) {
          this.selected_videoCoachNotes.splice(index, 1);
          vasDeleted = true;
          return;
        }
      });

      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == videoCoachNotes.videoTime) {
            video.selected = false;
            return;
          }
        });
      }

      if (!vasDeleted) {
        this.selected_videoCoachNotes.push(videoCoachNotes);
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == videoCoachNotes.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    } else {
      this.selected_videoCoachNotes.push(videoCoachNotes);
      if (this.set_video.length != 0) {
        this.set_video.forEach((video) => {
          if (video.videoTime + 5 == videoCoachNotes.videoTime) {
            video.selected = true;
            return;
          }
        });
      }
    }
    this.setSelected.emit(this.set_video);
  }

  isActive(videoCoachNotes: VideoCoachNotes): boolean {
    let isIn = false;
    this.selected_videoCoachNotes.forEach((item, index) => {
      if (item.videoTime == videoCoachNotes.videoTime) {
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
    this.videoCoachNotes.forEach((videoCoachNote) => {
      videoCoachNote.saved = false;
    });
    if (saved) {
      saved.forEach((item) => {
        if (item.event == "shift") {
          this.videoCoachNotes.forEach((videoCoachNote) => {
            if (
              videoCoachNote.videoTime == item.videoTime &&
              videoCoachNote.date.substring(0, 10) == item.date
            ) {
              videoCoachNote.saved = true;
              return;
            }
          });
        }
      });
    }
  }

  setSelectedVideo() {
    this.videoCoachNotes.forEach((shitf) => {
      this.set_video.push({
        videoTime: shitf.videoTime - 5,
        videoEndTime: shitf.endVideoTime + 5,
        selected: false,
      });
    });
    console.log("set Video", this.set_video);
    this.setSelected.emit(this.set_video);
  }

  addToPlaylist(videoCoachNote: VideoCoachNotes) {
    if (!videoCoachNote.saved) {
      videoCoachNote.saved = true;
      this.saveToPlaylist.emit(videoCoachNote);
    }
  }

  playOne(videoCoachNote: VideoCoachNotes) {
    let video: VideToPlay[] = [
      {
        videoTime: videoCoachNote.videoTime - 5,
        videoEndTime: videoCoachNote.endVideoTime + 5,
      },
    ];
    this.playVideo.emit(video);
  }

}
