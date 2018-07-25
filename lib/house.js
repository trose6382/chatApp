let Room = require('./room.js')

module.exports = class House {
    constructor() {
        this.allRooms = [];
    }
    roomWithId(roomId) {
        let roomFound = this.allRooms.find((room) => {
            return room.id === roomId;
        })

        if (roomFound) {
            return roomFound;
        } else {
            let newRoom = new Room(roomId)
            this.allRooms.push(newRoom);
            return newRoom;
        }
    }
    allRoomIds() {
        return this.allRooms.map(room => room.id)
    }
    sendMessageToRoom(id, options = {}) {
        let room = this.roomWithId(id)
        room.messages.push(options);
    }
};