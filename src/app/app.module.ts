import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { TranslatePipe } from "./pipes/translate.pipe";
import { HeaderComponent } from "./components/header/header.component";
import { PlayerInfoComponent } from "./components/player-info/player-info.component";
import { GameComponent } from "./components/games/games.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AllShiftsComponent } from "./components/all-shifts/all-shifts.component";
import { LoginComponent } from "./pages/login/login.component";
import { FormsModule } from "@angular/forms";
import { AdminComponent } from "./pages/admin/admin.component";
import { VideoComponent } from "./components/video/video.component";
import { RouterModule, Routes } from "@angular/router";
import { LoadingComponent } from "./components/loading/loading.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./_guards/auth.guard";
import { FormatDatePipe } from "./pipes/format-date.pipe";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormatTimePipe } from "./pipes/format-time.pipe";
import { ShotsComponent } from "./components/shots/shots.component";
import { GoalsComponent } from "./components/goals/goals.component";
import { GoalAssistsComponent } from "./components/goal-assists/goal-assists.component";
import { FaceoffsComponent } from "./components/faceoffs/faceoffs.component";
import { PositiveNegativeParticipationsComponent } from "./components/positive-negative-participations/positive-negative-participations.component";
import { ShotAssistsComponent } from "./components/shot-assists/shot-assists.component";
import { PlaylistComponent } from "./components/playlist/playlist.component";
import { PopUpComponent } from "./components/pop-up/pop-up.component";
import { GoalAgainstComponent } from './components/goal-against/goal-against.component';
import { SavesComponent } from './components/saves/saves.component';
import { SlotShotsSavedComponent } from './components/slot-shots-saved/slot-shots-saved.component';
import { CrossIcePassShotSavedComponent } from './components/cross-ice-pass-shot-saved/cross-ice-pass-shot-saved.component';
import { InnerSlotShotSavedComponent } from './components/inner-slot-shot-saved/inner-slot-shot-saved.component';
import { OddManRushesSavedComponent } from './components/odd-man-rushes-saved/odd-man-rushes-saved.component';
import { OneTimerSavedComponent } from './components/one-timer-saved/one-timer-saved.component';
import { ReboundsSavedComponent } from './components/rebounds-saved/rebounds-saved.component';

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "admin", component: AdminComponent, canActivate: [AuthGuard] },
  { path: "auth", component: AuthComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TranslatePipe,
    HeaderComponent,
    PlayerInfoComponent,
    GameComponent,
    AllShiftsComponent,
    LoginComponent,
    AdminComponent,
    VideoComponent,
    LoadingComponent,
    AuthComponent,
    FormatDatePipe,
    FormatTimePipe,
    ShotsComponent,
    GoalsComponent,
    GoalAssistsComponent,
    FaceoffsComponent,
    PositiveNegativeParticipationsComponent,
    ShotAssistsComponent,
    PlaylistComponent,
    PopUpComponent,
    GoalAgainstComponent,
    SavesComponent,
    SlotShotsSavedComponent,
    CrossIcePassShotSavedComponent,
    InnerSlotShotSavedComponent,
    OddManRushesSavedComponent,
    OneTimerSavedComponent,
    ReboundsSavedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatExpansionModule,
  ],
  providers: [FormatDatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
