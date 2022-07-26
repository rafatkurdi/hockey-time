export interface OverviewType {
  name: string;
  season: string;
  teams: {
    name: string;
    players: {
      age: number;
      birthday: string;
      height: number;
      hokejczId: number;
      id: string;
      name: string;
      position: string;
      stick: string;
      surname: string;
      weight: number;
      yearOfBirth: number;
    }[];
    shortName: string;
    shortcut: string;
  }[];
}

export interface OverviewTeamType {
  name: string;
  players: {
    age: number;
    birthday: string;
    height: number;
    hokejczId: number;
    id: string;
    name: string;
    position: string;
    stick: string;
    surname: string;
    weight: number;
    yearOfBirth: number;
  }[];
  shortName: string;
  shortcut: string;
}

export interface OverviewTeamPlayerType {
  age: number;
  birthday: string;
  height: number;
  hokejczId: number;
  id: string;
  name: string;
  position: string;
  stick: string;
  surname: string;
  weight: number;
  yearOfBirth: number;
}

export interface PlayerAdminData {
  id: string;
  url: string;
  createdAt: string;
  expiredAt: string;
  active: boolean;
  visits: {
    date: string;
    ip: string;
  }[];
}

export interface OverviewGamesData {
  id: string;
  date: string;
  homeTeam: {
    id: string;
    name: string;
    shortcut: string;
  };
  awayTeam: {
    id: string;
    name: string;
    shortcut: string;
  };
  score: {
    home: number;
    away: number;
    state: string;
  };
}

export interface Playlist {
  id: string;
  event: string;
  matchId: string;
  videoId: string;
  time: number;
  videoTime: number;
  endVideoTime: number;
  name: string;
  description: string;
  date: string;
  type: string;
  start?: number;
  end?: number;
  enemyTeam?: string;
}

export interface matchEvents {
  fullname: string;
  toi: number;
  assists: {
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }[];
  videoPlayer: {
    videoId: string;
    time: string;
  };
  shotsOnGoal: {
    time: number;
    realTime: string;
    videoTime: number;
    gameState: string;
  }[];
  chances: {
    time: number;
    realTime: string;
    videoTime: number;
    gameState: string;
  }[];
  goals: {
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }[];
  shifts: {
    start: number;
    end: number;
    realTime: string;
    videoTime: number;
    videoEndTime: number;
    gameState: string;
  }[];
  faceOffs: {
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }[];
  positiveParticipation: {
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }[];
  negativeParticipation: {
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }[];
  passes: {
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }[];
  penalties: [];
}

export interface matchEventsGoalKeeper {
  crossIcePassShotsSaved: Array<{
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }>;
  fullname: string;
  goalsAgainst: Array<{
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }>;
  innerSlotShotsSaved: Array<{
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }>;
  oddManRushesSaved: Array<{
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }>;
  oneTimersSaved: Array<{
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }>;
  reboundsSaved: Array<{
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }>;
  saves: Array<{
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }>;
  slotShotsSaved: Array<{
    gameState: string;
    realTime: string;
    time: number;
    videoTime: number;
  }>;
  toi: number;
  videoPlayer: {
    videoId: string;
    time: string;
  };
}

export interface CommonObject {
  gameState: string;
  realTime: string;
  time: number;
  videoTime: number;
  saved?: boolean;
}

export interface Shift {
  start: number;
  end: number;
  realTime: string;
  videoTime: number;
  videoEndTime: number;
  gameState: string;
  saved?: boolean;
}

export interface VideoCoachNotes {
  date: string;
  description: string;
  endVideoTime: number;
  id: string;
  matchId: string;
  name: string;
  time: number;
  type: string;
  videoId: string;
  videoTime: number;
  saved?: boolean;
}


export interface Shot {
  time: number;
  realTime: string;
  videoTime: number;
  gameState: string;
  saved?: boolean;
}

export interface Goal {
  gameState: string;
  realTime: string;
  time: number;
  videoTime: number;
  saved?: boolean;
}

export interface GoalAgainst {
  gameState: string,
  realTime: string,
  time: number
  videoTime: number
}

export interface Assist {
  gameState: string;
  realTime: string;
  time: number;
  videoTime: number;
  saved?: boolean;
}

export interface Faceoff {
  gameState: string;
  realTime: string;
  time: number;
  videoTime: number;
  saved?: boolean;
}

export interface Participation {
  gameState: string;
  realTime: string;
  time: number;
  videoTime: number;
  positive?: boolean;
  saved?: boolean;
}

export interface Pass {
  gameState: string;
  realTime: string;
  time: number;
  videoTime: number;
  saved?: boolean;
}

export interface VideToPlay {
  id?: string;
  videoTime: number;
  videoEndTime: number;
  videoId?: string;
  selected?: boolean;
}
