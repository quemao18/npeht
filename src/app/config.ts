'use strict';
export var app='NPEHT';
export var version: string="2.0";
//export var apiUrl='http://localhost:8080/npeht_api/api';
//export var apiUrl='http://144.217.255.53/npeht_api/api';
export var nameKeyApi='X-API-KEY';
export var keyApi='LCiAE8C30IQIuG8s27gtU0b6eZ7hlXzSKBcqFaes';
export var apiError='No hay respuesta del servidor. Intente nuevamente.';
export var pagination = 10; //max items por grupo
export var start = 0; //start para limit del api
export var limit = 60; //limite consulta api

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    apiUrl='http://localhost:8080/npeht_api/api';
else
    apiUrl='https://api.npeht.com/api';

export var apiUrl;