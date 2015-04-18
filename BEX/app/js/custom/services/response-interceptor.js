/**=========================================================
 * module: response-interceptor.js
 * servizio per effettuare dei check sulle risposte alle richieste http
 =========================================================*/

'use strict';

myApp
    .factory('ResponseInterceptorService', function($q, $injector) {


        return {
            responseError: function(rejection) {
                if (rejection.status === 0) {
                    console.log("server non contattabile")
                }
                return $q.reject(rejection);
            }


        }

    })
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('ResponseInterceptorService');

    })
