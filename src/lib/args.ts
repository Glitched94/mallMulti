import { Args } from "grimoire-kolmafia";
import { Snapshot } from "snapshot-libram";

export const args = Args.create(
  "mallMulti",
  "A script by and for The Powers That Be. Will send all items and meat gained between two events to The Powers That Buy. No refunds.",
  {
    multi: Args.string({
      setting: "tptb.mallMulti",
      help: "The username of the player to send the items to.",
      default: "The Powers That Buy",
    }),
    start: Args.string({
      setting: "",
      help: "The path to the Snapshot containing the starting inventory. Path does not need to include 'data/', but must end in '.json'. See the default for an example path.",
      default: Snapshot.getFilepath("start"),
    }),
    end: Args.string({
      setting: "",
      help: "The path to the Snapshot containg the final inventory. Path does not need to include 'data/', but must end in '.json'. See the default for an example path.",
      default: Snapshot.getFilepath("end"),
    }),
    sim: Args.flag({
      setting: "",
      help: "Sim blah blah",
      default: false,
    }),
  },
);
