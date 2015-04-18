"use strict";angular.module("toaster",["ngAnimate"]).service("toaster",["$rootScope",function(t){this.pop=function(e,o,s,i,a,n){this.toast={type:e,title:o,body:s,timeout:i,bodyOutputType:a,clickHandler:n},t.$broadcast("toaster-newToast")},this.clear=function(){t.$broadcast("toaster-clearToasts")}}]).constant("toasterConfig",{limit:0,"tap-to-dismiss":!0,"close-button":!1,"newest-on-top":!0,"time-out":5e3,"icon-classes":{error:"toast-error",info:"toast-info",wait:"toast-wait",success:"toast-success",warning:"toast-warning"},"body-output-type":"","body-template":"toasterBodyTmpl.html","icon-class":"toast-info","position-class":"toast-top-right","title-class":"toast-title","message-class":"toast-message"}).directive("toasterContainer",["$compile","$timeout","$sce","toasterConfig","toaster",function(t,e,o,s,i){return{replace:!0,restrict:"EA",scope:!0,link:function(t,a,n){function r(e){switch(e.type=l["icon-classes"][e.type],e.type||(e.type=l["icon-class"]),u++,angular.extend(e,{id:u}),e.bodyOutputType=e.bodyOutputType||l["body-output-type"],e.bodyOutputType){case"trustedHtml":e.html=o.trustAsHtml(e.body);break;case"template":e.bodyTemplate=e.body||l["body-template"]}t.configureTimer(e),l["newest-on-top"]===!0?(t.toasters.unshift(e),l.limit>0&&t.toasters.length>l.limit&&t.toasters.pop()):(t.toasters.push(e),l.limit>0&&t.toasters.length>l.limit&&t.toasters.shift())}function c(o,s){o.timeout=e(function(){t.removeToast(o.id)},s)}var l,u=0;l=angular.extend({},s,t.$eval(n.toasterOptions)),t.config={position:l["position-class"],title:l["title-class"],message:l["message-class"],tap:l["tap-to-dismiss"],closeButton:l["close-button"]},t.configureTimer=function(t){var e="number"==typeof t.timeout?t.timeout:l["time-out"];e>0&&c(t,e)},t.toasters=[],t.$on("toaster-newToast",function(){r(i.toast)}),t.$on("toaster-clearToasts",function(){t.toasters.splice(0,t.toasters.length)})},controller:["$scope","$element","$attrs",function(t,o,s){t.stopTimer=function(t){t.timeout&&(e.cancel(t.timeout),t.timeout=null)},t.restartTimer=function(e){e.timeout||t.configureTimer(e)},t.removeToast=function(e){var o=0;for(o;o<t.toasters.length&&t.toasters[o].id!==e;o++);t.toasters.splice(o,1)},t.click=function(e){if(t.config.tap===!0)if(e.clickHandler&&angular.isFunction(t.$parent.$eval(e.clickHandler))){var o=t.$parent.$eval(e.clickHandler)(e);o===!0&&t.removeToast(e.id)}else angular.isString(e.clickHandler)&&console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container."),t.removeToast(e.id)}}],template:'<div  id="toast-container" ng-class="config.position"><div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click(toaster)" ng-mouseover="stopTimer(toaster)"  ng-mouseout="restartTimer(toaster)"><button class="toast-close-button" ng-show="config.closeButton">&times;</button><div ng-class="config.title">{{toaster.title}}</div><div ng-class="config.message" ng-switch on="toaster.bodyOutputType"><div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div><div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-default >{{toaster.body}}</div></div></div></div>'}}]);