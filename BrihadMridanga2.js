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
    
    })();