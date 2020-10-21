import * as THREE from 'three';
import {Point, Box} from './octree.js';
import {createOctree, rand, q, octree, scene} from './main.js';

window.create = function(){ // creamos octree
    var m = document.getElementById("M").value;
    var n = document.getElementById("N1").value;
    createOctree(m, n);
}



window.insert = function() { // funcion para insertar en el octree
    var px = document.getElementById("X").value;
    var py = document.getElementById("Y").value;
    var pz = document.getElementById("Z").value;
    let point = new Point(px, py, pz);
    octree.insert(point);
}

window.query = function(){ // funcion para consultar en el octree
    dquery();
    var cx = document.getElementById("CX").value; // eje x
    var cy = document.getElementById("CY").value; // eje y
    var cz = document.getElementById("CZ").value; // eje z
    var cw = document.getElementById("CW").value; // ancho
    var ch = document.getElementById("CH").value; // altura
    var cd = document.getElementById("CD").value; // profundidad
    let box = new Box(cx, cy, cz, cw, ch, cd);
    let found = [];
    octree.query(box, found);
    document.getElementById("found").innerHTML = "Found points : " + found.length; // cantidad de
}                                                                                   // puntos encontrados

window.squery = function(){ // funcion para mostrar la consulta
    dquery();
    var cx = document.getElementById("CX").value;
    var cy = document.getElementById("CY").value;
    var cz = document.getElementById("CZ").value;
    var cw = document.getElementById("CW").value;
    var ch = document.getElementById("CH").value;
    var cd = document.getElementById("CD").value;
    var geometry = new THREE.BoxGeometry(cw * 2, ch * 2, cd * 2); // crea un cubo que encierre la zona de consulta
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: alpha, transparent: false, });
    material.color.set(this.color);
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(cx, cy, cz);
    q = cube;
    scene.add(q); // se dibuja la region consultada en escena
}

window.dquery = function(){ // funcion para eliminar la consulat
    var cx = document.getElementById("CX").value;
    var cy = document.getElementById("CY").value;
    var cz = document.getElementById("CZ").value;
    var cw = document.getElementById("CW").value;
    var ch = document.getElementById("CH").value;
    var cd = document.getElementById("CD").value;
    let box = new Box(cx, cy, cz, cw, ch, cd);
    octree.cleanQuery(box);
    scene.remove(q); // se elimina el showquery
    q = null;
}

window.nrand = function(){ // funcion que coloca las n esferas en posiciones random dentro del rango de la dimension
    var nr = document.getElementById("N2").value; // del cubo
    var m = document.getElementById("M").value;
    rand(nr, m);
}

window.clean = function(){ // elimina toda la estructura y dibuja nuevamente una escena y ejes
    scene = new THREE.Scene();
    scene.add(axisHelper);
}
