import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
import { swipeUpDown, swipeDownUp } from "src/app/animations/animations";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  animations: [swipeUpDown, swipeDownUp],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() showGames = new EventEmitter<boolean>();
  @Output() backToHome = new EventEmitter<string>();
  @Output() showPlaylist = new EventEmitter<string>();
  @Input() widget = "";
  @Input() show_games = false;

  is_open = false;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  openGames(): void {
    this.show_games = !this.show_games;
    this.showGames.emit(this.show_games);
  }

  openPlaylist(): void {
    this.showPlaylist.emit("playlist");
  }

  close(): void {
    this.show_games = false;
    this.showGames.emit(this.show_games);
    this.backToHome.emit();
  }
}
