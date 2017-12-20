export function sort(input, count) {
    input.total = input.total.sort((a, b) => a.action - b.action);

    input.total.forEach(val => {
        if (val.action > count) {
            val.acting = false
        } else {
            val.acting = true
            val.top = false
        }
    })

    var bench = [];
    var acting = [];
    var grave = [];


    input.total.forEach(val => {
        if (val.acting === true && val.dead === false) {
            acting.push(val)
        } else if (val.acting === false && val.dead === false) {
            bench.push(val)
        } else (
            grave.push(val)
        )
    })

    var fighters = {
        total: input.total,
        acting: acting,
        bench: bench,
        grave: grave
    }

    return fighters
}


