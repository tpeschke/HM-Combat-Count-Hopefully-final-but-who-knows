var fighters = [  { color: '#FF0000', name: "Ragnar", speed: 5, action: 17, top: true, acting: true, dead: false },
                    { color: '#FF0000', name: "Robert", speed: 7, action: 10, top: false, acting: true, dead: false },
                    { color: '#FF0000', name: "Sir William", speed: 15, action: 25, top: true, acting: true, dead: true },
                    { color: '#FF0000', name: "Ulrich VonLichstein", speed: 10, action: 1, top: false, acting: true, dead: false }]

module.exports = {
    read: (req, res) => {
        res.status(200).send(fighters)
    }
    
}