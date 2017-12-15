var fighters = [  { fighterId: 0, color: '#FF0000', name: "Ragnar", speed: 5, action: 17, top: true, acting: true, dead: false },
                    { fighterId: 1, color: '#FF0000', name: "Robert", speed: 7, action: 10, top: false, acting: true, dead: false },
                    { fighterId: 2, color: '#FF0000', name: "Sir William", speed: 15, action: 25, top: true, acting: true, dead: true },
                    { fighterId: 3, color: '#FF0000', name: "Ulrich VonLichstein", speed: 10, action: 1, top: false, acting: true, dead: false }]

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
    }
    
}