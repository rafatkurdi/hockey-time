import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "translate",
})
export class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    /* let language = (sessionStorage.getItem("language") ||
      "cz") as keyof typeof translates[number];
 */
    let language: keyof typeof translates[number] = "cz";
    if (sessionStorage.getItem("language")) {
      language = JSON.parse(
        sessionStorage.getItem("language") ?? "cz"
      ) as keyof typeof translates[number];
    }

    //console.log("Language pipe", language);

    const translates: {
      key: string;
      cz: string;
      en: string;
    }[] = [
      {
        key: "all_shifts",
        cz: "Všechna střídání",
        en: "All shifts",
      },
      {
        key: "goals_against",
        cz: "Obdržené góly",
        en: "Goals against",
      },
      {
        key: "saves_goalkeeper",
        cz: "Chycené střely",
        en: "Saves",
      },
      {
        key: "slot_shots_saved_goalkeeper",
        cz: "Chycené střely ze slotu",
        en: "Slot shots saved",
      },
      {
        key: "cross_ice_pass_sots_saved_goalkeeper",
        cz: "Chycené střely z křižných přihrávek",
        en: "Cross-ice pass shots saved",
      },
      {
        key: "inner_slot_shots_saved",
        cz: "Chycené střely z vnitřního slotu",
        en: "Inner slot shots saved",
      },
      {
        key: "odd_man_rushes_saved",
        cz: "Chycené střely z přečíslení",
        en: "Odd-Man-Rushes saved",
      },
      {
        key: "one_timers_saved",
        cz: "Chycené střely z první",
        en: "One-timers saved",
      },
      {
        key: "rebounds_saved",
        cz: "Chycené střely z dorážky",
        en: "Rebounds saved",
      },
      {
        key: "all_by_date",
        cz: "Všechny podle data",
        en: "All by date",
      },
      {
        key: "show_selected",
        cz: "Zobrazit vybrané",
        en: "Show selected",
      },
      {
        key: "shots",
        cz: "Střely",
        en: "Shots",
      },
      {
        key: "goal_assists",
        cz: "Gólové asistence",
        en: "Goal assists",
      },
      {
        key: "action",
        cz: "Akce",
        en: "Event",
      },
      {
        key: "goal_scored",
        cz: "Vstřelené góly",
        en: "Goals scored",
      },
      {
        key: "goals_scored",
        cz: "Vstřelené góly",
        en: "Goals scored",
      },
      {
        key: "faceoffs",
        cz: "Vhazování",
        en: "FaceOffs",
      },
      {
        key: "faceOff",
        cz: "Vhazování",
        en: "FaceOff",
      },
      {
        key: "assist",
        cz: "Gólová asistence",
        en: "Goal assist",
      },
      {
        key: "assists",
        cz: "Gólové asistence",
        en: "Goal assists",
      },
      {
        key: "pass",
        cz: "Přihrávka na střelu",
        en: "Shot assist",
      },
      {
        key: "passes",
        cz: "Přihrávky na střelů",
        en: "Shot assists",
      },
      {
        key: "negativeParticipation",
        cz: "Negativní účast",
        en: "Negative participation",
      },
      {
        key: "negativeParticipations",
        cz: "Negativní účasti",
        en: "Negative participations",
      },
      {
        key: "positiveParticipation",
        cz: "Pozitivní účast",
        en: "Positive participation",
      },
      {
        key: "positiveParticipations",
        cz: "Pozitivní účasti",
        en: "Positive participations",
      },
      {
        key: "playlist",
        cz: "Playlist",
        en: "Playlist",
      },
      {
        key: "shot_assists",
        cz: "Přihrávky na střely",
        en: "Shot assists",
      },
      {
        key: "plus_minus_participations",
        cz: "Plus / minus účasti",
        en: "+ / - participations",
      },
      {
        key: "my_playlist",
        cz: "Můj playlist",
        en: "All shifts",
      },
      {
        key: "shift",
        cz: "Střídání",
        en: "Shift",
      },
      {
        key: "shifts",
        cz: "Střídání",
        en: "Shifts",
      },
      {
        key: "shot",
        cz: "Střela",
        en: "Shot",
      },
      {
        key: "shots",
        cz: "Střely",
        en: "Shots",
      },
      {
        key: "games",
        cz: "Zápasy",
        en: "Games",
      },
      {
        key: "no_games_played",
        cz: "Nemáte odehraný žádný zápas !",
        en: "You didn't play any match !",
      },
      {
        key: "show_clips",
        cz: "Zobrazit klipy",
        en: "Show clips",
      },
      {
        key: "close_without_saving",
        cz: "Zavřít bez uložení",
        en: "Close without saving",
      },
      {
        key: "save_and_close",
        cz: "Uložit a zavřít",
        en: "Save and close",
      },
      {
        key: "clip_name",
        cz: "Název klipu",
        en: "Clip name",
      },
      {
        key: "note",
        cz: "Poznámka",
        en: "Note",
      },
      {
        key: "close_without_deleting",
        cz: "Zavřít bez smazání",
        en: "Close without deleting",
      },
      {
        key: "delete_from_playlist",
        cz: "Smazat z playlistu",
        en: "Delete from playlist",
      },
      {
        key: "really_delete",
        cz: "Opravdu vymazat?",
        en: "Are you sure?",
      },
      {
        key: "close",
        cz: "Zavřít",
        en: "Close",
      },
      {
        key: "filter",
        cz: "Filtrace",
        en: "Filter",
      },
      {
        key: "play_selected",
        cz: "Přehrát vybrané",
        en: "Play selected",
      },
      {
        key: "play_all",
        cz: "Přehrát vše",
        en: "Play all",
      },
      {
        key: "",
        cz: "",
        en: "",
      },
    ];

    let returnTranslate = "";

    translates.forEach((item) => {
      if (item["key"] === value) {
        returnTranslate = item[language];
      }
    });

    return returnTranslate;
  }
}
