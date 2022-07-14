import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { VideToPlay } from "src/app/interface/interface";

@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.scss"],
})
export class VideoComponent implements OnInit, OnChanges {
  @Output() filtered = new EventEmitter<string[]>();
  @Input() widget = "";
  @Input() to_play: VideToPlay[];
  @Input() set_play: VideToPlay[];

  selected_filters: string[] = [];
  filter = "";

  url: any;

  show_video = false;
  pop_up = false;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    console.log("Playlist video:", this.to_play);
    if (window.innerHeight < window.innerWidth) {
      console.log("Screen", window.screen.height);
    }
    console.log("To play", this.to_play);
    console.log("Set play", this.set_play);
  }

  ngOnChanges(): void {
    console.log("Set play:", this.set_play);
    this.playVideo();
  }

  playVideo() {
    if (this.to_play) {
      let url =
        "https://hockeytime.cz/video_player/video.php?playlist=" +
        JSON.stringify(this.to_play);
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url) || "";
      //console.log("Url", this.url);
    }
  }

  playAll() {
    if (this.set_play) {
      this.show_video = true;
      let url =
        "https://hockeytime.cz/video_player/video.php?playlist=" +
        JSON.stringify(this.set_play);
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url) || "";
    }
  }

  playSelected() {
    if (this.set_play) {
      this.show_video = true;
      let selected: VideToPlay[] = [];
      this.set_play.forEach((video) => {
        if (video.selected) {
          selected.push(video);
        }
      });
      let url =
        "https://hockeytime.cz/video_player/video.php?playlist=" +
        JSON.stringify(selected);
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(url) || "";
      //console.log("Url", this.url);
    }
  }

  showPopUp() {
    this.pop_up = !this.pop_up;
  }

  filterPlaylist(filtered: string[]) {
    this.showPopUp();
    this.filtered.emit(filtered);
    this.selected_filters = filtered;
    console.log("Filtered", filtered);
  }
}
