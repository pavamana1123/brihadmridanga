// ==UserScript==
// @name         Brihad Mridanga 2.0
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://web.whatsapp.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whatsapp.com
// @grant        none
// ==/UserScript==

const listenToEvents = ()=>{

    // Import Event
    const importButton = document.getElementById("import-button")

    importButton.addEventListener("click", async () => {
        console.log('clicked')
        try {
            const clipboardText = await navigator.clipboard.readText()
            console.log(clipboardText.split('\n'))  
        } catch (error) {
            console.error("Failed to read from clipboard:", error)
        }
    })
}
//parse query parameter
    const url = new URL('https://web.whatsapp.com/send?phone=918867473896&name=Mahesh%20N%20Seervi&text=Hare%20Krishna%20Mahesh.%0A%0AInviting%20you%20for%20%2AFOLK%204%2A%20session%20this%20Sunday.%0A%0A%2ATopic%2A%3A%20_Signficance%20of%20Dasara_%0A%F0%9F%97%93%EF%B8%8F%20%2ASunday%2C%2022%20October%2C%202023%2A%20%F0%9F%95%94%20%2A4.30%20PM%20-%207.30%20PM%2A%0A%0APlease%20report%20by%204.15%20PM.');
    const searchParams = url.searchParams;

    const param1Value = searchParams.get('name');
    const param2Value = searchParams.get('phone');
    const param3Value = searchParams.get('text');

    console.log(`param1: ${param1Value}`);
    console.log(`param2: ${param2Value}`);
    console.log(`param3: ${param3Value}`);

    let links=clipboardText.split('\n')
    links.map ()=> {
     
const urlParams = new URLSearchParams(window.location.search);

// Access individual parameters
let name = urlParams.get('name'); // Retrieves the value of 'name' parameter, which is "John"
let age = urlParams.get('age');   // Retrieves the value of 'age' parameter, which is "30"
let msg = urlParams.get('text'); 
    
    }

(function () {
    'use strict';
    let scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; i++) {
        scripts[i].remove()
    }


    setTimeout(() => {
        document.head.innerHTML = `
        <style>

        :root {
            --bar: #1976d2;
            --bg: #e7ebf0;
        }

        body {
            margin: 0;
            background: var(--bg);
        }

        #body{
            display: flex;
            flex-direction: row;
        }


        #contacts{
            width: 49vw;

            background-color: var(--bg);
            box-shadow: 1vw;
            box-sizing: border-box;
        }


        #content-cont{
            display: flex;
            flex-direction: column;
            width: 49vw;
        }

        .person{
            padding: 1vw;
            border-radius: 0.5vw;
            background-color: white;
            margin: 1vw;
            cursor: pointer;
            box-shadow: #00000054 1px 3px 3px 0px;
        }

        .person:hover {
            background: #eee;
        }

        #header{
            background-color: var(--bar);
            padding: 10px;
            color: white;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        #import-button {
            border: 1px white solid;
            padding: 1vw;
            border-radius: .5vw;
            cursor: pointer;
            user-select: none;
        }

        #import-button:hover {
            background-color: white;
            color: var(--bar);
        }

        #screen {
            width: 49vw;
            display: flex;
            flex-direction: column;
            background-color: white;
            margin: 1vw;
        }

        #wa-header{
            background-color: #f1f2f6;
            padding: 1vw;
            border-radius: 0.5vw;
            font-weight: bold;
        }

        #wa-body{
            display: flex;
            background-color:#f0ebe5 ;
            justify-content:right;

            max-height: 75vh;
            overflow-y: scroll;
        }

        .wa-msg{
            background-color: #d8fdd2;
            width: 80%;
            margin: 2vw;
            padding:1.5vw;
            border-radius: 1vw;
            height: fit-content;
        }
        </style>
        `.trim()
    }, 1000)


    document.body.outerHTML = `
    <body>

    <div>
      <div id="header">
        <div id="title">Brihad Mridanga 2.0</div>
        <div id="import-button">Import from Clipboard</div>
      </div>
    </div>

    <div id="body">
      <div id="contacts">
        <div id="contact-cont">

          <div class="person">
            <div class="name"></div>
            <div class="num"></div>
          </div>
        </div>
      </div>

      <div id="screen">
        <div id="wa-header">
          welcome to whatsapp
        </div>

        <div id="wa-body">
          <div class="wa-msg"></div>
        </div>
      </div>

    </div>

  </body>
    `.trim()

  listenToEvents()

})();