import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { timeout } from "rxjs";
import { Playlist } from "../interface/interface";

@Injectable({
  providedIn: "root",
})
export class PlaylistService {
  public token: string;

  api_url: string = "https://logiqplayer.statistics.datasport.cz";

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "");
    if (currentUser) {
      this.token = currentUser.access_token ?? "";
      this.checkToken(this.token);
    } else {
      console.error("playlist-service: Bad currentUser!");
    }
  }

  getPlaylist() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
    const options = { headers };

    return this.http.get<Playlist[]>(this.api_url + "/api/playlist", options);
  }

  getAdminPlaylist(registrationNumber: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
    const options = { headers };

    if (registrationNumber) {
      return this.http.get<Playlist[]>(
        this.api_url + "/api/admin/playlist/" + registrationNumber,
        options
      );
    } else {
      this.errorHandler("getAdminPlaylist", "registrationNUmber");
      return;
    }
  }

  addToPlaylist(
    event: string,
    time: number,
    videoTime: number,
    endVideoTime: number,
    videoId: string,
    matchId: string,
    name: string | undefined,
    description: string | undefined,
    date: string,
    type: string | undefined,
    start: string,
    end: string
  ) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
    const options = { headers };

    if (!event) {
      this.errorHandler("addToPlaylist", "event");
      return;
    }
    if (!videoId) {
      this.errorHandler("addToPlaylist", "videoId");
      return;
    }
    if (!matchId) {
      this.errorHandler("addToPlaylist", "matchId");
      return;
    }

    const body = {
      event: event,
      time: time,
      videoTime: videoTime,
      endVideoTime: endVideoTime,
      videoId: videoId,
      matchId: matchId,
      name: name,
      description: description,
      date: date,
      type: type,
      start: start,
      end: end,
    };

    console.log("body", body);

    return this.http.post(this.api_url + "/api/playlist", body, options);
  }

  updatePlaylist(
    clipId: string,
    date: string,
    type: string,
    start: number | null,
    end: number | null,
    name: string,
    description: string
  ) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
    const options = { headers };

    const body = {
      name: name || "",
      description: description || "",
      date: date,
      type: type,
      start: start,
      end: end,
    };
    console.log("Body", body);
    return this.http.put(
      this.api_url + "/api/playlist/" + clipId,
      body,
      options
    );
  }

  removeFromPlaylist(clipId: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
    const options = { headers };

    if (clipId) {
      return this.http.delete(
        this.api_url + "/api/playlist/" + clipId,
        options
      );
    } else {
      this.errorHandler("removeFromPlaylist", "clipId");
      return;
    }
  }

  checkToken(token: string) {
    if (!token) {
      console.error("playlist-service: Token is empty/undefined!");
      alert("Bad token!");
    }
  }

  errorHandler(service: string, param: string): void {
    if (!service) {
      service = "unknow service";
    }
    if (!param) {
      param = "unknow";
    }
    console.error(service + ": " + param + " param can't be empty!");
    alert("Opps! Something went wrong.");
  }
}
