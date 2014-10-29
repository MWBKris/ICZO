/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        var pushNotification = window.plugins.pushNotification;
        pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"813672614268","ecb":"app.onNotificationGCM"});

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        alert('Received Event: ' + id);
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        alert('Callback Success! Result = '+result)
    },
    errorHandler:function(error) {
        alert(error);
    },
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
            if ( e.regid.length > 0 ) {
                            //$("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                            // Your GCM push server needs to know the regID before it can push to this device
                            // here is where you might want to send it the regID for later use.
                            $.ajax({
                                type: "POST",
                                url: "http://www.my-websitebuilder.be/gcms/register.php",
                                data: "company=22&name=iczo&email=info@iczo.be&regId="+ e.regid + '&platform=' + device.platform,
                                success: function(){

                                   //$("#app-status-ul").append('<li>GELUKT</li>');
                                   //document.location="http://www.deweergallery.be/mobile/index.php?phoneId=" + e.regid;
                                   document.location="html5App/index.html";
                               },
                               error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    //$("#app-status-ul").append('<li>NIET GELUKT</li>');
                                    //alert('textStatus: ' + textStatus + '       '  + 'errorThrown: ' + errorThrown);
                                }
                            });
console.log("regID = " + e.regID);
}
break;

case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                alert('message = '+e.message+' msgcnt = '+e.msgcnt);
                break;

                case 'error':
                alert('GCM error = '+e.msg);
                break;

                default:
                alert('An unknown GCM event has occurred');
                break;
            }
        }

    };