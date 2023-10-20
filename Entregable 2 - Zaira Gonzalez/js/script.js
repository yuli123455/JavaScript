let notas = [
    { nota: 'Ingresa la nota de Programación', valorNota: 0 },
    { nota: 'Ingresa la nota de Lógica Matemática', valorNota: 0 },
    { nota: 'Ingresa la nota de Bases de Datos', valorNota: 0 },
    { nota: 'Ingresa la nota de Hardware', valorNota: 0 },
    { nota: 'Ingresa la nota de Física', valorNota: 0 }
	];

	let currentNota = 0;

function mostrarMateria() {
    const materiaDiv = document.getElementById('materia');
    materiaDiv.innerText = notas[currentNota].nota;
    
    const notaInput = document.getElementById('notaInput');
    notaInput.value = '';
    notaInput.classList.remove('hidden');

    const registroNotaBtn = document.getElementById('registroNotaBtn');
    registroNotaBtn.classList.remove('hidden');

   
}
function registrarNota() {
    if(!document.getElementById('notaInput').value){
        alert("Debes ingresar una nota")
        return;
    }
    const notaRegistrada = document.getElementById('notaInput').value;

    if(notaRegistrada > 5 || notaRegistrada < 0){
        alert("La nota debe estar entre 0.0 y 5.0")
        return;
    }
    notas[currentNota].valorNota = +notaRegistrada;
	currentNota++;
   
    if (currentNota < notas.length) {
        mostrarMateria();
    } 
    else{
        document.getElementById('listarBtn').classList.remove('hidden');
        document.getElementById('promedioBtn').classList.remove('hidden');
        document.getElementById('notaAltaBtn').classList.remove('hidden');
        document.getElementById('aplazosBtn').classList.remove('hidden');
        document.getElementById('notaInput').classList.add('hidden');
		document.getElementById('registroNotaBtn').classList.add('hidden');
		document.getElementById('materia').classList.add('hidden');
    }
}
document.getElementById('registroNotaBtn').addEventListener('click', registrarNota);
mostrarMateria();


function listar(){
	
    let ul= document.createElement("ul");
    for(let nota of notas){
        
        let li = document.createElement("li");
        let liTexto = document.createTextNode(nota.valorNota);
        li.appendChild(liTexto);
        ul.appendChild(li);
    }
    document.body.appendChild(ul);
}
		
function promedio(){
    let promedio = notas.reduce((prev, nota) => prev + nota.valorNota, 0)/ notas.length;
    var newDiv = document.createElement("div");
    var newContent = document.createTextNode(promedio);
    newDiv.appendChild(newContent); 
    document.body.appendChild(newDiv);
}
		
function notaAlta(){
    let valor = Math.max(...notas.map(x=>parseInt(x.valorNota)));
    let newDivM = document.createElement("div");
    let newContentM = document.createTextNode(valor);
    newDivM.appendChild(newContentM);
    document.body.appendChild(newDivM);
}

function aplazos(){
    let min = Math.min(...notas.map(x=>parseInt(x.valorNota)));
    if (min < 3) {
        alert("El estudiente aplazó");
    }
    else{
        alert("El estudiente no aplazó");
    }
}

        