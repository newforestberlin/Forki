var PF = require('pathfinding');
var grid = new PF.Grid(500, 500);
var finder = [];
finder[0] = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
});
finder[1] = new PF.BestFirstFinder({
    allowDiagonal: true,
    dontCrossCorners: true
});
finder[2] = new PF.DijkstraFinder({
    allowDiagonal: true,
    dontCrossCorners: true
});
finder[3] = new PF.BiAStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
});
finder[4] = new PF.BiBestFirstFinder({
    allowDiagonal: true,
    dontCrossCorners: true
});
finder[5] = new PF.BiDijkstraFinder({
    allowDiagonal: true,
    dontCrossCorners: true
});
finder[6] = new PF.BiBestFirstFinder({
    allowDiagonal: true,
    dontCrossCorners: true
});
let i = 0;
compareAlgos();
async function compareAlgos() {
    for (let algo of finder) {
        i++;
        var before = Date.now();
        await findPath(algo);
        var after = Date.now();
        console.log(i + ":=> " + (after - before));
    }
}

function findPath(algo) {
    return new Promise(resolve => {
        resolve(algo.findPath(0, 0, 450, 460, grid))
    })
}


// let pathString = "M";
// for (let i = 0; i < path.length; i++) {
//     if (i === 1) {
//         pathString += "S" + path[i][0] * 20 + " " + path[i][1] * 10 + ","
//     } else {
//         pathString += path[i][0] * 20 + " " + path[i][1] * 10 + ","
//     }
// }
// // console.log(pathString.slice(0,-1));