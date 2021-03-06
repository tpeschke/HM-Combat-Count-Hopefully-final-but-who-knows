var fighters = { total: [   { fighterId: 0, color: '#FF0000', name: "Ragnar", speed: 5, action: 17, top: true, acting: true, dead: false },
                            { fighterId: 1, color: '#FF0000', name: "Robert", speed: 7, action: 10, top: false, acting: true, dead: false },
                            { fighterId: 2, color: '#FF0000', name: "Sir William", speed: 15, action: 25, top: true, acting: true, dead: true },
                            { fighterId: 3, color: '#FF0000', name: "Ulrich VonLichstein", speed: 10, action: 1, top: false, acting: true, dead: false }
                        ]
                }

var statuses = [    { statId: 2, name: 'BLINDNESS', time: 30 },
                    { statId: 15, name: 'FIRE', time: 15 } ]

module.exports = {
    read: (req, res) => {
        res.status(200).send(fighters)
    },

    delete: (req, res) => {
        
        var {params} = req;

        fighters.forEach((val, i) => {
            if (val.fighterId == params.id) {
                fighters.splice(i,1)
            }
        })
    
        res.status(200).send(fighters)
    },

    deleteAll: (req, res) => {
        
        fighters = []

        res.status(200).send(fighters)
    },

    updateFighter: (req, res) => {

        const {fighterId, name, color, speed, action} = req.body;
    
        fighters.forEach(val => {
            if (val.fighterId === fighterId) {
                name != val.name ? val.name = name : null;
                color != val.color ? val.color = color : null;
                speed != val.speed ? val.speed = speed : null;
                val.action = action
            }
        })

        res.status(200).send(fighters)
    },

    createFighter: (req, res) => {

        fighters.push(req.body)
        res.status(200).send(fighters)
    },
    
//==============Status Gets=======================================

    readStatus: (req, res) => {
        res.status(200).send(statuses)
    },

    deleteStatus: (req, res) => {

        var { params } = req;

        statuses.forEach( (val, i) => {
            if (val.statId == params.id ) {
                statuses.splice(i,1)
            }
        })

        res.status(200).send(statuses)
    },

    createStatus: (req, res) => {
        statuses.push(req.body)
        res.status(200).send(statuses)
    }

}