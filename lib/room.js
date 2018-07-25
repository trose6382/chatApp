module.exports = class Room {
   
    constructor(id, name) {

        if (!id) {
            throw 'room id required';
        } else if (id.match(/[A-Z\-\s]/)) {
            throw 'room id must contain only lowercase letters';
        } else {
            this.id = id;
            this.name = name || id.charAt(0).toUpperCase() + id.slice(1);
            this.messages = [];
        }
    }
    messageCount() {
        return this.messages.length;

    }

    sendMessage(message) {
        this.messages.push(message);
    }

    messagesSince(since) {
       return this.messages.filter(message => message.when > since);
       
       
       
        // let sinceMessagesArray = []
        // let messages = this.messages;
        // for (let message of messages) {
        //     if(message.when > sinceTime) {
        //         sinceMessagesArray.push(message)
        //     }
        // }
        // return sinceMessagesArray;
    }
}