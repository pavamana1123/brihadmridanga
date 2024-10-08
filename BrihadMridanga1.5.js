// ==UserScript==
// @name         Brihat Mridanga 1.5
// @namespace    https://web.whatsapp.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://web.whatsapp.com/
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

const PROFILE_HEADER_CLASS = "x1pl83jw"
const SEND_BUTTON = "x1iy03kw"
const INVALID_NUM = "x12lqup9"
const MSG_BLOCK = "x1yrsyyn"

function sleep(n) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}

async function waitForClass(c){
    while(true){
        var e = document.getElementsByClassName(c)
        if(e.length==0){
            await sleep(2500)
            continue
        }
        return
    }
}

async function waitToOpen(w,c){
    while(true){
        var e = w.window.document.getElementsByClassName(c)
        if(e.length==0){
            await sleep(2500)
            continue
        }
        return
    }
}

async function waitForSendOrFail(w,c){
    var retry1 = 0
    var retry2 = 0
    var sl = 500
    while(true){
        var e = w.window.document.getElementsByClassName(c)
        // console.log(`Found ${e.length} buttons with classname ${c}`)
        if(e.length==0){
            var e2 = w.window.document.getElementsByClassName(INVALID_NUM)
            if(e2.length==0){
                await sleep(1000)
                retry1++
                if(retry1==30){
                    return 'Timed-Out'
                }
                continue
            }else if(e2[0].textContent=="Phone number shared via url is invalid."){
                return 'Invalid Number'
            }else{
                if(retry2==60){
                    return 'Unknown issue encountered!'
                }
                retry2++
                await sleep(sl)
                sl+=500
                continue
            }
        }else{
            return 'OK'
        }
    }
}

function isURL(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function parseLinks(rawText){
    console.log("parsing raw text")
    const links = rawText.split("\n")
    console.log(`${links.length} lines of raw text found`)
    var allLinks = links.filter((l)=>{return isURL(l)}).map((l)=>{

        var obj = {}
        obj.url = new URL(l);
        obj.phone = obj.url.searchParams.get('phone');
        obj.name = decodeURI(obj.url.searchParams.get('name'))
        obj.text = decodeURI(obj.url.searchParams.get('text'))
        obj.link=l

        return obj
    })
    console.log(`${allLinks.length} links created`)
    return allLinks
}

function createLinksInput(){
    var linksInput = document.createElement('textarea')
    linksInput.id="raw"
    var body = document.body
    body.appendChild(linksInput)

    linksInput.addEventListener("input",(e)=>{
        console.log("Changes found in input")
        var links = parseLinks(e.target.value)
        console.log(`${links.length} links found`)

        var tb = document.getElementById("list")
        console.log(`getting list element ${tb}`)
        if(tb){
            tb.outerHTML = ""
        }
        tb = document.createElement('table')
        tb.id="list"

        window.document.title=`${links.length} links found`

        console.log(`${links.length} links found`)

        links.map((link, i)=>{

            var r = document.createElement("tr")

            var checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.name = 'skipbox'
            checkbox.checked = false
            checkbox.id = `skipbox-${link.phone}-${i}`
            var skiptd = document.createElement("td")
            skiptd.style="padding-left:8px"
            skiptd.appendChild(checkbox)
            r.appendChild(skiptd)

            var nc = document.createElement("td")
            nc.textContent = link.name
            nc.title= link.text
            nc.style="padding:8px"
            r.appendChild(nc)

            var pc = document.createElement("td")
            pc.textContent = link.phone
            pc.style="padding:8px"
            r.appendChild(pc)

            var sc = document.createElement("td")
            sc.textContent = "Pending"
            sc.style="padding:8px"
            sc.id=`${link.phone}-${i}`
            r.appendChild(sc)

            var timec = document.createElement("td")
            timec.textContent = ""
            timec.style="padding:8px"
            timec.id=`time-${link.phone}-${i}`
            r.appendChild(timec)

            var ob = document.createElement("button")
            ob.textContent = "👁"
            ob.addEventListener("click",()=>{
                window.open(link.link)
            })
            r.appendChild(ob)

            tb.appendChild(r)
        })
        body.appendChild(tb)
    })

    console.log("Added input event listener for textarea")

    return linksInput
}

function createSendButton(){
    var sendButton = document.createElement('button')
    sendButton.addEventListener("click",send)
    sendButton.innerHTML="Send All"
    sendButton.id="sendAll"
    sendButton.style="color:black;background:white;padding:8px"
    document.body.appendChild(sendButton)
    return sendButton
}

async function send(e){

    e.target.remove()

    var ws = []
    var tabs = 5
    for(var k=0; k<tabs; k++){
        ws.push(window.open(""))
    }

    var data = parseLinks(document.getElementById("raw").value)
    var w
    var elapsedSeconds = 0
    var pendingTimer = 0
    for(var i=0; i<data.length;i++){
        window.document.title=`${i+1}/${data.length}`
        if(elapsedSeconds>=10000000000000){
            w.close()
            await sleep(500)
            w = window.open("")
            await sleep(500)
            w.blur()
            window.focus()
        }

        var current = document.getElementById(`${data[i].phone}-${i}`)
        var time = document.getElementById(`time-${data[i].phone}-${i}`)

        if(document.getElementById(`skipbox-${data[i].phone}-${i}`).checked){
            current.textContent="Skipped"
            continue
        }

        w = ws[i%tabs]
        w.window.open(data[i].link,"_self")
        await sleep(100)

        current.textContent="Sending..."
        // current.scrollIntoView()
        var t1 = new Date().getTime()
       //await waitToOpen(w, PROFILE_HEADER_CLASS)
       // console.log("starting to wait", new Date())
        var msg = await waitForSendOrFail(w, SEND_BUTTON)
        console.log("wait is over", new Date())
        console.log("msg:",msg)
        switch(msg){
            case 'OK':
                //console.log("waiting to send", new Date())

                var msgC = w.window.document.getElementsByClassName(MSG_BLOCK).length

                await sleep(150)
                w.window.document.getElementsByClassName(SEND_BUTTON)[0].click()
                var t3 = new Date().getTime()
                var tw = 36000-(t3-t1)
                await sleep(tw>0?tw:10)

                while(w.window.document.getElementsByClassName(MSG_BLOCK).length<=msgC){
                    pendingTimer++
                    if(pendingTimer>150){
                        current.textContent="Pending Timed-out"
                        pendingTimer=0
                        break
                    }
                    await sleep(300)
                }
                pendingTimer = 0

                await sleep(150)
                //console.log("sent", new Date(), w.window.document.querySelectorAll('span[aria-label=" Pending "]'))
                while(w.window.document.querySelectorAll('span[aria-label=" Pending "]').length){
                    //console.log("pending")
                    pendingTimer++
                    if(pendingTimer>150){
                        current.textContent="Pending Timed-out"
                        pendingTimer=0
                        break
                    }
                    await sleep(300)
                }
                await sleep(500)
                current.textContent="Sent"
                //console.log("here",w.window.document.querySelectorAll('span[aria-label=" Pending "]'), w.window.document.querySelectorAll('span[aria-label=" Pending "]').length)
                break
            default:
                current.textContent = msg
        }
        var t2 = new Date().getTime()
        elapsedSeconds = Math.floor((t2-t1)/1000)
        time.textContent = `${elapsedSeconds}s`
    }
    window.document.title=`Sent all!`
}

(async function() {
    'use strict';

    let scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; i++) {
                scripts[i].remove()
    }


    setTimeout(()=>{
        document.head.innerHTML=`
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap');
            body {
                margin: 0;
                background: black;
                color: white;
                font-family: 'Roboto Mono', monospace;
                font-weight: 500;
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
    </body>
    `.trim()

    createLinksInput()
    createSendButton()
})();
