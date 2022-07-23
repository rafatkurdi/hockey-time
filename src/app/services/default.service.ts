import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import {
  matchEvents,
  OverviewGamesData,
  OverviewType,
} from "../interface/interface";

@Injectable({
  providedIn: "root",
})
export class DefaultService {
  public token: string;

  api_url: string = "https://logiqplayer.statistics.datasport.cz";
  api_url_test: string = "http://logiq.statistics.datasport.cz";

  constructor(private http: HttpClient, private router: Router) {
    if (sessionStorage.getItem("currentUser")) {
      let currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "");
      if (currentUser) {
        this.token = currentUser.access_token;
      }
    }
  }

  getToken(post: { client_id: string; client_secret: string }) {
    console.log("1");
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers };

    const body = {
      grant_type: "client_credentials",
      client_id: post.client_id,
      client_secret: post.client_secret,
    };

    return this.http.post<{
      access_token: string;
      expires_in: number;
      token_type: string;
      scope: any;
    }>(this.api_url + "/api/token", body, options);
  }

  getTokenTemporary(post: { client_id: string; client_secret: string }) {
    console.log("1");
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const options = { headers };

    const body = {
      grant_type: "client_credentials",
      client_id: post.client_id,
      client_secret: post.client_secret,
    };

    return this.http.post<{
      access_token: string;
      expires_in: number;
      token_type: string;
      scope: any;
    }>( "https://logiqplayer-test.statistics.datasport.cz/api/token", body, options);
  }

  logOut() {
    this.token = "";
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("loaded_data");
    this.router.navigate(["/"]);
  }

  getPlayerLanguage() {
    const headers = new HttpHeaders({ Authorization: "Bearer " + this.token });
    const options = { headers };

    return this.http.get<{ language: string }>(
      this.api_url + "/api/language",
      options
    );
  }

  getOverview(playerId: string) {
    console.log("2");
    const headers = new HttpHeaders({ Authorization: "Bearer " + this.token });
    const options = { headers };
    if (playerId && playerId != "") {
      return this.http.get<OverviewGamesData[]>(
        this.api_url + "/api/overview",
        options
      );
    } else {
      this.errorHandler("getOverview", "playerId");
      return;
    }
  }

  getCompetetionOverview() {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
    const options = { headers };

    console.log("Options", options);

    return this.http.get<OverviewType>(
      this.api_url + "/api/competition",
      options
    );
  }

  getMatchEvents(matchId: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.token,
    });
    const options = { headers };
    if (matchId) {
      return this.http.get<any>(
        this.api_url + "/api/video/" + matchId,
        options
      );
    } else {
      this.errorHandler("getMatchEvents", "matchId");
      return;
    }
  }

  checkToken(token: string) {
    if (!token) {
      console.error("default-service: Token is empty/undefined!");
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
