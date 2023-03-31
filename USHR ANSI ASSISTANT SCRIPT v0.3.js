// ==UserScript==
// @name         USHR ANSI ASSISTANT SCRIPT
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://mmp.ushrauto.com/
// @match        https://mmp.ushrauto.com/#/login
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ushrauto.com
// @grant        GM_addStyle
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @require https://code.jquery.com/ui/1.10.4/jquery-ui.js
// @run-at document-end
// ==/UserScript==
(function() {
    'use strict';

    // Your code here...
    var $ = window.jQuery;
    var speed = null;

    var uname = document.getElementById("__BVID__9");
    var pwd = document.getElementById("__BVID__10");
   // add username for MMP
    uname.value = "hhuang@ushrauto.com";
    uname.dispatchEvent(new Event('input'));
    // add password for MMP
    pwd.value = "cupcake2022@MSU";
    pwd.dispatchEvent(new Event('input'));
    const obj2 = document.getElementById("loginBtn");
    obj2.click();


    function hasClass(element, className) {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    function hasElement(eid) {
        var element = document.getElementById(eid);
        if (typeof(element) != 'undefined' && element != null) {
            return true;
        }
        return false;
    }

    function showLidar() {
        var b0 = $("#lidarGroupsNew > div > div.col-10 > button")[0];
        b0.click();
    }

    var task = prompt("Enter Task Name:", "NISSAN");
    task = task.toUpperCase();
    if (task === "GM") {
        setTimeout(function() {


            // zoom widget
            var expzdiv = $("#expandableZoom")[0];
            expzdiv.style.display = "none";

            // lat lon widget
            var xyinput = $(".coordinates-input-field")[0];
            var gobtn = $(".go-btn")[0];


            var zNode = document.createElement('div');
            zNode.innerHTML = `<div class="btn-group"  role="group" aria-label="Basic example">
        &nbsp;&nbsp;<button id="prjBtn" class="btn btn-sm btn-success" type="button">PROJECT</button>
        &nbsp;&nbsp;<button id="tabBtn" class="btn btn-sm btn-warning" type="button">TAB</button>
        &nbsp;&nbsp;<button id="svBtn" class="btn btn-sm btn-warning" type="button">SV</button>
        &nbsp;&nbsp;<button id="bingBtn" class="btn btn-sm btn-warning" type="button">Bing</button>
        &nbsp;&nbsp;<button id="nextBtn" class="btn btn-sm btn-warning" type="button">NEXT</button>
        &nbsp;&nbsp;<button id="lnBtn" class="btn btn-sm btn-warning" type="button">1 Lane</button>
        &nbsp;&nbsp;<button id="mkBtn" class="btn btn-sm btn-warning" type="button">2 Marker</button>
        &nbsp;&nbsp;<button id="xingBtn" class="btn btn-sm btn-warning" type="button">3 Xing</button>
        &nbsp;&nbsp;<button id="spdBtn" class="btn btn-sm btn-warning" type="button">4SPEED</button>
        &nbsp;&nbsp;<button id="aboutBtn" class="btn btn-sm btn-primary rounded-pill" type="button">-99</button>
        &nbsp;&nbsp;<button id="ansiBtn" class="btn btn-sm btn-warning" type="button">5ANSI</button>
        &nbsp;&nbsp;<button id="noteBtn" class="btn btn-sm btn-warning" type="button">6Notes</button>
        &nbsp;&nbsp;<button id="xyBtn" class="btn btn-sm btn-warning" type="button">X Y</button>
        </div>`;
            zNode.setAttribute('id', 'myContainer');
            document.body.appendChild(zNode);
            $("#myContainer").draggable();
            $("#prjBtn").html(task);  

            //--- Activate the newly added button.
            document.getElementById("prjBtn").addEventListener(
                "click", about, false
            );
            //--- Activate the newly added button.
            document.getElementById("nextBtn").addEventListener(
                "click", goNext, false
            );
            //--- Activate the newly added button.
            document.getElementById("xyBtn").addEventListener(
                "click", getLatLon, false
            );
            //--- Activate the newly added button.
            document.getElementById("tabBtn").addEventListener(
                "click", openTable, false
            );
            //--- Activate the newly added button.
            document.getElementById("bingBtn").addEventListener(
                "click", getBing, false
            );

            document.getElementById("svBtn").addEventListener(
                "click", gsv, false
            );

            document.getElementById("lnBtn").addEventListener(
                "click", chk_lane1, false
            );
            document.getElementById("mkBtn").addEventListener(
                "click", chk_marker2, false
            );

            document.getElementById("xingBtn").addEventListener(
                "click", chk_xing3, false
            );
            document.getElementById("spdBtn").addEventListener(
                "click", chk_spd4, false
            );
            document.getElementById("ansiBtn").addEventListener(
                "click", ansi, false
            );
            document.getElementById("noteBtn").addEventListener(
                "click", notes, false
            );
            document.getElementById("prjBtn").addEventListener(
                "click", changeColors, false
            );

            async function about(input) {
                const text = `This is a small tool developed by Huiqing Huang
            to promote the efficiency on the mmp platform!
            Please contact Huiqing for any details!`;
                alert(text);
            }
            async function openTable(input){
                var btn = $("#ANSITools > div > div > div > div > div:nth-child(2) > button")[0];
                btn.click();
            }
            async function goNext(input) {
                const text = await navigator.clipboard.readText();

                //#expandableCoordinates > div > div.coordinates-input-field.active > div > div.col > input
                const xytext = $("#expandableCoordinates > div > div.coordinates-input-field > div > div.col > input")[0];


                xytext.value = text;
                xytext.dispatchEvent(new Event('input'));
                //xyinput.classList.add("active");
                gobtn.click();
                gobtn.click();
                getBing();

	             let laneBtn       = $("#Lane > div.col-sm-8.col > button")[0];
	             let edgeBtn       = $("#Edges > div.col-sm-8.col > button")[0];
	             let barrierBtn    = $("#Barriers > div.col-sm-8.col > button")[0];
	             let markerBtn     = $("#Marker > div.col-sm-8.col > button")[0];
	             let signBtn       = $("#Signs > div.col-sm-8.col > button")[0];
	             let xingBtn       = $("#Crossings > div.col-sm-8.col > button")[0];
	             let spdSignBtn    = $("#Speed\\ Signs")[1];
               let ansiBtn         = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [laneBtn,edgeBtn,barrierBtn,markerBtn,signBtn,xingBtn,spdSignBtn,ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }
                ansiBtn.click();

            }



            async function getLatLon(input) {
                const obj = $("#coordinatesDisplay>p")[0];
                console.log(obj);
                var text = obj.innerHTML;
                await navigator.clipboard.writeText(text.replace('<br data-v-5504b43d=\"\">', ''));
            }

            async function getLonLat(input) {
                var obj = $("#coordinatesDisplay>p")[0];
                console.log(obj);
                var text = obj.innerHTML;
                const myArray = text.replace('<br data-v-5504b43d=\"\">', '').split(",");
                var newText = myArray[1] + "," + myArray[0];
                await navigator.clipboard.writeText(newText);
                console.log("after conversion");
                console.log(obj);

            }

            async function getBing(input) {
                var obj2 = $("#baseMapContainer > div:nth-child(1) > img")[0];
                obj2.click();
                console.log(obj2);
                var obj = $("#baseMapSelection > img")[0];
                obj.click();

            }


            async function gsv(input) {
                var btn = $("#ANSITools > div > div > div > div > div:nth-child(1) > button")[0];
                btn.click();
                var map = $("#map");
                map.click();
            }


            async function chk_lane1() {
	             let laneBtn       = $("#Lane > div.col-sm-8.col > button")[0];
	             let edgeBtn       = $("#Edges > div.col-sm-8.col > button")[0];
	             let barrierBtn    = $("#Barriers > div.col-sm-8.col > button")[0];
	             let markerBtn     = $("#Marker > div.col-sm-8.col > button")[0];
	             let signBtn       = $("#Signs > div.col-sm-8.col > button")[0];
	             let xingBtn       = $("#Crossings > div.col-sm-8.col > button")[0];
	             let spdSignBtn    = $("#Speed\\ Signs")[1];
               let ansiBtn         = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [laneBtn,edgeBtn,barrierBtn,markerBtn,signBtn,xingBtn,spdSignBtn,ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }

                let laneLyr = $("#Lane > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneLyr.dispatchEvent(new Event('click'));
                laneBtn.click();
                ansiBtn.click();
                setTimeout(showLidar, 2000);

            }



            async function chk_marker2() {
                try{
                speed = $("#editor8")[0];
                //console.log(speed);
                $("#aboutBtn").html(" " + speed.innerHTML + " ");
                //.text().replace(/\n/g,' ').replaceAll(" ","");
                }
                catch (exceptionVar) {
                    //
                }


	             let laneBtn       = $("#Lane > div.col-sm-8.col > button")[0];
	             let edgeBtn       = $("#Edges > div.col-sm-8.col > button")[0];
	             let barrierBtn    = $("#Barriers > div.col-sm-8.col > button")[0];
	             let markerBtn     = $("#Marker > div.col-sm-8.col > button")[0];
	             let signBtn       = $("#Signs > div.col-sm-8.col > button")[0];
	             let xingBtn       = $("#Crossings > div.col-sm-8.col > button")[0];
	             let spdSignBtn    = $("#Speed\\ Signs")[1];
                 let ansiBtn         = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [laneBtn,edgeBtn,barrierBtn,markerBtn,signBtn,xingBtn,spdSignBtn,ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }



			var edgeLyr = $("#Edges > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
			edgeLyr.dispatchEvent(new Event('click'));
			var barrierLyr = $("#Barriers > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
			barrierLyr.dispatchEvent(new Event('click'));
			var markerLyr = $("#Marker > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
			markerLyr.dispatchEvent(new Event('click'));
			barrierBtn.click()
			markerBtn.click()
			edgeBtn.click()


            }


            async function chk_xing3(input) {


	             let laneBtn       = $("#Lane > div.col-sm-8.col > button")[0];
	             let edgeBtn       = $("#Edges > div.col-sm-8.col > button")[0];
	             let barrierBtn    = $("#Barriers > div.col-sm-8.col > button")[0];
	             let markerBtn     = $("#Marker > div.col-sm-8.col > button")[0];
	             let signBtn       = $("#Signs > div.col-sm-8.col > button")[0];
	             let xingBtn       = $("#Crossings > div.col-sm-8.col > button")[0];
	             let spdSignBtn    = $("#Speed\\ Signs")[1];
                 let ansiBtn         = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [laneBtn,edgeBtn,barrierBtn,markerBtn,signBtn,xingBtn,spdSignBtn,ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }


                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }


             var xingLyr = $("#Crossings > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
             xingLyr.dispatchEvent(new Event('click'));
             var signLyr = $("#Signs > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
             signLyr.dispatchEvent(new Event('click'));
             xingBtn.click();
             signBtn.click();
             ansiBtn.click();

            }
            async function chk_spd4(input) {
                // alert(speed.innerHTML);

	             let laneBtn       = $("#Lane > div.col-sm-8.col > button")[0];
	             let edgeBtn       = $("#Edges > div.col-sm-8.col > button")[0];
	             let barrierBtn    = $("#Barriers > div.col-sm-8.col > button")[0];
	             let markerBtn     = $("#Marker > div.col-sm-8.col > button")[0];
	             let signBtn       = $("#Signs > div.col-sm-8.col > button")[0];
	             let xingBtn       = $("#Crossings > div.col-sm-8.col > button")[0];
	             let spdSignBtn    = $("#Speed\\ Signs")[1];
                 let ansiBtn         = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [laneBtn,edgeBtn,barrierBtn,markerBtn,signBtn,xingBtn,spdSignBtn,ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }


                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (hasElement("lidarTiles")) {
                    lidar.click();
                }

                getBing();

                let spdSignLyr = $("#Speed\\ Signs > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                spdSignLyr.dispatchEvent(new Event('click'));
                spdSignBtn.click();
                ansiBtn.click();

            }
            async function ansi(input) {
                gobtn.click();
                gobtn.click();

 	             let laneBtn       = $("#Lane > div.col-sm-8.col > button")[0];
	             let edgeBtn       = $("#Edges > div.col-sm-8.col > button")[0];
	             let barrierBtn    = $("#Barriers > div.col-sm-8.col > button")[0];
	             let markerBtn     = $("#Marker > div.col-sm-8.col > button")[0];
	             let signBtn       = $("#Signs > div.col-sm-8.col > button")[0];
	             let xingBtn       = $("#Crossings > div.col-sm-8.col > button")[0];
	             let spdSignBtn    = $("#Speed\\ Signs")[1];
                 let ansiBtn         = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [laneBtn,edgeBtn,barrierBtn,markerBtn,signBtn,xingBtn,spdSignBtn,ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }
                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (hasElement("lidarTiles")) {
                    lidar.click();
                }

                var ansiLyr = $("#ANSI > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                ansiLyr.dispatchEvent(new Event('click'));
                ansiBtn.click();


            }
            async function notes(input) {
 	             let laneBtn       = $("#Lane > div.col-sm-8.col > button")[0];
	             let edgeBtn       = $("#Edges > div.col-sm-8.col > button")[0];
	             let barrierBtn    = $("#Barriers > div.col-sm-8.col > button")[0];
	             let markerBtn     = $("#Marker > div.col-sm-8.col > button")[0];
	             let signBtn       = $("#Signs > div.col-sm-8.col > button")[0];
	             let xingBtn       = $("#Crossings > div.col-sm-8.col > button")[0];
	             let spdSignBtn    = $("#Speed\\ Signs")[1];
                 let ansiBtn         = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [laneBtn,edgeBtn,barrierBtn,markerBtn,signBtn,xingBtn,spdSignBtn,ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }
                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (hasElement("lidarTiles")) {
                    lidar.click();
                }

                var ansiLyr = $("#ANSI > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                ansiLyr.dispatchEvent(new Event('click'));
                ansiBtn.click();

                var obj2 = $("#togglePass")[0];
                obj2.click();
                var notetext = $("#notes")[0];
                const text = await navigator.clipboard.readText();
                notetext.value = text;
                notetext.dispatchEvent(new Event('input'));

            }

            //--- Style our newly added elements using CSS.

            GM_addStyle(' #myContainer {position:absolute !important;top: 10px;left: 400px;font-size:   20px;background:  #f0f0f0;border: 1px outset black;margin: 5px;opacity:100; z-index:1100;padding:5px 20px; } .btn-cmd {cursor: pointer;border-radius:10px;background-color:#99d8c9;width:80px; } #myContainer p {color:  red;background: blue; }');




            alert("function called");




        }, 5000)

    } else if (task === "NISSAN") {
        setTimeout(function() {


            // zoom widget
            var expzdiv = $("#expandableZoom")[0];
            expzdiv.style.display = "none";

            // lat lon widget
            var xyinput = $(".coordinates-input-field")[0];
            var gobtn = $(".go-btn")[0];


            var menu = $("#mainMenu")[0];
            menu.style.width = "280px";
            menu.style.background = "#fff";
            menu.style.fontSize = "20px";

            var tabview = $("#tabnav")[0];
            tabview.style.height = "680px";
            tabview.style.color = "#fff";
            tabview.style.opacity = "70";

            var prjs = $(".project");

            for (const child of prjs) {
                child.style.fontSize = "14px";
                child.style.color = "rgba(6, 47, 86, 0.65)";
                //console.log(child);
            }

            $(".menu-bg-blue-transparent")[0].style.background = "#d8b365";

            var zNode = document.createElement('div');
            zNode.innerHTML = `<div class="btn-group"  role="group" aria-label="Basic example">
        <button id="prjBtn" class="btn btn-sm btn-success" type="button">PROJECT</button>  
        &nbsp;&nbsp;<button id="tabBtn" class="btn btn-sm btn-warning" type="button">TAB</button>
        &nbsp;&nbsp;<button id="svBtn" class="btn btn-sm btn-warning" type="button">SV</button>
        &nbsp;&nbsp;<button id="bingBtn" class="btn btn-sm btn-warning" type="button">Bing</button>
        &nbsp;&nbsp;<button id="nextBtn" class="btn btn-sm btn-warning" type="button">NEXT</button>
        &nbsp;&nbsp;<button id="segBtn" class="btn btn-sm btn-warning" type="button">1 SEG</button>
        &nbsp;&nbsp;<button id="lnBtn" class="btn btn-sm btn-warning" type="button">2 LANE</button>
        &nbsp;&nbsp;<button id="lnPtBtn" class="btn btn-sm btn-warning" type="button">3 LN PT</button>
        &nbsp;&nbsp;<button id="edBtn" class="btn btn-sm btn-warning" type="button">4 EDGE</button>
        &nbsp;&nbsp;<button id="xingBtn" class="btn btn-sm btn-warning" type="button">5 XING</button>
        &nbsp;&nbsp;<button id="spdBtn" class="btn btn-sm btn-warning" type="button">6SPEED</button>
        &nbsp;&nbsp;<button id="aboutBtn" class="btn btn-sm btn-primary rounded-pill" type="button">-99</button>
        &nbsp;&nbsp;<button id="ansiBtn" class="btn btn-sm btn-warning" type="button">7ANSI</button>
        &nbsp;&nbsp;<button id="noteBtn" class="btn btn-sm btn-warning" type="button">8Notes</button>
        &nbsp;&nbsp;<button id="xyBtn" class="btn btn-sm btn-warning" type="button">X Y</button>
        </div>`;
            zNode.setAttribute('id', 'myContainer');
            document.body.appendChild(zNode);
            $("#myContainer").draggable();
            $("#prjBtn").html(task);


            //--- Activate the newly added button.
            document.getElementById("prjBtn").addEventListener(
                "click", about, false
            );
            //--- Activate the newly added button.
            document.getElementById("nextBtn").addEventListener(
                "click", goNext, false
            );
            //--- Activate the newly added button.
            document.getElementById("xyBtn").addEventListener(
                "click", getLatLon, false
            );
            //--- Activate the newly added button.
            document.getElementById("tabBtn").addEventListener(
                "click", openTable, false
            );
            //--- Activate the newly added button.
            document.getElementById("bingBtn").addEventListener(
                "click", getBing, false
            );

            document.getElementById("svBtn").addEventListener(
                "click", gsv, false
            );
            document.getElementById("segBtn").addEventListener(
                "click", chk_seg1, false
            );
            document.getElementById("lnBtn").addEventListener(
                "click", chk_lane2, false
            );
            document.getElementById("lnPtBtn").addEventListener(
                "click", chk_lnpt3, false
            );
            document.getElementById("edBtn").addEventListener(
                "click", chk_ed4, false
            );
            document.getElementById("xingBtn").addEventListener(
                "click", chk_xing5, false
            );
            document.getElementById("spdBtn").addEventListener(
                "click", chk_spd6, false
            );
            document.getElementById("ansiBtn").addEventListener(
                "click", ansi, false
            );
            document.getElementById("noteBtn").addEventListener(
                "click", notes, false
            );
            document.getElementById("prjBtn").addEventListener(
                "click", changeColors, false
            );

            async function about(input) {
                const text = `This is a small tool developed by Huiqing Huang
            to promote the efficiency on the mmp platform!
            Please contact Huiqing for any details!`;
                alert(text);
            }
          
            async function openTable(input){
                var btn = $("#ANSITools > div > div > div > div > div:nth-child(2) > button")[0];
                btn.click();
            }
            async function goNext(input) {
                const text = await navigator.clipboard.readText();

                //#expandableCoordinates > div > div.coordinates-input-field.active > div > div.col > input
                const xytext = $("#expandableCoordinates > div > div.coordinates-input-field > div > div.col > input")[0];


                xytext.value = text;
                xytext.dispatchEvent(new Event('input'));
                //xyinput.classList.add("active");
                gobtn.click();
                gobtn.click();


                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#lane_lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#lane_line_points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#lane_attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#lane_line_attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#lane_center_points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#edge_attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#road_edge_points > div.col-sm-8.col > button")[0];
                let rtdBtn = $("#regulatory_traffic_device > div.col-sm-8.col > button")[0];
                let signBtn = $("#signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#signs_conn > div.col-sm-8.col > button")[0];
                let pmBtn = $("#pavement_markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#pavement_markings_conn > div.col-sm-8.col > button")[0];
                let faBtn = $("#functional_authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];



                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, rtdBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }
                ansiBtn.click();

            }

            async function changeColors(input) {
                const oldColorNormalized = '#063c6d';
                const newColor = '#ff0000';
                document.querySelectorAll('*').forEach(el => {
                    if (getComputedStyle(el).color === oldColorNormalized) {
                        el.style.color = newColor
                    }
                });
                alert("color changed");
            }


            async function getLatLon(input) {
                const obj = $("#coordinatesDisplay>p")[0];
                console.log(obj);
                var text = obj.innerHTML;
                await navigator.clipboard.writeText(text.replace('<br data-v-5504b43d=\"\">', ''));
            }

            async function getLonLat(input) {
                var obj = $("#coordinatesDisplay>p")[0];
                console.log(obj);
                var text = obj.innerHTML;
                const myArray = text.replace('<br data-v-5504b43d=\"\">', '').split(",");
                var newText = myArray[1] + "," + myArray[0];
                await navigator.clipboard.writeText(newText);
                console.log("after conversion");
                console.log(obj);

            }

            async function getBing(input) {
                var obj2 = $("#baseMapContainer > div:nth-child(1) > img")[0];
                obj2.click();
                console.log(obj2);
                var obj = $("#baseMapSelection > img")[0];
                obj.click();

            }


            async function gsv(input) {
                var btn = $("#ANSITools > div > div > div > div > div:nth-child(1) > button")[0];
                btn.click();
                var map = $("#map");
                map.click();
            }



            async function chk_seg1(input) {


                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#lane_lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#lane_line_points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#lane_attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#lane_line_attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#lane_center_points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#edge_attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#road_edge_points > div.col-sm-8.col > button")[0];
                let rtdBtn = $("#regulatory_traffic_device > div.col-sm-8.col > button")[0];
                let signBtn = $("#signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#signs_conn > div.col-sm-8.col > button")[0];
                let pmBtn = $("#pavement_markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#pavement_markings_conn > div.col-sm-8.col > button")[0];
                let faBtn = $("#functional_authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, rtdBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }


                let segLyr = $("#road_segments > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                segLyr.dispatchEvent(new Event('click'));
                segBtn.click();
                ansiBtn.click();
            }



            async function chk_lane2(input) {

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#lane_lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#lane_line_points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#lane_attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#lane_line_attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#lane_center_points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#edge_attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#road_edge_points > div.col-sm-8.col > button")[0];
                let rtdBtn = $("#regulatory_traffic_device > div.col-sm-8.col > button")[0];
                let signBtn = $("#signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#signs_conn > div.col-sm-8.col > button")[0];
                let pmBtn = $("#pavement_markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#pavement_markings_conn > div.col-sm-8.col > button")[0];
                let faBtn = $("#functional_authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, rtdBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }


                let laneLyr = $("#lanes > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneLyr.dispatchEvent(new Event('click'));
                laneBtn.click();
                ansiBtn.click();
                setTimeout(showLidar, 2000);

            }



            async function chk_lnpt3(input) {
                try {
                speed = $("#editor9")[0];
                console.log(speed);
                $("#aboutBtn").html(" " + speed.innerHTML + " ");
                //.text().replace(/\n/g,' ').replaceAll(" ","");
                }
                catch (exceptionVar) {
                    //
                }

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#lane_lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#lane_line_points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#lane_attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#lane_line_attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#lane_center_points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#edge_attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#road_edge_points > div.col-sm-8.col > button")[0];
                let rtdBtn = $("#regulatory_traffic_device > div.col-sm-8.col > button")[0];
                let signBtn = $("#signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#signs_conn > div.col-sm-8.col > button")[0];
                let pmBtn = $("#pavement_markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#pavement_markings_conn > div.col-sm-8.col > button")[0];
                let faBtn = $("#functional_authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];



                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, rtdBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }


                let laneLineAttrLyr = $("#lane_line_attributes > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneLineAttrLyr.dispatchEvent(new Event('click'));
                if (!hasClass(laneLineAttrBtn, "available-enabled")) {
                    laneLineAttrBtn.click();
                }

                let laneLinePtLyr = $("#lane_line_points > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneLinePtLyr.dispatchEvent(new Event('click'));
                if (!hasClass(laneLinePtBtn, "available-enabled")) {
                    laneLinePtBtn.click();
                }

                let laneLineLyr = $("#lane_lines > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneLineLyr.dispatchEvent(new Event('click'));
                laneLineBtn.click();
                ansiBtn.click();

            }

            async function chk_ed4(input) {

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#lane_lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#lane_line_points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#lane_attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#lane_line_attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#lane_center_points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#edge_attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#road_edge_points > div.col-sm-8.col > button")[0];
                let rtdBtn = $("#regulatory_traffic_device > div.col-sm-8.col > button")[0];
                let signBtn = $("#signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#signs_conn > div.col-sm-8.col > button")[0];
                let pmBtn = $("#pavement_markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#pavement_markings_conn > div.col-sm-8.col > button")[0];
                let faBtn = $("#functional_authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, rtdBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }

                let edgeAttrLyr = $("#edge_attributes > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                edgeAttrLyr.dispatchEvent(new Event('click'));
                let edgePtLyr = $("#road_edge_points > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                edgePtLyr.dispatchEvent(new Event('click'));
                let edgeLyr = $("#edges > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                edgeLyr.dispatchEvent(new Event('click'));


                edgeAttrBtnBtn.click();
                edgePtBtn.click();
                edgeBtn.click();
                ansiBtn.click();
            }

            async function chk_xing5(input) {

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#lane_lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#lane_line_points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#lane_attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#lane_line_attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#lane_center_points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#edge_attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#road_edge_points > div.col-sm-8.col > button")[0];
                let rtdBtn = $("#regulatory_traffic_device > div.col-sm-8.col > button")[0];
                let signBtn = $("#signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#signs_conn > div.col-sm-8.col > button")[0];
                let pmBtn = $("#pavement_markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#pavement_markings_conn > div.col-sm-8.col > button")[0];
                let faBtn = $("#functional_authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];



                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, rtdBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }

                let pmConnLyr = $("#pavement_markings_conn > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                pmConnLyr.dispatchEvent(new Event('click'));
                let signConnLyr = $("#signs_conn > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                signConnLyr.dispatchEvent(new Event('click'));
                let pmLyr = $("#pavement_markings > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                pmLyr.dispatchEvent(new Event('click'));

                let laneAttrLyr = $("#lane_attributes > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneAttrLyr.dispatchEvent(new Event('click'));

                let rtdLyr = $("#regulatory_traffic_device > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                rtdLyr.dispatchEvent(new Event('click'));
                let signLyr = $("#signs > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                signLyr.dispatchEvent(new Event('click'));

                laneAttrBtn.click();
                pmBtn.click();
                pmConnBtn.click();
                rtdBtn.click();
                signBtn.click();
                signConnBtn.click();

            }
            async function chk_spd6(input) {
                // alert(speed.innerHTML);
                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#lane_lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#lane_line_points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#lane_attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#lane_line_attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#lane_center_points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#edge_attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#road_edge_points > div.col-sm-8.col > button")[0];
                let rtdBtn = $("#regulatory_traffic_device > div.col-sm-8.col > button")[0];
                let signBtn = $("#signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#signs_conn > div.col-sm-8.col > button")[0];
                let pmBtn = $("#pavement_markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#pavement_markings_conn > div.col-sm-8.col > button")[0];
                let faBtn = $("#functional_authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, rtdBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }



                //let laneLyr= $("#lanes > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                //laneLyr.dispatchEvent(new Event('click'));
                //laneBtn.click();

                let signLyr = $("#signs > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                signLyr.dispatchEvent(new Event('click'));
                signBtn.click();

            }
            async function ansi(input) {
                gobtn.click();
                gobtn.click();

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#lane_lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#lane_line_points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#lane_attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#lane_line_attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#lane_center_points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#edge_attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#road_edge_points > div.col-sm-8.col > button")[0];
                let rtdBtn = $("#regulatory_traffic_device > div.col-sm-8.col > button")[0];
                let signBtn = $("#signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#signs_conn > div.col-sm-8.col > button")[0];
                let pmBtn = $("#pavement_markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#pavement_markings_conn > div.col-sm-8.col > button")[0];
                let faBtn = $("#functional_authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];



                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, rtdBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }


                var ansiLyr = $("#ANSI > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                ansiLyr.dispatchEvent(new Event('click'));
                ansiBtn.click();


            }
            async function notes(input) {

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#lane_lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#lane_line_points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#lane_attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#lane_line_attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#lane_center_points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#edge_attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#road_edge_points > div.col-sm-8.col > button")[0];
                let rtdBtn = $("#regulatory_traffic_device > div.col-sm-8.col > button")[0];
                let signBtn = $("#signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#signs_conn > div.col-sm-8.col > button")[0];
                let pmBtn = $("#pavement_markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#pavement_markings_conn > div.col-sm-8.col > button")[0];
                let faBtn = $("#functional_authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, rtdBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }
                var ansiLyr = $("#ANSI > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                ansiLyr.dispatchEvent(new Event('click'));
                ansiBtn.click();

                var obj2 = $("#togglePass")[0];
                obj2.click();
                var notetext = $("#notes")[0];
                const text = await navigator.clipboard.readText();
                notetext.value = text;
                notetext.dispatchEvent(new Event('input'));

            }

            //--- Style our newly added elements using CSS.

            GM_addStyle(' #myContainer {position:absolute !important;top: 10px;left: 400px;font-size:   20px;background:  #f0f0f0;border: 1px outset black;margin: 5px;opacity:100; z-index:1100;padding:5px 20px; } .btn-cmd {cursor: pointer;border-radius:10px;background-color:#99d8c9;width:80px; } #myContainer p {color:  red;background: blue; }');




            alert("function called");




        }, 5000)

    } else if (task === "TOYOTA") {
        setTimeout(function() {


            // zoom widget
            var expzdiv = $("#expandableZoom")[0];
            expzdiv.style.display = "none";

            // lat lon widget
            var xyinput = $(".coordinates-input-field")[0];
            var gobtn = $(".go-btn")[0];


            var menu = $("#mainMenu")[0];
            menu.style.width = "280px";
            menu.style.background = "#fff";
            menu.style.fontSize = "20px";

            var tabview = $("#tabnav")[0];
            tabview.style.height = "680px";
            tabview.style.color = "#fff";
            tabview.style.opacity = "70";

            var prjs = $(".project");

            for (const child of prjs) {
                child.style.fontSize = "14px";
                child.style.color = "rgba(6, 47, 86, 0.65)";
                //console.log(child);
            }

            $(".menu-bg-blue-transparent")[0].style.background = "#d8b365";

            var zNode = document.createElement('div');
            zNode.innerHTML = `<div class="btn-group"  role="group" aria-label="Basic example">
        <button id="prjBtn" class="btn btn-sm btn-success" type="button">PROJECT</button>
        &nbsp;&nbsp;<button id="tabBtn" class="btn btn-sm btn-warning" type="button">TAB</button>
        &nbsp;&nbsp;<button id="svBtn" class="btn btn-sm btn-warning" type="button">SV</button>
        &nbsp;&nbsp;<button id="bingBtn" class="btn btn-sm btn-warning" type="button">Bing</button>
        &nbsp;&nbsp;<button id="nextBtn" class="btn btn-sm btn-warning" type="button">NEXT</button>
        &nbsp;&nbsp;<button id="segBtn" class="btn btn-sm btn-warning" type="button">1 SEG</button>
        &nbsp;&nbsp;<button id="lnBtn" class="btn btn-sm btn-warning" type="button">2 LANE</button>
        &nbsp;&nbsp;<button id="lnPtBtn" class="btn btn-sm btn-warning" type="button">3 LN PT</button>
        &nbsp;&nbsp;<button id="edBtn" class="btn btn-sm btn-warning" type="button">4 EDGE</button>
        &nbsp;&nbsp;<button id="xingBtn" class="btn btn-sm btn-warning" type="button">5 XING</button>
        &nbsp;&nbsp;<button id="spdBtn" class="btn btn-sm btn-warning" type="button">6SPEED</button>
        &nbsp;&nbsp;<button id="aboutBtn" class="btn btn-sm btn-primary rounded-pill" type="button">-99</button>
        &nbsp;&nbsp;<button id="ansiBtn" class="btn btn-sm btn-warning" type="button">7ANSI</button>
        &nbsp;&nbsp;<button id="noteBtn" class="btn btn-sm btn-warning" type="button">8Notes</button>
        &nbsp;&nbsp;<button id="xyBtn" class="btn btn-sm btn-warning" type="button">X Y</button>
        </div>`;
            zNode.setAttribute('id', 'myContainer');
            document.body.appendChild(zNode);
            $("#myContainer").draggable();
            $("#prjBtn").html(task);

            //--- Activate the newly added button.
            document.getElementById("prjBtn").addEventListener(
                "click", about, false
            );
            //--- Activate the newly added button.
            document.getElementById("nextBtn").addEventListener(
                "click", goNext, false
            );
            //--- Activate the newly added button.
            document.getElementById("xyBtn").addEventListener(
                "click", getLatLon, false
            );
            //--- Activate the newly added button.
            document.getElementById("tabBtn").addEventListener(
                "click", openTable, false
            );
            //--- Activate the newly added button.
            document.getElementById("bingBtn").addEventListener(
                "click", getBing, false
            );

            document.getElementById("svBtn").addEventListener(
                "click", gsv, false
            );
            document.getElementById("segBtn").addEventListener(
                "click", chk_seg1, false
            );
            document.getElementById("lnBtn").addEventListener(
                "click", chk_lane2, false
            );
            document.getElementById("lnPtBtn").addEventListener(
                "click", chk_lnpt3, false
            );
            document.getElementById("edBtn").addEventListener(
                "click", chk_ed4, false
            );
            document.getElementById("xingBtn").addEventListener(
                "click", chk_xing5, false
            );
            document.getElementById("spdBtn").addEventListener(
                "click", chk_spd6, false
            );
            document.getElementById("ansiBtn").addEventListener(
                "click", ansi, false
            );
            document.getElementById("noteBtn").addEventListener(
                "click", notes, false
            );
            document.getElementById("prjBtn").addEventListener(
                "click", changeColors, false
            );

            async function about(input) {
                const text = `This is a small tool developed by Huiqing Huang
            to promote the efficiency on the mmp platform!
            Please contact Huiqing for any details!`;
                alert(text);
            }
            async function openTable(input){
                var btn = $("#ANSITools > div > div > div > div > div:nth-child(2) > button")[0];
                btn.click();
            }
            async function goNext(input) {
                const text = await navigator.clipboard.readText();

                //#expandableCoordinates > div > div.coordinates-input-field.active > div > div.col > input
                const xytext = $("#expandableCoordinates > div > div.coordinates-input-field > div > div.col > input")[0];


                xytext.value = text;
                xytext.dispatchEvent(new Event('input'));
                //xyinput.classList.add("active");
                gobtn.click();
                gobtn.click();

                let segBtn = $("#Road\\ Segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#Lane\\ Lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#Lane\\ Line\\ Points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#Lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#Lane\\ Attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#Lane\\ Line\\ Attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#Lane\\ Center\\ Points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#Road\\ Edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#Road\\ Edge\\ Attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#Road\\ Edge\\ Points > div.col-sm-8.col > button")[0];
                let laneConnBtn = $("#Lane\\ Connections > div.col-sm-8.col > button")[0];
                let signBtn = $("#Signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#Sign\\ Lane\\ Mapping > div.col-sm-8.col > button")[0];
                let pmBtn = $("#Pavement\\ Markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#Pavement\\ Marking\\ Connections > div.col-sm-8.col > button")[0];
                let faBtn = $("#Functional\\ Authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, laneConnBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }

                ansiBtn.click();

            }

            async function changeColors(input) {
                const oldColorNormalized = '#063c6d';
                const newColor = '#ff0000';
                document.querySelectorAll('*').forEach(el => {
                    if (getComputedStyle(el).color === oldColorNormalized) {
                        el.style.color = newColor
                    }
                });
                alert("color changed");
            }


            async function getLatLon(input) {
                const obj = $("#coordinatesDisplay>p")[0];
                console.log(obj);
                var text = obj.innerHTML;
                await navigator.clipboard.writeText(text.replace('<br data-v-5504b43d=\"\">', ''));
            }

            async function getLonLat(input) {
                var obj = $("#coordinatesDisplay>p")[0];
                console.log(obj);
                var text = obj.innerHTML;
                const myArray = text.replace('<br data-v-5504b43d=\"\">', '').split(",");
                var newText = myArray[1] + "," + myArray[0];
                await navigator.clipboard.writeText(newText);
                console.log("after conversion");
                console.log(obj);

            }

            async function getBing(input) {
                var obj2 = $("#baseMapContainer > div:nth-child(1) > img")[0];
                obj2.click();
                console.log(obj2);
                var obj = $("#baseMapSelection > img")[0];
                obj.click();

            }


            async function gsv(input) {
                var btn = $("#ANSITools > div > div > div > div > div:nth-child(1) > button")[0];
                btn.click();
                var map = $("#map");
                map.click();
            }



            async function chk_seg1(input) {

                let segBtn = $("#Road\\ Segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#Lane\\ Lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#Lane\\ Line\\ Points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#Lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#Lane\\ Attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#Lane\\ Line\\ Attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#Lane\\ Center\\ Points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#Road\\ Edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#Road\\ Edge\\ Attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#Road\\ Edge\\ Points > div.col-sm-8.col > button")[0];
                let laneConnBtn = $("#Lane\\ Connections > div.col-sm-8.col > button")[0];
                let signBtn = $("#Signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#Sign\\ Lane\\ Mapping > div.col-sm-8.col > button")[0];
                let pmBtn = $("#Pavement\\ Markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#Pavement\\ Marking\\ Connections > div.col-sm-8.col > button")[0];
                let faBtn = $("#Functional\\ Authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, laneConnBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }
                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (hasElement("lidarTiles")) {
                    lidar.click();
                }


                let segLyr = $("#Road\\ Segments > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                segLyr.dispatchEvent(new Event('click'));
                segBtn.click();
                ansiBtn.click();
            }



            async function chk_lane2(input) {
                let segBtn = $("#Road\\ Segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#Lane\\ Lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#Lane\\ Line\\ Points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#Lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#Lane\\ Attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#Lane\\ Line\\ Attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#Lane\\ Center\\ Points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#Road\\ Edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#Road\\ Edge\\ Attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#Road\\ Edge\\ Points > div.col-sm-8.col > button")[0];
                let laneConnBtn = $("#Lane\\ Connections > div.col-sm-8.col > button")[0];
                let signBtn = $("#Signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#Sign\\ Lane\\ Mapping > div.col-sm-8.col > button")[0];
                let pmBtn = $("#Pavement\\ Markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#Pavement\\ Marking\\ Connections > div.col-sm-8.col > button")[0];
                let faBtn = $("#Functional\\ Authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, laneConnBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }

                let laneLyr = $("#Lanes > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneLyr.dispatchEvent(new Event('click'));
                laneBtn.click();
                ansiBtn.click();
                setTimeout(showLidar, 2000);

            }



            async function chk_lnpt3(input) {


                try {
                    speed = $("#editor9")[0];
                    console.log(speed);
                    $("#aboutBtn").html(" " + speed.innerHTML + " ");
                    //.text().replace(/\n/g,' ').replaceAll(" ","");
                } catch (exceptionVar) {
                    //
                }


                let segBtn = $("#Road\\ Segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#Lane\\ Lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#Lane\\ Line\\ Points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#Lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#Lane\\ Attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#Lane\\ Line\\ Attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#Lane\\ Center\\ Points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#Road\\ Edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#Road\\ Edge\\ Attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#Road\\ Edge\\ Points > div.col-sm-8.col > button")[0];
                let laneConnBtn = $("#Lane\\ Connections > div.col-sm-8.col > button")[0];
                let signBtn = $("#Signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#Sign\\ Lane\\ Mapping > div.col-sm-8.col > button")[0];
                let pmBtn = $("#Pavement\\ Markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#Pavement\\ Marking\\ Connections > div.col-sm-8.col > button")[0];
                let faBtn = $("#Functional\\ Authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, laneConnBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }


                let laneLineAttrLyr = $("#Lane\\ Line\\ Attributes > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneLineAttrLyr.dispatchEvent(new Event('click'));
                laneLineAttrBtn.click();

                let laneLinePtLyr = $("#Lane\\ Line\\ Points > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                //laneLinePtLyr.dispatchEvent(new Event('click'));

                //laneLinePtBtn.click();

                let laneLineLyr = $("#Lane\\ Lines > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneLineLyr.dispatchEvent(new Event('click'));
                laneLineBtn.click();
                ansiBtn.click();

            }

            async function chk_ed4(input) {

                let segBtn = $("#Road\\ Segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#Lane\\ Lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#Lane\\ Line\\ Points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#Lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#Lane\\ Attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#Lane\\ Line\\ Attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#Lane\\ Center\\ Points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#Road\\ Edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#Road\\ Edge\\ Attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#Road\\ Edge\\ Points > div.col-sm-8.col > button")[0];
                let laneConnBtn = $("#Lane\\ Connections > div.col-sm-8.col > button")[0];
                let signBtn = $("#Signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#Sign\\ Lane\\ Mapping > div.col-sm-8.col > button")[0];
                let pmBtn = $("#Pavement\\ Markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#Pavement\\ Marking\\ Connections > div.col-sm-8.col > button")[0];
                let faBtn = $("#Functional\\ Authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, laneConnBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }

                let edgeAttrLyr = $("#Road\\ Edge\\ Attributes > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                edgeAttrLyr.dispatchEvent(new Event('click'));
                let edgePtLyr = $("#Road\\ Edge\\ Points > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                //edgePtLyr.dispatchEvent(new Event('click'));
                let edgeLyr = $("#Road\\ Edges > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                edgeLyr.dispatchEvent(new Event('click'));


                edgeAttrBtnBtn.click();
                edgePtBtn.click();
                edgeBtn.click();
                ansiBtn.click();
            }

            async function chk_xing5(input) {

                let segBtn = $("#Road\\ Segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#Lane\\ Lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#Lane\\ Line\\ Points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#Lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#Lane\\ Attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#Lane\\ Line\\ Attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#Lane\\ Center\\ Points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#Road\\ Edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#Road\\ Edge\\ Attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#Road\\ Edge\\ Points > div.col-sm-8.col > button")[0];
                let laneConnBtn = $("#Lane\\ Connections > div.col-sm-8.col > button")[0];
                let signBtn = $("#Signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#Sign\\ Lane\\ Mapping > div.col-sm-8.col > button")[0];
                let pmBtn = $("#Pavement\\ Markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#Pavement\\ Marking\\ Connections > div.col-sm-8.col > button")[0];
                let faBtn = $("#Functional\\ Authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, laneConnBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (hasElement("lidarTiles")) {
                    lidar.click();
                }
                var ansiLyr = $("#ANSI > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                ansiLyr.dispatchEvent(new Event('click'));
                ansiBtn.click();
                let laneAttrLyr = $("#Lane\\ Attributes > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneAttrLyr.dispatchEvent(new Event('click'));
                let pmConnLyr = $("#Pavement\\ Marking\\ Connections > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                pmConnLyr.dispatchEvent(new Event('click'));
                let signConnLyr = $("#Sign\\ Lane\\ Mapping > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                signConnLyr.dispatchEvent(new Event('click'));
                let pmLyr = $("#Pavement\\ Markings > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                pmLyr.dispatchEvent(new Event('click'));
                let signLyr = $("#Signs > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                signLyr.dispatchEvent(new Event('click'));


                laneAttrBtn.click()
                pmBtn.click();
                //pmConnBtn.click();
                signBtn.click();
                //signConnBtn.click();


            }
            async function chk_spd6(input) {
                // alert(speed.innerHTML);
                let segBtn = $("#Road\\ Segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#Lane\\ Lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#Lane\\ Line\\ Points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#Lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#Lane\\ Attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#Lane\\ Line\\ Attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#Lane\\ Center\\ Points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#Road\\ Edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#Road\\ Edge\\ Attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#Road\\ Edge\\ Points > div.col-sm-8.col > button")[0];
                let laneConnBtn = $("#Lane\\ Connections > div.col-sm-8.col > button")[0];
                let signBtn = $("#Signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#Sign\\ Lane\\ Mapping > div.col-sm-8.col > button")[0];
                let pmBtn = $("#Pavement\\ Markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#Pavement\\ Marking\\ Connections > div.col-sm-8.col > button")[0];
                let faBtn = $("#Functional\\ Authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, laneConnBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }
                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (hasElement("lidarTiles")) {
                    lidar.click();
                }

                let signLyr = $("#Signs > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                signLyr.dispatchEvent(new Event('click'));
                signBtn.click();

            }
            async function ansi(input) {
                gobtn.click();
                gobtn.click();

                let segBtn = $("#Road\\ Segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#Lane\\ Lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#Lane\\ Line\\ Points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#Lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#Lane\\ Attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#Lane\\ Line\\ Attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#Lane\\ Center\\ Points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#Road\\ Edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#Road\\ Edge\\ Attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#Road\\ Edge\\ Points > div.col-sm-8.col > button")[0];
                let laneConnBtn = $("#Lane\\ Connections > div.col-sm-8.col > button")[0];
                let signBtn = $("#Signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#Sign\\ Lane\\ Mapping > div.col-sm-8.col > button")[0];
                let pmBtn = $("#Pavement\\ Markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#Pavement\\ Marking\\ Connections > div.col-sm-8.col > button")[0];
                let faBtn = $("#Functional\\ Authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, laneConnBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }


                var ansiLyr = $("#ANSI > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                ansiLyr.dispatchEvent(new Event('click'));
                ansiBtn.click();


            }
            async function notes(input) {

                let segBtn = $("#Road\\ Segments > div.col-sm-8.col > button")[0];
                let laneLineBtn = $("#Lane\\ Lines > div.col-sm-8.col > button")[0];
                let laneLinePtBtn = $("#Lane\\ Line\\ Points > div.col-sm-8.col > button")[0];
                let laneBtn = $("#Lanes > div.col-sm-8.col > button")[0];
                let laneAttrBtn = $("#Lane\\ Attributes > div.col-sm-8.col > button")[0];
                let laneLineAttrBtn = $("#Lane\\ Line\\ Attributes > div.col-sm-8.col > button")[0];
                let laneCenPtBtn = $("#Lane\\ Center\\ Points > div.col-sm-8.col > button")[0];
                let edgeBtn = $("#Road\\ Edges > div.col-sm-8.col > button")[0];
                let edgeAttrBtnBtn = $("#Road\\ Edge\\ Attributes > div.col-sm-8.col > button")[0];
                let edgePtBtn = $("#Road\\ Edge\\ Points > div.col-sm-8.col > button")[0];
                let laneConnBtn = $("#Lane\\ Connections > div.col-sm-8.col > button")[0];
                let signBtn = $("#Signs > div.col-sm-8.col > button")[0];
                let signConnBtn = $("#Sign\\ Lane\\ Mapping > div.col-sm-8.col > button")[0];
                let pmBtn = $("#Pavement\\ Markings > div.col-sm-8.col > button")[0];
                let pmConnBtn = $("#Pavement\\ Marking\\ Connections > div.col-sm-8.col > button")[0];
                let faBtn = $("#Functional\\ Authority > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];


                let lyrs = [segBtn, laneLineBtn, laneLinePtBtn, laneBtn, laneAttrBtn, laneLineAttrBtn, laneCenPtBtn, edgeBtn, edgeAttrBtnBtn, edgePtBtn, laneConnBtn, signBtn, signConnBtn, pmBtn, pmConnBtn, faBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }

                var ansiLyr = $("#ANSI > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                ansiLyr.dispatchEvent(new Event('click'));
                ansiBtn.click();

                var obj2 = $("#togglePass")[0];
                obj2.click();
                var notetext = $("#notes")[0];
                const text = await navigator.clipboard.readText();
                notetext.value = text;
                notetext.dispatchEvent(new Event('input'));


            }

            //--- Style our newly added elements using CSS.

            GM_addStyle(' #myContainer {position:absolute !important;top: 10px;left: 400px;font-size:   20px;background:  #f0f0f0;border: 1px outset black;margin: 5px;opacity:100; z-index:1100;padding:5px 20px; } .btn-cmd {cursor: pointer;border-radius:10px;background-color:#99d8c9;width:80px; } #myContainer p {color:  red;background: blue; }');




            alert("TOYOTA ANSI STARTED");




        }, 5000)

    } else if (task === "RIVIAN") {
        setTimeout(function() {


            // zoom widget
            var expzdiv = $("#expandableZoom")[0];
            expzdiv.style.display = "none";

            // lat lon widget
            var xyinput = $(".coordinates-input-field")[0];
            var gobtn = $(".go-btn")[0];



            var zNode = document.createElement('div');
            zNode.innerHTML = `<div class="btn-group"  role="group" aria-label="Basic example">
        <button id="prjBtn" class="btn btn-sm btn-success" type="button">PROJECT</button>
        &nbsp;&nbsp;<button id="tabBtn" class="btn btn-sm btn-warning" type="button">TAB</button>
        &nbsp;&nbsp;<button id="svBtn" class="btn btn-sm btn-warning" type="button">SV</button>
        &nbsp;&nbsp;<button id="bingBtn" class="btn btn-sm btn-warning" type="button">Bing</button>
        &nbsp;&nbsp;<button id="nextBtn" class="btn btn-sm btn-warning" type="button">NEXT</button>
        &nbsp;&nbsp;<button id="segBtn" class="btn btn-sm btn-warning" type="button">1 SEG</button>
        &nbsp;&nbsp;<button id="lnBtn" class="btn btn-sm btn-warning" type="button">2 LANE</button>
        &nbsp;&nbsp;<button id="lnPtBtn" class="btn btn-sm btn-warning" type="button">3DELIS</button>
        &nbsp;&nbsp;<button id="edBtn" class="btn btn-sm btn-warning" type="button">4MERGE</button>
        &nbsp;&nbsp;<button id="xingBtn" class="btn btn-sm btn-warning" type="button">6UNSAFE</button>
        &nbsp;&nbsp;<button id="spdBtn" class="btn btn-sm btn-warning" type="button">7SPEED</button>
        &nbsp;&nbsp;<button id="aboutBtn" class="btn btn-sm btn-primary rounded-pill" type="button">-99</button>
        &nbsp;&nbsp;<button id="ansiBtn" class="btn btn-sm btn-warning" type="button">7ANSI</button>
        &nbsp;&nbsp;<button id="noteBtn" class="btn btn-sm btn-warning" type="button">8Notes</button>
        &nbsp;&nbsp;<button id="xyBtn" class="btn btn-sm btn-warning" type="button">X Y</button>
        </div>`;
            zNode.setAttribute('id', 'myContainer');
            document.body.appendChild(zNode);
            $("#myContainer").draggable();
            $("#prjBtn").html(task);

            //--- Activate the newly added button.
            document.getElementById("prjBtn").addEventListener(
                "click", about, false
            );
            //--- Activate the newly added button.
            document.getElementById("nextBtn").addEventListener(
                "click", goNext, false
            );
            //--- Activate the newly added button.
            document.getElementById("xyBtn").addEventListener(
                "click", getLatLon, false
            );
            //--- Activate the newly added button.
            document.getElementById("tabBtn").addEventListener(
                "click", openTable, false
            );
            //--- Activate the newly added button.
            document.getElementById("bingBtn").addEventListener(
                "click", getBing, false
            );

            document.getElementById("svBtn").addEventListener(
                "click", gsv, false
            );
            document.getElementById("segBtn").addEventListener(
                "click", chk_seg1, false
            );
            document.getElementById("lnBtn").addEventListener(
                "click", chk_lane2, false
            );
            document.getElementById("lnPtBtn").addEventListener(
                "click", chk_deli3, false
            );
            document.getElementById("edBtn").addEventListener(
                "click", chk_merge4, false
            );
            document.getElementById("xingBtn").addEventListener(
                "click", chk_xing5, false
            );
            document.getElementById("spdBtn").addEventListener(
                "click", chk_spd6, false
            );
            document.getElementById("ansiBtn").addEventListener(
                "click", ansi, false
            );
            document.getElementById("noteBtn").addEventListener(
                "click", notes, false
            );


            async function about(input) {
                const text = `This is a small tool developed by Huiqing Huang
            to promote the efficiency on the mmp platform!
            Please contact Huiqing for any details!`;
                alert(text);
            }

            async function openTable(input){
                var btn = $("#ANSITools > div > div > div > div > div:nth-child(2) > button")[0];
                btn.click();
            }
            async function goNext(input) {
                const text = await navigator.clipboard.readText();

                //#expandableCoordinates > div > div.coordinates-input-field.active > div > div.col > input
                const xytext = $("#expandableCoordinates > div > div.coordinates-input-field > div > div.col > input")[0];


                xytext.value = text;
                xytext.dispatchEvent(new Event('input'));
                //xyinput.classList.add("active");
                gobtn.click();
                gobtn.click();


                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneBtn = $("#drive_lane_subtype > div.col-sm-8.col > button")[0];
                let laneLineDeliBtn = $("#lane_line_delineator > div.col-sm-8.col > button")[0];
                let roadEdgeDeliBtn = $("#road_edge_delineator > div.col-sm-8.col > button")[0];
                let roadShdrDeliBtn = $("#lane_shoulder_delineator > div.col-sm-8.col > button")[0];
                let splitPtBtn = $("#split_point_feature > div.col-sm-8.col > button")[0];
                let mergePtBtn = $("#merge_point_feature > div.col-sm-8.col > button")[0];
                let optiPtBtn = $("#optional_point_feature > div.col-sm-8.col > button")[0];
                let mandPtBtn = $("#mandatory_point_feature > div.col-sm-8.col > button")[0];
                let overPtBtn = $("#overhead_surface_point_feature > div.col-sm-8.col > button")[0];
                let unsafeStartBtn = $("#unsafe_stretches_starts > div.col-sm-8.col > button")[0];
                let unsafeEndBtn = $("#unsafe_stretches_ends > div.col-sm-8.col > button")[0];
                let mergeContextBtn = $("#merge_context_features > div.col-sm-8.col > button")[0];
                let maxSpeedBtn = $("#max_speed_limits > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [segBtn, laneBtn, laneLineDeliBtn, roadEdgeDeliBtn, roadShdrDeliBtn, splitPtBtn, mergePtBtn, optiPtBtn, mandPtBtn, overPtBtn, unsafeStartBtn, unsafeEndBtn, mergeContextBtn, maxSpeedBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }

                }
                ansiBtn.click();

            }

            async function changeColors(input) {
                const oldColorNormalized = '#063c6d';
                const newColor = '#ff0000';
                document.querySelectorAll('*').forEach(el => {
                    if (getComputedStyle(el).color === oldColorNormalized) {
                        el.style.color = newColor
                    }
                });
                alert("color changed");
            }


            async function getLatLon(input) {
                const obj = $("#coordinatesDisplay>p")[0];
                console.log(obj);
                var text = obj.innerHTML;
                await navigator.clipboard.writeText(text.replace('<br data-v-5504b43d=\"\">', ''));
            }

            async function getLonLat(input) {
                var obj = $("#coordinatesDisplay>p")[0];
                console.log(obj);
                var text = obj.innerHTML;
                const myArray = text.replace('<br data-v-5504b43d=\"\">', '').split(",");
                var newText = myArray[1] + "," + myArray[0];
                await navigator.clipboard.writeText(newText);
                console.log("after conversion");
                console.log(obj);

            }

            async function getBing(input) {
                var obj2 = $("#baseMapContainer > div:nth-child(1) > img")[0];
                obj2.click();
                console.log(obj2);
                var obj = $("#baseMapSelection > img")[0];
                obj.click();

            }


            async function gsv(input) {
                var btn = $("#ANSITools > div > div > div > div > div:nth-child(1) > button")[0];
                btn.click();
                var map = $("#map");
                map.click();
            }



            async function chk_seg1(input) {

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneBtn = $("#drive_lane_subtype > div.col-sm-8.col > button")[0];
                let laneLineDeliBtn = $("#lane_line_delineator > div.col-sm-8.col > button")[0];
                let roadEdgeDeliBtn = $("#road_edge_delineator > div.col-sm-8.col > button")[0];
                let roadShdrDeliBtn = $("#lane_shoulder_delineator > div.col-sm-8.col > button")[0];
                let splitPtBtn = $("#split_point_feature > div.col-sm-8.col > button")[0];
                let mergePtBtn = $("#merge_point_feature > div.col-sm-8.col > button")[0];
                let optiPtBtn = $("#optional_point_feature > div.col-sm-8.col > button")[0];
                let mandPtBtn = $("#mandatory_point_feature > div.col-sm-8.col > button")[0];
                let overPtBtn = $("#overhead_surface_point_feature > div.col-sm-8.col > button")[0];
                let unsafeStartBtn = $("#unsafe_stretches_starts > div.col-sm-8.col > button")[0];
                let unsafeEndBtn = $("#unsafe_stretches_ends > div.col-sm-8.col > button")[0];
                let mergeContextBtn = $("#merge_context_features > div.col-sm-8.col > button")[0];
                let maxSpeedBtn = $("#max_speed_limits > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [segBtn, laneBtn, laneLineDeliBtn, roadEdgeDeliBtn, roadShdrDeliBtn, splitPtBtn, mergePtBtn, optiPtBtn, mandPtBtn, overPtBtn, unsafeStartBtn, unsafeEndBtn, mergeContextBtn, maxSpeedBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }


                let segLyr = $("#road_segments > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                segLyr.dispatchEvent(new Event('click'));
                segBtn.click();
                ansiBtn.click();
            }



            async function chk_lane2(input) {


                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneBtn = $("#drive_lane_subtype > div.col-sm-8.col > button")[0];
                let laneLineDeliBtn = $("#lane_line_delineator > div.col-sm-8.col > button")[0];
                let roadEdgeDeliBtn = $("#road_edge_delineator > div.col-sm-8.col > button")[0];
                let roadShdrDeliBtn = $("#lane_shoulder_delineator > div.col-sm-8.col > button")[0];
                let splitPtBtn = $("#split_point_feature > div.col-sm-8.col > button")[0];
                let mergePtBtn = $("#merge_point_feature > div.col-sm-8.col > button")[0];
                let optiPtBtn = $("#optional_point_feature > div.col-sm-8.col > button")[0];
                let mandPtBtn = $("#mandatory_point_feature > div.col-sm-8.col > button")[0];
                let overPtBtn = $("#overhead_surface_point_feature > div.col-sm-8.col > button")[0];
                let unsafeStartBtn = $("#unsafe_stretches_starts > div.col-sm-8.col > button")[0];
                let unsafeEndBtn = $("#unsafe_stretches_ends > div.col-sm-8.col > button")[0];
                let mergeContextBtn = $("#merge_context_features > div.col-sm-8.col > button")[0];
                let maxSpeedBtn = $("#max_speed_limits > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [segBtn, laneBtn, laneLineDeliBtn, roadEdgeDeliBtn, roadShdrDeliBtn, splitPtBtn, mergePtBtn, optiPtBtn, mandPtBtn, overPtBtn, unsafeStartBtn, unsafeEndBtn, mergeContextBtn, maxSpeedBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }


                let laneLyr = $("#drive_lane_subtype > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneLyr.dispatchEvent(new Event('click'));
                laneBtn.click();
                ansiBtn.click();
                setTimeout(showLidar, 2000);

            }



            async function chk_deli3(input) {
                try {
                speed = $("#editor7")[0];
                console.log(speed);
                $("#aboutBtn").html(" " + speed.innerHTML + " ");
                //.text().replace(/\n/g,' ').replaceAll(" ","");
                } catch (exceptionVar) {
                    //
                }



                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneBtn = $("#drive_lane_subtype > div.col-sm-8.col > button")[0];
                let laneLineDeliBtn = $("#lane_line_delineator > div.col-sm-8.col > button")[0];
                let roadEdgeDeliBtn = $("#road_edge_delineator > div.col-sm-8.col > button")[0];
                let roadShdrDeliBtn = $("#lane_shoulder_delineator > div.col-sm-8.col > button")[0];
                let splitPtBtn = $("#split_point_feature > div.col-sm-8.col > button")[0];
                let mergePtBtn = $("#merge_point_feature > div.col-sm-8.col > button")[0];
                let optiPtBtn = $("#optional_point_feature > div.col-sm-8.col > button")[0];
                let mandPtBtn = $("#mandatory_point_feature > div.col-sm-8.col > button")[0];
                let overPtBtn = $("#overhead_surface_point_feature > div.col-sm-8.col > button")[0];
                let unsafeStartBtn = $("#unsafe_stretches_starts > div.col-sm-8.col > button")[0];
                let unsafeEndBtn = $("#unsafe_stretches_ends > div.col-sm-8.col > button")[0];
                let mergeContextBtn = $("#merge_context_features > div.col-sm-8.col > button")[0];
                let maxSpeedBtn = $("#max_speed_limits > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [segBtn, laneBtn, laneLineDeliBtn, roadEdgeDeliBtn, roadShdrDeliBtn, splitPtBtn, mergePtBtn, optiPtBtn, mandPtBtn, overPtBtn, unsafeStartBtn, unsafeEndBtn, mergeContextBtn, maxSpeedBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }

                let laneShoulderLyr = $("#lane_shoulder_delineator > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneShoulderLyr.dispatchEvent(new Event('click'));
                let roadEdgeDeliLyr = $("#road_edge_delineator > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                roadEdgeDeliLyr.dispatchEvent(new Event('click'));
                let laneLineDeliLyr = $("#lane_line_delineator > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                laneLineDeliLyr.dispatchEvent(new Event('click'));
                laneLineDeliBtn.click();
                roadShdrDeliBtn.click();
                roadEdgeDeliBtn.click();
                ansiBtn.click();
            }

            async function chk_merge4(input) {

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneBtn = $("#drive_lane_subtype > div.col-sm-8.col > button")[0];
                let laneLineDeliBtn = $("#lane_line_delineator > div.col-sm-8.col > button")[0];
                let roadEdgeDeliBtn = $("#road_edge_delineator > div.col-sm-8.col > button")[0];
                let roadShdrDeliBtn = $("#lane_shoulder_delineator > div.col-sm-8.col > button")[0];
                let splitPtBtn = $("#split_point_feature > div.col-sm-8.col > button")[0];
                let mergePtBtn = $("#merge_point_feature > div.col-sm-8.col > button")[0];
                let optiPtBtn = $("#optional_point_feature > div.col-sm-8.col > button")[0];
                let mandPtBtn = $("#mandatory_point_feature > div.col-sm-8.col > button")[0];
                let overPtBtn = $("#overhead_surface_point_feature > div.col-sm-8.col > button")[0];
                let unsafeStartBtn = $("#unsafe_stretches_starts > div.col-sm-8.col > button")[0];
                let unsafeEndBtn = $("#unsafe_stretches_ends > div.col-sm-8.col > button")[0];
                let mergeContextBtn = $("#merge_context_features > div.col-sm-8.col > button")[0];
                let maxSpeedBtn = $("#max_speed_limits > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [segBtn, laneBtn, laneLineDeliBtn, roadEdgeDeliBtn, roadShdrDeliBtn, splitPtBtn, mergePtBtn, optiPtBtn, mandPtBtn, overPtBtn, unsafeStartBtn, unsafeEndBtn, mergeContextBtn, maxSpeedBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }
                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }

                let split_point_feature_lyr = $("#split_point_feature > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                split_point_feature_lyr.dispatchEvent(new Event('click'));
                let merge_point_feature_lyr = $("#merge_point_feature > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                merge_point_feature_lyr.dispatchEvent(new Event('click'));
                let optional_point_feature_lyr = $("#optional_point_feature > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                optional_point_feature_lyr.dispatchEvent(new Event('click'));
                let mandatory_point_feature_lyr = $("#mandatory_point_feature > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                mandatory_point_feature_lyr.dispatchEvent(new Event('click'));

                mergePtBtn.click();
                splitPtBtn.click();
                optiPtBtn.click();
                mandPtBtn.click();
                ansiBtn.click();
            }

            async function chk_xing5(input) {

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneBtn = $("#drive_lane_subtype > div.col-sm-8.col > button")[0];
                let laneLineDeliBtn = $("#lane_line_delineator > div.col-sm-8.col > button")[0];
                let roadEdgeDeliBtn = $("#road_edge_delineator > div.col-sm-8.col > button")[0];
                let roadShdrDeliBtn = $("#lane_shoulder_delineator > div.col-sm-8.col > button")[0];
                let splitPtBtn = $("#split_point_feature > div.col-sm-8.col > button")[0];
                let mergePtBtn = $("#merge_point_feature > div.col-sm-8.col > button")[0];
                let optiPtBtn = $("#optional_point_feature > div.col-sm-8.col > button")[0];
                let mandPtBtn = $("#mandatory_point_feature > div.col-sm-8.col > button")[0];
                let overPtBtn = $("#overhead_surface_point_feature > div.col-sm-8.col > button")[0];
                let unsafeStartBtn = $("#unsafe_stretches_starts > div.col-sm-8.col > button")[0];
                let unsafeEndBtn = $("#unsafe_stretches_ends > div.col-sm-8.col > button")[0];
                let mergeContextBtn = $("#merge_context_features > div.col-sm-8.col > button")[0];
                let maxSpeedBtn = $("#max_speed_limits > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [segBtn, laneBtn, laneLineDeliBtn, roadEdgeDeliBtn, roadShdrDeliBtn, splitPtBtn, mergePtBtn, optiPtBtn, mandPtBtn, overPtBtn, unsafeStartBtn, unsafeEndBtn, mergeContextBtn, maxSpeedBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (!hasElement("lidarTiles")) {
                    lidar.click();
                }

                let unsafeStLyr = $("#unsafe_stretches_starts > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                unsafeStLyr.dispatchEvent(new Event('click'));
                let unsafeEndLyr = $("#unsafe_stretches_ends > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                unsafeEndLyr.dispatchEvent(new Event('click'));
                let mConLyr = $("#merge_context_features > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                mConLyr.dispatchEvent(new Event('click'));
                let ohPtLyr = $("#overhead_surface_point_feature > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                ohPtLyr.dispatchEvent(new Event('click'));

                unsafeStartBtn.click();
                unsafeEndBtn.click();
                overPtBtn.click();
                mergeContextBtn.click();
                ansiBtn.click();

            }
            async function chk_spd6(input) {
                // alert(speed.innerHTML);
                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneBtn = $("#drive_lane_subtype > div.col-sm-8.col > button")[0];
                let laneLineDeliBtn = $("#lane_line_delineator > div.col-sm-8.col > button")[0];
                let roadEdgeDeliBtn = $("#road_edge_delineator > div.col-sm-8.col > button")[0];
                let roadShdrDeliBtn = $("#lane_shoulder_delineator > div.col-sm-8.col > button")[0];
                let splitPtBtn = $("#split_point_feature > div.col-sm-8.col > button")[0];
                let mergePtBtn = $("#merge_point_feature > div.col-sm-8.col > button")[0];
                let optiPtBtn = $("#optional_point_feature > div.col-sm-8.col > button")[0];
                let mandPtBtn = $("#mandatory_point_feature > div.col-sm-8.col > button")[0];
                let overPtBtn = $("#overhead_surface_point_feature > div.col-sm-8.col > button")[0];
                let unsafeStartBtn = $("#unsafe_stretches_starts > div.col-sm-8.col > button")[0];
                let unsafeEndBtn = $("#unsafe_stretches_ends > div.col-sm-8.col > button")[0];
                let mergeContextBtn = $("#merge_context_features > div.col-sm-8.col > button")[0];
                let maxSpeedBtn = $("#max_speed_limits > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [segBtn, laneBtn, laneLineDeliBtn, roadEdgeDeliBtn, roadShdrDeliBtn, splitPtBtn, mergePtBtn, optiPtBtn, mandPtBtn, overPtBtn, unsafeStartBtn, unsafeEndBtn, mergeContextBtn, maxSpeedBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }

                var lidar = $("#expandableLidarToggle > div > div:nth-child(2) > svg")[0].closest("div");
                if (hasElement("lidarTiles")) {
                    lidar.click();
                }
                let maxSpeedLyr = $("#max_speed_limits > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                maxSpeedLyr.dispatchEvent(new Event('click'));
                maxSpeedBtn.click();
            }
            async function ansi(input) {
                gobtn.click();
                gobtn.click();

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneBtn = $("#drive_lane_subtype > div.col-sm-8.col > button")[0];
                let laneLineDeliBtn = $("#lane_line_delineator > div.col-sm-8.col > button")[0];
                let roadEdgeDeliBtn = $("#road_edge_delineator > div.col-sm-8.col > button")[0];
                let roadShdrDeliBtn = $("#lane_shoulder_delineator > div.col-sm-8.col > button")[0];
                let splitPtBtn = $("#split_point_feature > div.col-sm-8.col > button")[0];
                let mergePtBtn = $("#merge_point_feature > div.col-sm-8.col > button")[0];
                let optiPtBtn = $("#optional_point_feature > div.col-sm-8.col > button")[0];
                let mandPtBtn = $("#mandatory_point_feature > div.col-sm-8.col > button")[0];
                let overPtBtn = $("#overhead_surface_point_feature > div.col-sm-8.col > button")[0];
                let unsafeStartBtn = $("#unsafe_stretches_starts > div.col-sm-8.col > button")[0];
                let unsafeEndBtn = $("#unsafe_stretches_ends > div.col-sm-8.col > button")[0];
                let mergeContextBtn = $("#merge_context_features > div.col-sm-8.col > button")[0];
                let maxSpeedBtn = $("#max_speed_limits > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [segBtn, laneBtn, laneLineDeliBtn, roadEdgeDeliBtn, roadShdrDeliBtn, splitPtBtn, mergePtBtn, optiPtBtn, mandPtBtn, overPtBtn, unsafeStartBtn, unsafeEndBtn, mergeContextBtn, maxSpeedBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }


                var ansiLyr = $("#ANSI > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                ansiLyr.dispatchEvent(new Event('click'));
                ansiBtn.click();


            }
            async function notes(input) {

                let segBtn = $("#road_segments > div.col-sm-8.col > button")[0];
                let laneBtn = $("#drive_lane_subtype > div.col-sm-8.col > button")[0];
                let laneLineDeliBtn = $("#lane_line_delineator > div.col-sm-8.col > button")[0];
                let roadEdgeDeliBtn = $("#road_edge_delineator > div.col-sm-8.col > button")[0];
                let roadShdrDeliBtn = $("#lane_shoulder_delineator > div.col-sm-8.col > button")[0];
                let splitPtBtn = $("#split_point_feature > div.col-sm-8.col > button")[0];
                let mergePtBtn = $("#merge_point_feature > div.col-sm-8.col > button")[0];
                let optiPtBtn = $("#optional_point_feature > div.col-sm-8.col > button")[0];
                let mandPtBtn = $("#mandatory_point_feature > div.col-sm-8.col > button")[0];
                let overPtBtn = $("#overhead_surface_point_feature > div.col-sm-8.col > button")[0];
                let unsafeStartBtn = $("#unsafe_stretches_starts > div.col-sm-8.col > button")[0];
                let unsafeEndBtn = $("#unsafe_stretches_ends > div.col-sm-8.col > button")[0];
                let mergeContextBtn = $("#merge_context_features > div.col-sm-8.col > button")[0];
                let maxSpeedBtn = $("#max_speed_limits > div.col-sm-8.col > button")[0];
                let ansiBtn = $("#ANSI > div.col-sm-8.col > button")[0];

                let lyrs = [segBtn, laneBtn, laneLineDeliBtn, roadEdgeDeliBtn, roadShdrDeliBtn, splitPtBtn, mergePtBtn, optiPtBtn, mandPtBtn, overPtBtn, unsafeStartBtn, unsafeEndBtn, mergeContextBtn, maxSpeedBtn, ansiBtn]
                for (var i = 0; i < lyrs.length; i++) {
                    //console.log(lyrs[i]);
                    if (hasClass(lyrs[i], "available-enabled")) {
                        lyrs[i].click();
                    }
                }
                var ansiLyr = $("#ANSI > div.col-sm-4.center.col > svg.img-fluid.cursor.mx-2.pb-1.svg-inline--fa.fa-long-arrow-alt-up.fa-w-8")[0];
                ansiLyr.dispatchEvent(new Event('click'));
                ansiBtn.click();

                var obj2 = $("#togglePass")[0];
                obj2.click();
                var notetext = $("#notes")[0];
                const text = await navigator.clipboard.readText();
                notetext.value = text;
                notetext.dispatchEvent(new Event('input'));

            }

            //--- Style our newly added elements using CSS.

            GM_addStyle(' #myContainer {position:absolute !important;top: 10px;left: 400px;font-size:   20px;background:  #f0f0f0;border: 1px outset black;margin: 5px;opacity:100; z-index:1100;padding:5px 20px; } .btn-cmd {cursor: pointer;border-radius:10px;background-color:#99d8c9;width:80px; } #myContainer p {color:  red;background: blue; }');




            alert("function called");




        }, 5000)

    }




    console.log("script ran");
})();
