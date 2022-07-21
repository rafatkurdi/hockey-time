import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  OverviewType,
  PlayerAdminData,
  OverviewGamesData,
} from "../interface/interface";
@Injectable({
  providedIn: "root",
})
export class AdminService {
  public token = "";

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

  getOverview() {
    const headers = new HttpHeaders({ Authorization: "Bearer " + this.token });
    const options = { headers };

    return this.http.get<OverviewType>(
      this.api_url + "/api/competition",
      options
    );
  }

  setPlayerLanguage(registrationNumber: string, language: string) {
    const headers = new HttpHeaders({ Authorization: "Bearer " + this.token });
    const options = { headers };

    let body = {
      language: language,
    };

    if (registrationNumber) {
      return this.http.put(
        this.api_url + "/api/admin/language/" + registrationNumber,
        body,
        options
      );
    } else {
      this.errorHandler("setPlayerLanguage", "registrationNumber");
      return;
    }
  }

  getPlayerLanguage(registrationNumber: string) {
    const headers = new HttpHeaders({ Authorization: "Bearer " + this.token });
    const options = { headers };

    if (registrationNumber) {
      return this.http.get<{ language: string }>(
        this.api_url + "/api/admin/language/" + registrationNumber,
        options
      );
    } else {
      this.errorHandler("getPlayerLanguage", "registrationNumber");
      return;
    }
  }

  getPlayersOverview(registrationNumber: string) {
    const headers = new HttpHeaders({ Authorization: "Bearer " + this.token });
    const options = { headers };

    if (registrationNumber) {
      return this.http.get<OverviewGamesData[]>(
        this.api_url + "/api/admin/overview/" + registrationNumber,
        options
      );
    } else {
      this.errorHandler("getPlayersOverview", "registrationNumber");
      return;
    }
  }

  getMatchEventsAdmin(matchId: string, registrationNumber: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
    const options = { headers };
    if (matchId && registrationNumber) {
      return this.http.get<any>(
        this.api_url + "/api/admin/video/" + matchId + "/" + registrationNumber,
        options
      );
    } else {
      this.errorHandler("getMatchEvents", "matchId/registrationNumber");
      return;
    }
  }

  getVideoCoachVideoClips(registrationNumber: string) {
    const headers = new HttpHeaders({
      //Authorization: "Bearer " + this.token,
      Authorization: "Bearer " + "936de4d7723c27fab23a10303fda9f2fade0e1cb",
    });
    const options = { headers };
      return this.http.get<any>(
        "https://logiqplayer-test.statistics.datasport.cz" + "/api/videoClip",
        options
      );
  }

  //Will load all selected player tokens infos
  getPlayerAcces(registrationNumber: string | undefined) {
    const headers = new HttpHeaders({ Authorization: "Bearer " + this.token });
    const options = { headers };

    console.log("Reg param", registrationNumber);
    if (registrationNumber) {
      return this.http.get<PlayerAdminData[]>(
        this.api_url + "/api/admin/access/" + registrationNumber,
        options
      );
    } else {
      this.errorHandler("getPlayerAcces", "registrationNumber");
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
