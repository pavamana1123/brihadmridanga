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


let links = []

const isValidURL = (str) => {
    try {
        new URL(str)
        return true
    } catch {
        return false
    }
}

const listenToEvents = () => {

    // Import Event
    const importButton = document.getElementById("import-button")
    importButton.addEventListener("click", async () => {
        try {
            const clipboardText = await navigator.clipboard.readText()

            links = clipboardText.split('\n').filter(link => {
                return isValidURL(link)
            }).map(link => {
                let params = new URL(link).searchParams
                return {
                    n: decodeURIComponent(params.get('name')),
                    p: params.get('phone'),
                    m: decodeURIComponent(params.get('text')),
                }
            })
            localStorage.setItem('links', JSON.stringify(links))
            renderSavedData()
        } catch (error) {
            console.error("Failed to read from clipboard:", error)
        }
    })

}

const markdown = (text) => {
    var textArr = text.split("")
    var bc = 0
    var ic = 0
    for (let i = 0; i < textArr.length; i++) {
        if (textArr[i] == "*") {
            textArr[i] = bc % 2 == 0 ? "<b>" : "</b>"
            bc++
        } else if (textArr[i] == "_") {
            textArr[i] = ic % 2 == 0 ? "<i>" : "</i>"
            ic++
        }
    }
    return textArr.join("")
}

const showMessage = (i) => {
    let link = links[i]
    document.getElementById('wa-name').innerHTML = link.n
    document.getElementById('wa-msg').innerHTML = markdown(link.m)
}

const renderSavedData = () => {
    try {
        links = JSON.parse(localStorage.getItem('links'))
    } catch {
        console.log("Invalid data in local storage")
    }

    let contactContainer = document.getElementById("contact-cont")
    contactContainer.innerHTML = links.map((link, i) => {
        return `
<div class="person" onclick="showMessage(${i})">
    <div class="name">${link.n}</div>
    <div class="num">${link.p}</div>
</div>        
        `.trim()
    }).join('\n')

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
            user-select: none;
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
            margin: 1vw;
        }

        #wa-name{
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

        #wa-msg{
            background-color: #d8fdd2;
            width: 80%;
            margin: 2vw;
            padding:1.5vw;
            border-radius: 1vw;
            height: fit-content;
            white-space: break-spaces;
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
        </div>
      </div>

      <div id="screen">
        <div id="wa-name"></div>

        <div id="wa-body">
          <div id="wa-msg"></div>
        </div>
      </div>

    </div>

  </body>
    `.trim()

    listenToEvents()

    renderSavedData()

})();