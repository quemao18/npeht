'use strict';
export var app='NPEHT';
export var version: string="2.0";
//export var apiUrl='http://localhost:8080/npeht_api/api';
//export var apiUrl='http://144.217.255.53/npeht_api/api';
export var nameKeyApi='X-API-KEY';
export var keyApi='LCiAE8C30IQIuG8s27gtU0b6eZ7hlXzSKBcqFaes';
export var apiError='No hay respuesta del servidor. Intente nuevamente.';
export var pagination = 20; //max items por grupo

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    apiUrl='http://localhost:8080/npeht_api/api';
else
    apiUrl='http://144.217.255.53/npeht_api/api';

export var apiUrl;