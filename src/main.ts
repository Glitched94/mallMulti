import { Args } from "grimoire-kolmafia";
import { Item, itemAmount, print } from "kolmafia";
import { Kmail } from "libram";
import { Snapshot } from "snapshot-libram";

import { args } from "./lib/args";

export default function main(command: string): void {
  Args.fill(args, command);
  if (args.help) {
    Args.showHelp(args);
    return;
  }

  print(`Finding snapshot ${args.start}`, "teal");
  print(`Finding snapshot ${args.end}`, "teal");
  const start = Snapshot.fromFile(args.start);
  const end = Snapshot.fromFile(args.end);

  const diff = end.diff(start);
  const items = Array.from(diff.items);

  print(`Found ${items.length} items in the diff`);

  const gainedTradables = items.filter(([item, qty]) => qty > 0 && (item.tradeable || item.gift));

  print(`${gainedTradables.length} of them were gained and tradable`);

  const batchedItems = gainedTradables.reduce((batches, curr, i) => {
    if (i % 15 === 0) batches.push([]);
    batches[batches.length - 1].push([gainedTradables[i][0], itemAmount(gainedTradables[i][0])]);
    return batches;
  }, [] as [Item,number][][]);

  batchedItems.forEach((batch) => {
    if (args.sim) {
      batch.forEach(([item, qty]) => {
        print(`Sim: Sending ${qty} ${item} to ${args.multi}`);
      })
    } else {
      printKmail(batch);
      Kmail.send(args.multi, "Mall Mutli dump", new Map(batch));
    }
  });
}

function printKmail(batch: [Item, number][]): void {
  const kmailParts:string[] = [];
  batch.forEach(([item, qty]) => {
    if (qty > 0) {
      kmailParts.push(`${qty} ${qty > 1 ? item.plural : item.name}`);
    }
  })
  
  print(`Sending ${kmailParts.join(', ')} to ${args.multi}`, "blue");
  print("")
  print("")
}