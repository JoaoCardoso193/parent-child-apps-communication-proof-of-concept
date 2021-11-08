# devNotes

## Known issues:

- There is a known issue where using postMessage from the parent app to the child React app causes a larger number of re-renders than necessary and the addition of duplicate postMessage event listeners in the child React app. This is due to the way React handles re-renders and event listeners. This issue seems to have been fixed in the current version, reaching a compromise where only one extra re-render occurs and one extra event listener is added for each postMessage event. Since this resets for every postMessage event, the number of extra re-renders or event listeners never exceeds 1. As it stands, it looks like this is a non-issue as performance is not significantly affected and no unexpected behavior has been observed resulting from this. However, if unexpected behavior arises and there is no obvious cause, this is worth re-visiting.

## DB:

- File to point to same db inside of public/sharedCollections on child

- Db collection declared in parent inside /imports/db/FoodsCollection
