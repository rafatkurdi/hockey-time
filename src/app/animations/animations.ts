import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";

export const showHide = trigger("showHide", [
  transition(":enter", [
    style({ opacity: 1, top: "-242px", zIndex: "1" }),
    animate(400, style({ opacity: 1, top: "64px" })),
    animate(100, style({ top: "58px" })),
    animate(100, style({ top: "64px" })),
    animate(50, style({ top: "62px" })),
    animate(50, style({ top: "64px" })),
  ]),
  transition(":leave", [animate(400, style({ top: "-242px" }))]),
]);

export const swipeDownUp = trigger("swipeUpDown", [
  transition(":enter", [
    style({ transform: "translateY(-60px)" }),
    animate(200, style({ transform: "translateY(0px)" })),
  ]),
  transition(":leave", [
    style({ position: "absolute" }),
    animate(200, style({ transform: "translateY(-60px)" })),
  ]),
]);

export const swipeUpDown = trigger("swipeDownUp", [
  transition(":enter", [
    style({ transform: "translateY(60px)" }),
    animate(200, style({ transform: "translateY(0px)" })),
  ]),
  transition(":leave", [
    style({ position: "absolute" }),
    animate(200, style({ transform: "translateY(60px)" })),
  ]),
]);

export const swipeLeftRight = trigger("swipeLeftRight", [
  transition(":enter", [
    style({
      transform: "translateX(100vw)",
      position: "absolute",
      width: "100vw",
    }),
    animate(300, style({ transform: "translateX(0vw)" })),
  ]),
  transition(":leave", [
    style({ position: "absolute", width: "100vw" }),
    animate(300, style({ transform: "translateX(100vw)" })),
  ]),
]);

export const swipeRightLeft = trigger("swipeRightLeft", [
  transition(":enter", [
    style({
      transform: "translateX(-100vw)",
      position: "absolute",
      width: "100vw",
    }),
    animate(300, style({ transform: "translateX(0px)" })),
  ]),
  transition(":leave", [
    style({ position: "absolute", width: "100vw" }),
    animate(300, style({ transform: "translateX(-100vw)" })),
  ]),
]);

//Go

export const goYOut = trigger("goYOut", [
  transition(
    ":leave",
    [
      animate("{{delay}}ms"),
      animate(200, style({ transform: "translateY({{from}})" })),
      animate(400, style({ transform: "translateY({{to}})" })),
    ],
    { params: { delay: 0, from: "0", to: "0" } }
  ),
]);

export const goXOut = trigger("goXOut", [
  transition(
    ":leave",
    [
      animate("{{delay}}ms"),
      animate(200, style({ transform: "translateX({{from}})" })),
      animate(400, style({ transform: "translateX({{to}})" })),
    ],
    { params: { delay: 0, from: "0", to: "0" } }
  ),
]);

//Loading
export const loading = trigger("loading", [
  transition(":enter", [
    style({ transform: "translateY(50vh)", width: "50px", height: "50px" }),
    animate(
      300,
      style({ transform: "translateY(0)", width: "100px", height: "100px" })
    ),
  ]),
]);
