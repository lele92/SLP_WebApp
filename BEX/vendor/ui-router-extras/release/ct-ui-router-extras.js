!function(t,e){"use strict";function r(t,e){var r=[];for(var n in t.path){if(t.path[n]!==e.path[n])break;r.push(t.path[n])}return r}function n(e){if(Object.keys)return Object.keys(e);var r=[];return t.forEach(e,function(t,e){r.push(e)}),r}function a(t,e){var r=[];for(var n in t)e&&-1!==e.indexOf(n)||r.push(n);return r}function o(t,e){if(Array.prototype.indexOf)return t.indexOf(e,Number(arguments[2])||0);var r=t.length>>>0,n=Number(arguments[2])||0;for(n=0>n?Math.ceil(n):Math.floor(n),0>n&&(n+=r);r>n;n++)if(n in t&&t[n]===e)return n;return-1}function i(t,e,a,i){var u,s=r(a,i),c={},f=[];for(var l in s)if(s[l].params&&(u=g(s[l].params)?s[l].params:n(s[l].params),u.length))for(var v in u)o(f,u[v])>=0||(f.push(u[v]),c[u[v]]=t[u[v]]);return h({},c,e)}function u(t,e){return h(new(h(function(){},{prototype:t})),e)}function s(t){d.push(t)}function c(){b=e}function f(e,r){var n=r,a=n.inheritParams,o=n.protoKeys,i=n.map,u={},s={},c=!1;this.registerStickyState=function(t){s[t.name]=t},this.enableDebug=this.debugMode=function(e){return t.isDefined(e)&&(c=e),c},this.$get=["$rootScope","$state","$stateParams","$injector","$log",function(e,r,n,s,f){function l(){var e={};return t.forEach(u,function(t,r){for(var n=v(t),a=0;a<n.length;a++){var o=n[a].parent;e[o.name]=e[o.name]||[],e[o.name].push(t)}e[""]&&(e.__inactives=e[""])}),e}function v(t){var e=[];if(!t)return e;do t.sticky&&e.push(t),t=t.parent;while(t);return e.reverse(),e}function p(t,e,r){if(t[r]===e[r])return{from:!1,to:!1};var n=r<t.length&&t[r].self.sticky,a=r<e.length&&e[r].self.sticky;return{from:n,to:a}}function d(t,e,r,n){if(n)return"updateStateParams";var a=u[t.self.name];if(!a)return"enter";if(t.self===r)return"updateStateParams";var o=h(e,a.locals.globals.$stateParams,t.ownParams);return o?"reactivate":"updateStateParams"}function m(t,e){var r=u[t.name];if(!r)return null;if(!e)return r;var n=h(e,r.locals.globals.$stateParams,t.ownParams);return n?r:null}function h(e,r,n){if(!t.isArray(n)&&t.isObject(n)&&(n=o(n,["$$keys","$$values","$$equals","$$validates","$$new","$$parent"])),!n){n=[];for(var a in e)n.push(a)}for(var i=0;i<n.length;i++){var u=n[i];if(e[u]!=r[u])return!1}return!0}var g={getInactiveStates:function(){var e=[];return t.forEach(u,function(t){e.push(t)}),e},getInactiveStatesByParent:function(){return l()},processTransition:function(e){var o={inactives:[],enter:[],exit:[],keep:0},u=e.fromState.path,s=e.fromParams,c=e.toState.path,f=e.toParams,v=e.reloadStateTree,m=e.options,g=0,$=c[g];for(m.inherit&&(f=a(n,f||{},r.$current,e.toState));$&&$===u[g]&&h(f,s,$.ownParams);)$=c[++g];o.keep=g;var x,y,S,b={},E=p(u,c,g),P=!!m.reload;for(x=g;x<c.length;x++){var k=E.to?d(c[x],f,v,P):"enter";P=P||"updateStateParams"==k,o.enter[x]=k,"reactivate"==k&&(S=b[c[x].name]=c[x]),"updateStateParams"==k&&(y=b[c[x].name]=c[x])}S=S?S.self.name+".":"",y=y?y.self.name+".":"";var w=l(),j=[""].concat(i(u.slice(0,g),function(t){return t.self.name}));for(t.forEach(j,function(t){for(var e=w[t],r=0;e&&r<e.length;r++){var n=e[r];b[n.name]||S&&0===n.self.name.indexOf(S)||y&&0===n.self.name.indexOf(y)||o.inactives.push(n)}}),x=g;x<u.length;x++){var F="exit";E.from&&(o.inactives.push(u[x]),F="inactivate"),o.exit[x]=F}return o},stateInactivated:function(t){u[t.self.name]=t,t.self.status="inactive",t.self.onInactivate&&s.invoke(t.self.onInactivate,t.self,t.locals.globals)},stateReactivated:function(t){u[t.self.name]&&delete u[t.self.name],t.self.status="entered",t.self.onReactivate&&s.invoke(t.self.onReactivate,t.self,t.locals.globals)},stateExiting:function(e,r,n){var a={};t.forEach(r,function(t){a[t.self.name]=!0}),t.forEach(u,function(r,n){!a[n]&&r.includes[e.name]&&(c&&f.debug("Exiting "+n+" because it's a substate of "+e.name+" and wasn't found in ",a),r.self.onExit&&s.invoke(r.self.onExit,r.self,r.locals.globals),t.forEach(r.locals,function(t,e){delete j.locals[e]}),r.locals=null,r.self.status="exited",delete u[n])}),n&&s.invoke(n,e.self,e.locals.globals),e.locals=null,e.self.status="exited",delete u[e.self.name]},stateEntering:function(t,e,r,n){var a=m(t);if(a&&(n||!m(t,e))){var o=t.locals;this.stateExiting(a),t.locals=o}t.self.status="entered",r&&s.invoke(r,t.self,t.locals.globals)},reset:function(t,n){var a=r.get(t),o=m(a,n);return o?(g.stateExiting(o),e.$broadcast("$viewContentLoading"),!0):!1}};return g}]}function l(t){return{resolve:{},locals:{globals:k&&k.locals&&k.locals.globals},views:{},self:{},params:{},ownParams:R.hasParamSet?{$$equals:function(){return!0}}:[],surrogateType:t}}var v=t.module("ct.ui.router.extras.core",["ui.router"]),p={},d=[];v.config(["$stateProvider","$injector",function(e,r){e.decorator("parent",function(e,r){return p[e.self.name]=e,e.self.$$state=function(){return p[e.self.name]},t.forEach(d,function(t){t(e)}),r(e)})}]);var m=t.forEach,h=t.extend,g=t.isArray,$=function(t,e){var r=[];return m(t,function(t,n){r.push(e(t,n))}),r},x=function(t){return $(t,function(t,e){return e})},y=function(t,e){var r=[];return m(t,function(t,n){e(t,n)&&r.push(t)}),r},S=function(t,e){var r={};return m(t,function(t,n){e(t,n)&&(r[n]=t)}),r};v.provider("uirextras_core",function(){var e={internalStates:p,onStateRegistered:s,forEach:m,extend:h,isArray:g,map:$,keys:x,filter:y,filterObj:S,ancestors:r,objectKeys:n,protoKeys:a,arraySearch:o,inheritParams:i,inherit:u};t.extend(this,e),this.$get=function(){return e}});var b;t.module("ct.ui.router.extras.dsr",["ct.ui.router.extras.core"]).config(["$provide",function(t){var e;t.decorator("$state",["$delegate","$q",function(t,r){return e=t.transitionTo,t.transitionTo=function(n,a,o){return o.ignoreDsr&&(b=o.ignoreDsr),e.apply(t,arguments).then(function(t){return c(),t},function(t){return c(),r.reject(t)})},t}])}]),t.module("ct.ui.router.extras.dsr").service("$deepStateRedirect",["$rootScope","$state","$injector",function(r,n,a){function o(t){var e=t.name;return l.hasOwnProperty(e)?l[e]:void u(e)}function i(e){var r=e.deepStateRedirect||e.dsr;if(!r)return{dsr:!1};var n={dsr:!0};return t.isFunction(r)?n.fn=r:t.isObject(r)&&(n=t.extend(n,r)),t.isString(n["default"])&&(n["default"]={state:n["default"]}),n.fn||(n.fn=["$dsr$",function(t){return t.redirect.state!=t.to.state}]),n}function u(t){var r=n.get(t);if(!r)return!1;var a=i(r);a.dsr&&(l[r.name]=v,f[t]===e&&(f[t]={}));var o=r.$$state&&r.$$state().parent;if(o){var s=u(o.self.name);s&&l[r.name]===e&&(l[r.name]=p)}return l[r.name]||!1}function s(r,n){n===!0&&(n=Object.keys(r)),(null===n||n===e)&&(n=[]);var a={};return t.forEach(n.sort(),function(t){a[t]=r[t]}),a}function c(e,r){function n(t){return t?t.toString():t}var a=s(e,r),o={};return t.forEach(a,function(t,e){o[e]=n(t)}),t.toJson(o)}var f={},l={},v="Redirect",p="AncestorRedirect";return r.$on("$stateChangeStart",function(e,r,u,l,p){var d=i(r);if(!b&&(o(r)===v||d["default"])){var m=c(u,d.params),h=f[r.name][m]||d["default"];if(h){var g={redirect:{state:h.state,params:h.params},to:{state:r.name,params:u}},$=a.invoke(d.fn,r,{$dsr$:g});if($){$.state&&(h=$),e.preventDefault();var x=s(u,d.params);n.go(h.state,t.extend(x,h.params))}}}}),r.$on("$stateChangeSuccess",function(e,r,a,u,s){var l=o(r);if(l){var v=r.name;t.forEach(f,function(e,r){var o=i(n.get(r)),u=c(a,o.params);(v==r||-1!=v.indexOf(r+"."))&&(f[r][u]={state:v,params:t.copy(a)})})}}),{reset:function(e,r){if(e){var a=n.get(e);if(!a)throw new Error("Unknown state: "+e);if(f[a.name])if(r){var o=c(r,i(a).params);delete f[a.name][o]}else f[a.name]={}}else t.forEach(f,function(t,e){f[e]={}})}}}]),t.module("ct.ui.router.extras.dsr").run(["$deepStateRedirect",function(t){}]),t.module("ct.ui.router.extras.sticky",["ct.ui.router.extras.core"]);var E=t.module("ct.ui.router.extras.sticky");f.$inject=["$stateProvider","uirextras_coreProvider"],E.provider("$stickyState",f);var P,k,w,j,p={},F=[],R={hasParamSet:!1};t.module("ct.ui.router.extras.sticky").run(["$stickyState",function(t){P=t}]),t.module("ct.ui.router.extras.sticky").config(["$provide","$stateProvider","$stickyStateProvider","$urlMatcherFactoryProvider","uirextras_coreProvider",function(r,n,a,o,i){function u(e,r,n){function a(t,e,r){return t[e]?t[e].toUpperCase()+": "+r.self.name:"("+r.self.name+")"}var o=p(n.inactives,function(t){return t.self.name}),i=p(r.toState.path,function(t,e){return a(n.enter,e,t)}),u=p(r.fromState.path,function(t,e){return a(n.exit,e,t)}),s=r.fromState.self.name+": "+t.toJson(r.fromParams)+":  -> "+r.toState.self.name+": "+t.toJson(r.toParams);e.debug("   Current transition: ",s),e.debug("Before transition, inactives are:   : ",p(P.getInactiveStates(),function(t){return t.self.name})),e.debug("After transition,  inactives will be: ",o),e.debug("Transition will exit:  ",u),e.debug("Transition will enter: ",i)}function s(t,e,r){t.debug("Current state: "+e.self.name+", inactive states: ",p(P.getInactiveStates(),function(t){return t.self.name}));for(var n=function(t,e){return"'"+e+"' ("+t.$$state.name+")"},a=function(t,e){return"globals"!=e&&"resolve"!=e},o=function(t){var e=p(d(t.locals,a),n).join(", ");return"("+(t.self.name?t.self.name:"root")+".locals"+(e.length?": "+e:"")+")"},i=o(e),u=e.parent;u&&u!==e;)""===u.self.name&&(i=o(r.$current.path[0])+" / "+i),i=o(u)+" / "+i,e=u,u=e.parent;t.debug("Views: "+i)}var c=i,f=c.internalStates,v=c.inherit,p=(c.inheritParams,c.map),d=c.filterObj;R.hasParamSet=!!o.ParamSet,j=t.extend(new l("__inactives"),{self:{name:"__inactives"}}),k=w=e,F=[],i.onStateRegistered(function(t){t.self.sticky===!0&&a.registerStickyState(t.self)});var m;r.decorator("$state",["$delegate","$log","$q",function(r,n,i){return k=r.$current,f[""]=k,k.parent=j,j.parent=e,k.locals=v(j.locals,k.locals),delete j.locals.globals,m=r.transitionTo,r.transitionTo=function(e,c,v){function d(e){var r=t.extend(new l("reactivate_phase1"),{locals:e.locals});return r.self=t.extend({},e.self),r}function h(e){var r=t.extend(new l("reactivate_phase2"),e),n=r.self.onEnter;return r.resolve={},r.views={},r.self.onEnter=function(){r.locals=e.locals,P.stateReactivated(e)},J.addRestoreFunction(function(){e.self.onEnter=n}),r}function g(t){var e=new l("inactivate");e.self=t.self;var r=t.self.onExit;return e.self.onExit=function(){P.stateInactivated(t)},J.addRestoreFunction(function(){t.self.onExit=r}),e}function $(t,e){var r=t.self.onEnter;return t.self.onEnter=function(){P.stateEntering(t,e,r)},J.addRestoreFunction(function(){t.self.onEnter=r}),t}function x(t,e){var r=t.self.onEnter;return t.self.onEnter=function(){P.stateEntering(t,e,r,!0)},J.addRestoreFunction(function(){t.self.onEnter=r}),t}function y(t){var e=t.self.onExit;return t.self.onExit=function(){P.stateExiting(t,N,e)},J.addRestoreFunction(function(){t.self.onExit=e}),t}var S=a.debugMode();j.locals||(j.locals=k.locals);var b=F.length;w&&(w(),S&&n.debug("Restored paths from pending transition"));var E,O,A,T,_=r.$current,I=r.params,C=v&&v.relative||r.$current,M=r.get(e,C),D=[],N=[];c=c||{},arguments[1]=c;var q=function(){},J=function(){E&&(K.path=E,E=null),O&&(_.path=O,O=null),t.forEach(J.restoreFunctions,function(t){t()}),J=q,w=null,F.splice(b,1)};if(J.restoreFunctions=[],J.addRestoreFunction=function(t){this.restoreFunctions.push(t)},M){var K=f[M.name];if(K){E=K.path,O=_.path;var z=v&&v.reload||!1,U=z&&(z===!0?E[0].self:r.get(z,C));v&&z&&z!==!0&&delete v.reload;var B={toState:K,toParams:c||{},fromState:_,fromParams:I||{},options:v,reloadStateTree:U};if(F.push(B),w=J,U){B.toParams.$$uirouterextrasreload=Math.random();var H=U.$$state().params,V=U.$$state().ownParams;if(R.hasParamSet){var W=new o.Param("$$uirouterextrasreload");H.$$uirouterextrasreload=V.$$uirouterextrasreload=W,J.restoreFunctions.push(function(){delete H.$$uirouterextrasreload,delete V.$$uirouterextrasreload})}else H.push("$$uirouterextrasreload"),V.push("$$uirouterextrasreload"),J.restoreFunctions.push(function(){H.length=H.length-1,V.length=V.length-1})}A=P.processTransition(B),S&&u(n,B,A);var L=K.path.slice(0,A.keep),Y=_.path.slice(0,A.keep);t.forEach(j.locals,function(t,e){-1!=e.indexOf("@")&&delete j.locals[e]});for(var G=0;G<A.inactives.length;G++){var Q=A.inactives[G].locals;t.forEach(Q,function(t,e){Q.hasOwnProperty(e)&&-1!=e.indexOf("@")&&(j.locals[e]=t)})}if(t.forEach(A.enter,function(t,e){var r,n=K.path[e];"reactivate"===t?(r=d(n),L.push(r),Y.push(r),D.push(h(n)),T=n):"updateStateParams"===t?(r=x(n),L.push(r),T=n):"enter"===t&&L.push($(n))}),t.forEach(A.exit,function(t,e){var r=_.path[e];"inactivate"===t?(Y.push(g(r)),N.push(r)):"exit"===t&&(Y.push(y(r)),N.push(r))}),D.length&&t.forEach(D,function(t){L.push(t)}),K===T){var X=T.self.name+".",Z=P.getInactiveStates(),tt=[];Z.forEach(function(t){0===t.self.name.indexOf(X)&&tt.push(t)}),tt.sort(),tt.reverse(),Y=Y.concat(p(tt,function(t){return y(t)})),N=N.concat(tt)}K.path=L,_.path=Y;var et=function(t){return(t.surrogateType?t.surrogateType+":":"")+t.self.name};S&&n.debug("SurrogateFromPath: ",p(Y,et)),S&&n.debug("SurrogateToPath:   ",p(L,et))}}var rt=m.apply(r,arguments);return rt.then(function(t){return J(),S&&s(n,f[t.name],r),t.status="active",t},function(t){return J(),S&&"transition prevented"!==t.message&&"transition aborted"!==t.message&&"transition superseded"!==t.message&&(n.debug("transition failed",t),console.log(t.stack)),i.reject(t)})},r}])}]),function(t,e){function r(e,r,n,a){function o(e,r){var n=t.isObject(e)?e.name:e;return r?p[n]:l[n]}function i(t,e){if(e.name){var r=e.name.split(/\./);for("."===e.name.charAt(0)&&(r[0]=t.current.name);r.length;){var n=r.join(".");if(t.get(n,{relative:t.current}))return null;if(p[n])return p[n];r.pop()}}if(e.url){var a=[];for(var o in p){var i=p[o].urlMatcher;i&&i.exec(e.url)&&a.push(p[o])}for(var u=a.slice(0),s=a.length-1;s>=0;s--)for(var c=0;c<u.length;c++)a[s]===u[c].parentFutureState&&a.splice(s,1);return a[0]}}function u(t,e){d=!0;var r=t.get("$q");if(!e){var n=r.defer();return n.reject("No lazyState passed in "+e),n.promise}var a=r.when([]),o=e.parentFutureState;o&&p[o.name]&&(a=u(t,p[o.name]));var i=e.type,s=v[i];if(!s)throw Error("No state factory for futureState.type: "+(e&&e.type));return a.then(function(r){var n=t.invoke(s,s,{futureState:e});return n.then(function(t){return t&&r.push(t),r})})["finally"](function(){delete p[e.name]})}function s(t,r){var n=!1,a=["$rootScope","$urlRouter","$state",function(a,o,s){function f(){n=!0,o.sync(),n=!1}if(!h)return c().then(f),void(h=!0);var l=i(s,{url:r.path()});return l?void u(t,l).then(function(t){t.forEach(function(t){t&&(!s.get(t)||t.name&&!s.get(t.name))&&e.state(t)}),d=!1,f()},function(){d=!1,f()}):t.invoke($)}];if(!d){var o=n?$:a;return t.invoke(o)}}var c,f=a,l=f.internalStates,v={},p={},d=!1,m=[],h=!1,g=this;this.addResolve=function(t){m.push(t)},this.stateFactory=function(t,e){v[t]=e},this.futureState=function(e){e.stateName&&(e.name=e.stateName),e.urlPrefix&&(e.url="^"+e.urlPrefix),p[e.name]=e;var r,a=e.name.split(/\./).slice(0,-1).join("."),i=o(e.parent||a);if(i)r=i.url||i.navigable.url;else if(""===a)r=n.compile("");else{var u=o(e.parent||a,!0);if(!u)throw new Error("Couldn't determine parent state of future state. FutureState:"+t.toJson(e));var s=u.urlMatcher.source.replace(/\*rest$/,"");r=n.compile(s),e.parentFutureState=u}e.url&&(e.urlMatcher="^"===e.url.charAt(0)?n.compile(e.url.substring(1)+"*rest"):r.concat(e.url+"*rest"))},this.get=function(){return t.extend({},p)};var $=["$log","$location",function(t,e){t.debug("Unable to map "+e.path())}];r.otherwise(s),r.otherwise=function(e){if(t.isString(e)){var n=e;e=function(){return n}}else if(!t.isFunction(e))throw new Error("'rule' must be a function");return $=["$injector","$location",e],r};var x={getResolvePromise:function(){return c()}};this.$get=["$injector","$state","$q","$rootScope","$urlRouter","$timeout","$log",function(r,n,a,o,s,f,l){function v(){if(o.$on("$stateNotFound",function(t,a,o,s){if(!d){l.debug("event, unfoundState, fromState, fromParams",t,a,o,s);var c=i(n,{name:a.to});if(c){t.preventDefault();var f=u(r,c);f.then(function(t){t.forEach(function(t){t&&(!n.get(t)||t.name&&!n.get(t.name))&&e.state(t)}),n.go(a.to,a.toParams),d=!1},function(t){console.log("failed to lazy load state ",t),n.go(o,s),d=!1})}}}),!c){var v=[];t.forEach(m,function(t){v.push(r.invoke(t))}),c=function(){return a.all(v)}}c().then(function(){f(function(){n.transition?n.transition.then(s.sync,s.sync):s.sync()})})}return v(),x.state=e.state,x.futureState=g.futureState,x.get=g.get,x}]}var n=t.module("ct.ui.router.extras.future",["ct.ui.router.extras.core"]);r.$inject=["$stateProvider","$urlRouterProvider","$urlMatcherFactoryProvider","uirextras_coreProvider"],n.provider("$futureState",r);var a={state:function(t){a.$rootScope&&a.$rootScope.$broadcast("$stateAdded",t)},itsNowRuntimeOhWhatAHappyDay:function(t){a.$rootScope=t},$rootScope:e};n.config(["$stateProvider",function(e){var r=e.state;e.state=function(){var n=r.apply(e,arguments),o=t.isObject(arguments[0])?arguments[0]:arguments[1];return a.state(o),n}}]),n.run(["$futureState",function(t,e){a.itsNowRuntimeOhWhatAHappyDay(e)}])}(t),t.module("ct.ui.router.extras.previous",["ct.ui.router.extras.core","ct.ui.router.extras.transition"]).service("$previousState",["$rootScope","$state",function(t,r){var n=null,a=null,o={};t.$on("$transitionStart",function(t,e){function r(){a=null}function o(){n=a}var i=e.from,u=i.state&&i.state.$$state&&i.state.$$state();u&&u.navigable&&(a=n,n=e.from),e.promise.then(r)["catch"](o)});var i={get:function(t){return t?o[t]:n},go:function(t,e){var n=i.get(t);return r.go(n.state,n.params,e)},memo:function(t,e,a){o[t]=n||{state:r.get(e),params:a}},forget:function(t){t?delete o[t]:n=e}};return i}]),t.module("ct.ui.router.extras.previous").run(["$previousState",function(t){}]),t.module("ct.ui.router.extras.transition",["ct.ui.router.extras.core"]).config(["$provide",function(e){e.decorator("$state",["$delegate","$rootScope","$q","$injector",function(e,r,n,a){function o(e){var r=a.invoke,n=a.instantiate;return a.invoke=function(n,a,o){return r(n,a,t.extend({$transition$:e},o))},a.instantiate=function(r,a){return n(r,t.extend({$transition$:e},a))},function(){a.invoke=r,a.instantiate=n}}function i(){v.pop()(),l.pop(),f--}function u(t,e){return function(n){return i(),r.$broadcast("$transitionSuccess",e),t.resolve(n),n}}function s(t,e){return function(a){return i(),r.$broadcast("$transitionError",e,a),t.reject(a),n.reject(a)}}var c=e.transitionTo,f=-1,l=[],v=[];return e.transitionTo=function(t,r,a){var o=n.defer(),i=l[++f]={promise:o.promise};v[f]=function(){};var p=c.apply(e,arguments);return p.then(u(o,i),s(o,i))},r.$on("$stateChangeStart",function(e,n,a,i,u){var s=f,c=t.extend(l[s],{to:{state:n,params:a},from:{state:i,params:u}}),p=o(c);v[s]=p,r.$broadcast("$transitionStart",c)}),e}])}]),function(){function e(e,r,n){return{scope:{width:"@",height:"@"},restrict:"AE",template:"<svg></svg>",link:function(r,a,o){function i(e){e=e.map(function(e){return""===e.name?v:t.copy(e)}),t.extend(s,e.reduce(function(t,e){return t[e.name]=e,t},{})),e.forEach(function(t){var e=t.name.split(/\./).slice(0,-1).join("."),r=t.name!=e&&s[e];r&&((r.children||(r.children=[])).push(t),t.px=r.px,t.py=r.py,p.push(t))})}function u(){function t(t){var e=t.name.split(".").pop();return t.sticky&&(e+=" (STICKY)"),t.deepStateRedirect&&(e+=" (DSR)"),e}g=g.data(l.nodes(v),function(t){return t.name}),$=$.data(l.links(p),function(t){return t.target.name}),x=x.data(d),p.forEach(function(t){t.y=70*t.depth});var e=g.enter();x.enter().append("circle").attr("class","active").attr("r",13).attr("cx",function(t){return t.parent.px||100}).attr("cy",function(t){return t.parent.py||100}),e.append("circle").attr("class","node").attr("r",9).attr("cx",function(t){return t.parent.px}).attr("cy",function(t){return t.parent.py}),e.append("text").attr("class","label").attr("x",function(t){return t.parent.px}).attr("y",function(t){return t.parent.py}).attr("text-anchor",function(t){return"middle"}).text(t).style("fill-opacity",1),$.enter().insert("path",".node").attr("class","link").attr("d",function(t){var e={x:t.source.px,y:t.source.py};return m({source:e,target:e})});var r=h.transition().duration(S);r.selectAll(".link").attr("d",m);var n={entered:"#AF0",exited:"#777",active:"#0f0",inactive:"#55F",future:"#009"};r.selectAll(".node").attr("cx",function(t){return t.px=t.x}).attr("cy",function(t){return t.py=t.y}).attr("r",function(t){return"active"===t.status?15:10}).style("fill",function(t){return n[t.status]||"#FFF"}),r.selectAll(".label").attr("x",function(t){return t.px=t.x}).attr("y",function(t){return t.py=t.y-15}).attr("transform",function(t){return"rotate(-25 "+t.x+" "+t.y+")"}),r.selectAll(".active").attr("x",function(t){return t.px=t.x}).attr("y",function(t){return t.py=t.y-15})}var s={},c=r.width||400,f=r.height||400,l=d3.layout.tree().size([c-20,f-20]).separation(function(t,e){return t.parent==e.parent?10:25}),v=e.get().filter(function(t){return""===t.name})[0],p=l(v);v.parent=v,v.px=v.x=c/2,v.py=v.y=f/2;var d={};d.px=d.x=v.px,d.py=d.y=v.py;{var m=d3.svg.diagonal(),h=d3.select(a.find("svg")[0]).attr("width",c).attr("height",f).append("g").attr("transform","translate(10, 10)"),g=h.selectAll(".node"),$=h.selectAll(".link"),x=h.selectAll(".active"),y=200,S=200;setInterval(u,y)}n(function(){r.states=e.get(),t.forEach(p,function(t){var r=e.get(t.name);r&&(t.status=r.status||"exited")})},250),r.$watchCollection("states",function(t,e){var r=(e||[]).map(function(t){return t.name});i((t||[]).filter(function(t){return-1==r.indexOf(t.name)}))}),u(y)}}}var r=t.module("ct.ui.router.extras.statevis",["ct.ui.router.extras.core","ct.ui.router.extras.sticky"]);r.directive("stateVis",["$state","$timeout","$interval",e])}(),t.module("ct.ui.router.extras",["ct.ui.router.extras.core","ct.ui.router.extras.dsr","ct.ui.router.extras.future","ct.ui.router.extras.previous","ct.ui.router.extras.statevis","ct.ui.router.extras.sticky","ct.ui.router.extras.transition"])}(angular);