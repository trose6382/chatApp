const http = require('http');           //const like let, but can't change variable. this adds "http"
const mime = require('mime-types');
const Assistant = require('./assistant');

const port = process.env.PORT || 5000;      //if there is a port, it will use that. OR it will default to 5000. Best to give it a default port. 
// let messages = [];

let house = new House()

http.createServer(handleRequest).listen(port);            //takes the port
console.log('Listening on port:' + port);

function handleRequest(request, response) {                  //creates server using http. and gives a request and waits for response
    let assistant = new Assistant(request, response) //needs a request and response passed through it because it calls for that in the assistant.js file.
    let path = assistant.path;


    try {
        if (path === '/') {
            assistant.sendFile('index.html');
        } else if (path === '/chat') {

            if (request.method === "POST") {
            // assistant.sendFile('index.html');

            assistant.parsePostParams((params) => {
                let message = {
                    name: 'Anonymous',
                    body: params.body,
                    when: new Date().toISOString()
                }
                messages.push(message);  //messages would be an array, and we could push message onto it. 
                let data = JSON.stringify(messages);
                let type = mime.lookup('json');
                assistant.finishResponse(type, data);
            })
        } else {
            let data = JSON.stringify(messages);
            let type = mime.lookup('json');
            assistant.finishResponse(type, data);
        }
        } else {
            let fileName = path.slice(1);
            assistant.sendFile(fileName);
        }
    } catch (error) {
        assistant.sendError(404, "Error: " + error.toString);
    }
}
