export function sort(total) {
    let sortedFigh = fighters.total.sort((a, b) => a.action - b.action);

    fighters.total.forEach(val => {
        if (val.action > this.props.count) {
            val.acting = false
        } else {
            val.acting = true
            val.top = false
        }
    })

    var bench = [];
    var acting = [];
    var grave = [];


    fighters.total.forEach(val => {
        if (val.acting === true && val.dead === false) {
            acting.push(val)
        } else if (val.acting === false && val.dead === false) {
            bench.push(val)
        } else (
            grave.push(val)
        )
    })

    return fighters = {
        total: total,
        acting: acting,
        bench: bench,
        grave: grave
    }
}


