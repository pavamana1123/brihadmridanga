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

(function() {
    'use strict';
    let scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; i++) {
                scripts[i].remove()
    }


    setTimeout(()=>{
        document.head.innerHTML=`
        <style>
            
            body {
                margin: 0;
            } 

            #bmheader  {
                width: 100vw;
                background: #1976d2;

            }
        </style>
        `.trim()
    }, 1000)


    document.body.outerHTML=`
    <body>
        <div id="bmheader">
            Brihad Mridanga
        </div>
    </body>
    `.trim()

})();