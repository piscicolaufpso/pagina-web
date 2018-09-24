var obj, eventos,sensores,peceras,usuarios,peces,listaPeces, datosActualesPeceras;
var cambio=true;
function verMenu(){
    if(cambio){
      $('#iconoMenu').removeClass('fa-times');
      $('#iconoMenu').addClass('fa-bars');
      
	}else{
	  $('#iconoMenu').removeClass('fa-bars');
	  $('#iconoMenu').addClass('fa-times');
	  
	}
	cambio = !cambio;
}
var cambioIcono=true;
function verClave(){
	if(cambioIcono){
		$('#icono').removeClass('fa-eye');
	    $('#icono').addClass('fa-eye-slash');
	    $('#contrasena-usuario').attr('type','text');               
	}else{
	    $('#icono').removeClass('fa-eye-slash');
	    $('#icono').addClass('fa-eye');
	    $('#contrasena-usuario').attr('type','password');
	}
	cambioIcono = !cambioIcono;
}
/*cambiar pagina*/
function cambiar(url){
	switch(url) {
	    case "usuario":
	    	$("#contenedor").load("vista/usuario.jsp");
	    	$("#calendario").text("");
	        break;
	    case "datosActuales":
	    	$("#contenedor").load("vista/datosActuales.jsp");
	    	$("#calendario").text("");
	    	datosActuales();
	        break;
	    case "calendario":
	    	$("#contenedor").load("vista/calendario.jsp");
	    	calendario();
	        break;
	    case "estadisticas":
	    	$("#contenedor").load("vista/estadisticas.jsp");
	    	$("#calendario").text("");
	    	estadisticas();
	        break;
	    case "tablas":
	    	$("#contenedor").load("vista/tablas.jsp");
	    	$("#calendario").text("");
	        break;
	    case "agregarUsuario":
	    	$("#contenedor").load("vista/agregarUsuarios.jsp");
	    	$("#calendario").text("");
	    	agregarUsuario();
	        break;
	    case "pecera":
	    	$("#contenedor").load("vista/pecera.jsp");
	    	$("#calendario").text("");
	    	pagPecera();
	        break;
	    case "sensor":
	    	$("#contenedor").load("vista/sensor.jsp");
	    	$("#calendario").text("");
	    	pagSensor();
	        break;
	    case "peces":
	    	$("#contenedor").load("vista/pescado.jsp");
	    	$("#calendario").text("");
	    	pagPez();
	        break;
	    case "evento":
	    	$("#contenedor").load("vista/evento.jsp");
	    	$("#calendario").text("");
	    	pagEvento();
	        break;
	    case "opciones":
	    	$("#contenedor").load("vista/opciones.jsp");
	    	$("#calendario").text("");
	        break;
	}
}

function mostrarTooltip(){
	$('[data-toggle="tooltip"]').tooltip();
}
function salir(){
	$('#formularioSalir').submit();
}
/*funciones de la pagina usuario*/
function actualizarUsuario(event){
	event.preventDefault();
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#nombre-usuario").val() == "" || $("#apellido-usuario").val() == "" || $("#fecha-usuario").val() == "" || $("#documento-usuario").val() == "" || $("#contrasena-usuario").val() == "" || $("#correo-usuario").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		ver();
		$.post("usuariosActualizar?id="+$("#id-usuario").val()+"&nombre="+$("#nombre-usuario").val()+"&apellido="+$("#apellido-usuario").val()+"&genero="+$('input:radio[name=genero]:checked').val()+"&fecha="+$("#fecha-usuario").val()+"&documento="+$("#documento-usuario").val()+"&contrasena="+$("#contrasena-usuario").val()+"&correo="+$("#correo-usuario").val(), 
				function(responseText) {
		    if("1" == responseText){
		    	cambiar("usuario");
				alertify.success('Datos actualizados');
				alertify.set('notifier','delay', delay);	
		    }else{
		    	cambiar("usuario");
				alertify.error('Nombres o numeros demasiado grandes');
				alertify.set('notifier','delay', delay);
		    }
		    noVer();
		});
		
	}
}
/*QUITARLO CUANDO ACABE*/
/*Funcion de prueba quitarlo*/
function desdeConsola(contenido){
	ver();
	$.post("opciones?", 
			function(responseText) {
		console.log(responseText);
		obj = jQuery.parseJSON(responseText);
		noVer();
	});
}
/*funciones para la pagina datos actuales*/
function datosActuales(contenido){
	var boolean = false;
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 15);
	ver();
	$.post("actuales?", 
			function(responseText) {
		if(responseText==0){
			alertify.error('Problemas de conexión recargue la página');
			alertify.set('notifier','delay', delay);
		}else{
			var patron = /,1-2-3/gi,
			nuevoValor = "",
			str = responseText.replace(patron,nuevoValor);			
			datosActualesPeceras = jQuery.parseJSON(str); 
			$("#infoPeceras").text("");
			for(var i=0;i<datosActualesPeceras.length;i++){
				$("#infoPeceras").append("<div id=\"pecera"+i+"\" class=\"card border-success mb-3\" style=\"max-width: 18rem;\"><div class=\"card-header\">"+datosActualesPeceras[i].nombre+"</div></div>");
				for(var j=0;j<datosActualesPeceras[i].datos.length;j++){
					if(datosActualesPeceras[i].datos[j].incidencia=="NO"){
						$("#pecera"+i).append("<div class=\"card-body text-success\"><h5 class=\"card-title\">"+datosActualesPeceras[i].datos[j].nombreSensor+"</h5><h1 class=\"card-text text-center\">"+datosActualesPeceras[i].datos[j].valor+"</h1><h6 class=\"card-text text-center text-dark\">"+datosActualesPeceras[i].datos[j].fecha+" &nbsp "+datosActualesPeceras[i].datos[j].hora+"</h6></div>");
					}else{
						boolean = true;
						$("#pecera"+i).append("<div class=\"card-body text-danger\"><h5 class=\"card-title\">"+datosActualesPeceras[i].datos[j].nombreSensor+"</h5><h1 class=\"card-text text-center\">"+datosActualesPeceras[i].datos[j].valor+"</h1><h6 class=\"card-text text-center text-dark\">"+datosActualesPeceras[i].datos[j].fecha+" &nbsp "+datosActualesPeceras[i].datos[j].hora+"</h6></div>");
					}
				}
				if(boolean){
					$('#pecera'+i).removeClass('border-success');
				    $('#pecera'+i).addClass('border-danger');
					boolean = false;
				}
			}
			var separadorTiempo = "-", separadorDia = ":";
			var fechaTiempo = datosActualesPeceras[0].datos[0].fecha.split(separadorTiempo);
			var fechaDia = datosActualesPeceras[0].datos[0].hora.split(separadorDia);
			var fechaHoy = new Date();
			var fechaExtraida = new Date(fechaTiempo[0],fechaTiempo[1],fechaTiempo[2],fechaDia[0],fechaDia[1],fechaDia[2]);
			if(((fechaHoy - fechaExtraida)/(1000*60)) > 30){
				alertify.error('Datos desactualizados');
				alertify.set('notifier','delay', delay);
			}
		}
		noVer();
	});
}
/*funciones para la pagina agregar usuarios*/
function agregarUsuario(){
	ver();
	$.post("agregarUsuarios?opcion=1", 
			function(responseText) {
		var patron = /,123/gi,
		nuevoValor = "",
		str = responseText.replace(patron,nuevoValor);
		usuarios = jQuery.parseJSON(str);
		iniciarUsuarios();
		noVer();
	});
}
function iniciarUsuarios(){
	$("#usuarios").text('');
	for(let i=0;i<usuarios.length;i++){
		if(usuarios[i].activo=="SI"){
			$("#usuarios").append('<tr><th id="nombre'+i+'" scope="row">'+usuarios[i].nombre+' '+usuarios[i].apellido+'</th><td id="correo'+i+'">'+usuarios[i].correo+'</td><td><div class="input-group activo"><div class="input-group-prepend"><div class="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Editar" onmouseover="mostrarTooltip()" onclick="actualizarUsuarios('+i+')"><span class="fa fa-pencil"></span></div><div class="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Estado" onmouseover="mostrarTooltip()" onclick="cambiarActivoUsuario('+i+')"><span id="activo'+i+'" class="fa fa-toggle-on"></span></div></div></div></td></tr>');
		}else{
			$("#usuarios").append('<tr><th id="nombre'+i+'" scope="row">'+usuarios[i].nombre+' '+usuarios[i].apellido+'</th><td id="correo'+i+'">'+usuarios[i].correo+'</td><td><div class="input-group activo"><div class="input-group-prepend"><div class="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Editar" onmouseover="mostrarTooltip()" onclick="actualizarUsuarios('+i+')"><span class="fa fa-pencil"></span></div><div class="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Estado" onmouseover="mostrarTooltip()" onclick="cambiarActivoUsuario('+i+')"><span id="activo'+i+'" class="fa fa-toggle-off"></span></div></div></div></td></tr>');
		}		
	}
}
function actualizarUsuarios(pos){
	$("#pos-usuario").val(pos);
	$("#nombre-usuario").val(usuarios[pos].nombre);
	$("#apellido-usuario").val(usuarios[pos].apellido);
	$("#fecha-usuario").val(usuarios[pos].fechaNacimiento);
	if(usuarios[pos].genero=="M"){
		$("#mujer-usuario").prop('checked', false);
		$("#hombre-usuario").prop('checked', true);
	}else{
		$("#hombre-usuario").prop('checked', false);
		$("#mujer-usuario").prop('checked', true);
	}
	
	$("#contrasena-usuario").val(usuarios[pos].clave);
	$("#correo-usuario").val(usuarios[pos].correo);
	$("#documento-usuario").val(usuarios[pos].documento);
	$("#actualizar-usuario").modal("show");
}
function agregarUsuarios(){
	$("#agregar-usuario").modal("show");
}
function editarUsuario(){
	var pos = $("#pos-usuario").val();
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#nombre-usuario").val() == "" || $("#apellido-usuario").val() == "" || $("#fecha-usuario").val() == "" || $("#documento-usuario").val() == "" || $("#contrasena-usuario").val() == "" || $("#correo-usuario").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("agregarUsuarios?opcion=3&id="+usuarios[pos].id+"&nombre="+$("#nombre-usuario").val()+"&apellido="+$("#apellido-usuario").val()+"&genero="+$('input:radio[name=genero]:checked').val()+"&fecha="+$("#fecha-usuario").val()+"&documento="+$("#documento-usuario").val()+"&contrasena="+$("#contrasena-usuario").val()+"&correo="+$("#correo-usuario").val(), 
				function(responseText) {
		    if("1" == responseText){
		    	usuarios[pos].nombre = $("#nombre-usuario").val().toUpperCase();
		    	usuarios[pos].apellido = $("#apellido-usuario").val().toUpperCase();
		    	usuarios[pos].genero = $('input:radio[name=genero]:checked').val();
		    	usuarios[pos].clave = $("#contrasena-usuario").val();
		    	usuarios[pos].fechaNacimiento = $("#fecha-usuario").val();
		    	usuarios[pos].correo = $("#correo-usuario").val();
		    	usuarios[pos].documento = $("#documento-usuario").val();
		    	$("#nombre"+pos).text(usuarios[pos].nombre+" "+usuarios[pos].apellido);
		    	$("#correo"+pos).text(usuarios[pos].correo);
				alertify.success('Datos actualizados');
				alertify.set('notifier','delay', delay);
				$("#actualizar-usuario").modal("hide");
		    }else{
				alertify.error('Problemas de conexion');
				alertify.set('notifier','delay', delay);
		    }
		});
	}
}
function crearUsuario(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#nombre-usuario-nuevo").val() == "" || $("#apellido-usuario-nuevo").val() == "" || $("#fecha-usuario-nuevo").val() == "" || $("#documento-usuario-nuevo").val() == "" || $("#contrasena-usuario-nuevo").val() == "" || $("#correo-usuario-nuevo").val() == "" || !$('input:radio[name=genero-nuevo]:checked').is(':checked')){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("agregarUsuarios?opcion=4&nombre="+$("#nombre-usuario-nuevo").val()+"&apellido="+$("#apellido-usuario-nuevo").val()+"&genero="+$('input:radio[name=genero-nuevo]:checked').val()+"&fecha="+$("#fecha-usuario-nuevo").val()+"&documento="+$("#documento-usuario-nuevo").val()+"&contrasena="+$("#contrasena-usuario-nuevo").val()+"&correo="+$("#correo-usuario-nuevo").val()+"&idPerfil="+usuarios[0].idPerfil, 
				function(responseText) {
			if("1"==responseText){
				alertify.success('Usuario creado');
				alertify.set('notifier','delay', delay);
				agregarUsuario();
				$("#agregar-usuario").modal("hide");
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
}
function cambiarActivoUsuario(pos){
	var act, delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if(usuarios[pos].activo=="SI"){
		act = "NO";
	}else{
		act = "SI";
	}
	$.post("agregarUsuarios?opcion=2&activo="+act+"&idPersona="+usuarios[pos].id+"&idPerfil="+usuarios[pos].idPerfil+"&idpp="+usuarios[pos].idpp+"", 
			function(responseText) {
		if("1"==responseText){
			alertify.success('usuario actualizado');
			alertify.set('notifier','delay', delay);
			if(act=="SI"){
				usuarios[pos].activo="SI";
				$("#activo"+pos).removeClass('fa-toggle-off');
				$("#activo"+pos).addClass('fa-toggle-on');
			}else{
				usuarios[pos].activo="NO";
				$("#activo"+pos).removeClass('fa-toggle-on');
				$("#activo"+pos).addClass('fa-toggle-off');
			}
			
		}else{
			alertify.error('problemas de conexión');
			alertify.set('notifier','delay', delay);
		}
	});
}
/*funciones para la pagina sensores*/
function pagSensor(){
	ver();
	$.post("sensores?opcion=1", 
			function(responseText) {
		sensores = jQuery.parseJSON(responseText);
		iniciarSensor();
		noVer();
	});
}
function iniciarSensor(){
	let con = true;
	$("#select-sensor").text('');
	for(let i=0;i<sensores.length;i++){
		if(con){
			$("#select-sensor").append('<option id='+i+' value="'+i+'" select>'+sensores[i].nombre+'</option>');
			con = false;
		}else{
			$("#select-sensor").append('<option id='+i+' value="'+i+'" >'+sensores[i].nombre+'</option>');
		}
	}
	$("#nombre-sensor").val(sensores[0].nombre);
	$("#valor-minimo-estadistica").val(sensores[0].minimo);
	$("#valor-maximo-estadistica").val(sensores[0].maximo);
	$("#text-area-sensor").val(sensores[0].descripcion);
	if(sensores[0].activo=="SI"){
		$("#activo-sensor").removeClass('fa-toggle-off');
		$("#activo-sensor").addClass('fa-toggle-on');
	}
	
}
function cambiarSensor(posicion){
	$("#nombre-sensor").val(sensores[posicion].nombre);
	$("#text-area-sensor").val(sensores[posicion].descripcion);
	$("#valor-minimo-estadistica").val(sensores[posicion].minimo);
	$("#valor-maximo-estadistica").val(sensores[posicion].maximo);
	if(sensores[posicion].activo=="NO"){
		$("#activo-sensor").removeClass('fa-toggle-on');
		$("#activo-sensor").addClass('fa-toggle-off');
	}else{
		$("#activo-sensor").removeClass('fa-toggle-off');
		$("#activo-sensor").addClass('fa-toggle-on');
	}
}
function cambiarActivoSensor(){
	let pos = $("#select-sensor").val();
	var act, delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if(sensores[pos].activo=="SI"){
		act = "NO";
	}else{
		act = "SI";
	}
	
	$.post("sensores?opcion=2&activo="+act+"&id="+sensores[pos].id+"&nombre="+sensores[pos].nombre+"&descripcion="+sensores[pos].descripcion+"&minimo="+sensores[pos].minimo+"&maximo="+sensores[pos].maximo+"", 
			function(responseText) {
		if("1"==responseText){
			alertify.success('sensor actualizado');
			alertify.set('notifier','delay', delay);
			if(act=="SI"){
				sensores[pos].activo="SI";
				$("#activo-sensor").removeClass('fa-toggle-off');
				$("#activo-sensor").addClass('fa-toggle-on');
			}else{
				sensores[pos].activo="NO";
				$("#activo-sensor").removeClass('fa-toggle-on');
				$("#activo-sensor").addClass('fa-toggle-off');
			}
			
		}else{
			alertify.error('problemas de conexión');
			alertify.set('notifier','delay', delay);
		}
	});
}
function actualizarSensor(){
	let pos = $("#select-sensor").val();
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#nombre-sensor").val() == "" || $("#text-area-sensor").val() == "" || $("#valor-maximo-estadistica").val() == "" || $("#valor-minimo-estadistica").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("sensores?opcion=2&activo="+sensores[pos].activo+"&id="+sensores[pos].id+"&nombre="+$("#nombre-sensor").val()+"&descripcion="+$("#text-area-sensor").val()+"&minimo="+$("#valor-minimo-estadistica").val()+"&maximo="+$("#valor-maximo-estadistica").val()+"", 
				function(responseText) {
			if("1"==responseText){
				alertify.success('Sensor actualizado');
				alertify.set('notifier','delay', delay);
				$("#"+pos+"").text($("#nombre-sensor").val());
				sensores[pos].nombre = $("#nombre-sensor").val();
				sensores[pos].descripcion = $("#text-area-sensor").val();
				sensores[pos].minimo = $("#valor-minimo-estadistica").val();
				sensores[pos].maximo = $("#valor-maximo-estadistica").val();
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
}
function agregarNuevoSensor(){
	$("#agregar-sensor").modal("show");
}
function guardarSensor(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#nombre-sensor-nuevo").val() == "" || $("#text-area-sensor-nuevo").val() == "" || $("#valor-maximo-estadistica-nuevo").val() == "" || $("#valor-minimo-estadistica-nuevo").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("sensores?opcion=3&nombre="+$("#nombre-sensor-nuevo").val()+"&descripcion="+$("#text-area-sensor-nuevo").val()+"&minimo="+$("#valor-minimo-estadistica-nuevo").val()+"&maximo="+$("#valor-maximo-estadistica-nuevo").val()+"", 
				function(responseText) {
			if("1"==responseText){
				alertify.success('Sensor creado');
				alertify.set('notifier','delay', delay);
				pagSensor();
				$("#agregar-sensor").modal("hide");
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
}
/*funciones para la pagina eventos*/
function pagEvento(){
	ver();
	$.post("eventos?opcion=1", 
			function(responseText) {
		eventos = jQuery.parseJSON(responseText);
		iniciarEvento();
		noVer();
	});
}
function iniciarEvento(){
	let con = true;
	$("#select-evento").text('');
	for(let i=0;i<eventos.length;i++){
		if(con){
			$("#select-evento").append('<option id="'+i+'" value="'+i+'" select>'+eventos[i].nombre+'</option>');
			con = false;
		}else{
			$("#select-evento").append('<option id="'+i+'" value="'+i+'" >'+eventos[i].nombre+'</option>');
		}
	}
	$("#nombre-evento").val(eventos[0].nombre);
	$("#text-area-evento").val(eventos[0].descripcion);
	if(eventos[0].activo=="SI"){
		$("#activo-evento").removeClass('fa-toggle-off');
		$("#activo-evento").addClass('fa-toggle-on');
	}
	
}
function cambiarEvento(posicion){
	$("#nombre-evento").val(eventos[posicion].nombre);
	$("#text-area-evento").val(eventos[posicion].descripcion);
	if(eventos[posicion].activo=="NO"){
		$("#activo-evento").removeClass('fa-toggle-on');
		$("#activo-evento").addClass('fa-toggle-off');
	}else{
		$("#activo-evento").removeClass('fa-toggle-off');
		$("#activo-evento").addClass('fa-toggle-on');
	}
}
function cambiarActivoEvento(){
	let pos = $("#select-evento").val();
	var act, delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if(eventos[pos].activo=="SI"){
		act = "NO";
	}else{
		act = "SI";
	}
	
	$.post("eventos?opcion=2&activo="+act+"&id="+eventos[pos].id+"&nombre="+eventos[pos].nombre+"&descripcion="+eventos[pos].descripcion+"", 
			function(responseText) {
		if("1"==responseText){
			alertify.success('Estado actualizado');
			alertify.set('notifier','delay', delay);
			if(act=="SI"){
				eventos[pos].activo="SI";
				$("#activo-evento").removeClass('fa-toggle-off');
				$("#activo-evento").addClass('fa-toggle-on');
			}else{
				eventos[pos].activo="NO";
				$("#activo-evento").removeClass('fa-toggle-on');
				$("#activo-evento").addClass('fa-toggle-off');
			}
			
		}else{
			alertify.error('problemas de conexión');
			alertify.set('notifier','delay', delay);
		}
	});
}
function actualizarEvento(){
	let pos = $("#select-evento").val();
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#nombre-evento").val() == "" || $("#text-area-evento").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("eventos?opcion=2&activo="+eventos[pos].activo+"&id="+eventos[pos].id+"&nombre="+$("#nombre-evento").val()+"&descripcion="+$("#text-area-evento").val()+"", 
				function(responseText) {
			if("1"==responseText){
				alertify.success('Evento actualizado');
				alertify.set('notifier','delay', delay);
				$("#"+pos+"").text($("#nombre-evento").val());
				eventos[pos].nombre = $("#nombre-evento").val();
				eventos[pos].descripcion = $("#text-area-evento").val();
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
}
function agregarNuevoEvento(){
	$("#agregar-evento").modal("show");
}
function guardarEvento(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#nombre-evento-nuevo").val() == "" || $("#text-area-evento-nuevo").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("eventos?opcion=3&nombre="+$("#nombre-evento-nuevo").val()+"&descripcion="+$("#text-area-evento-nuevo").val()+"", 
				function(responseText) {
			if("1"==responseText){
				alertify.success('Evento creado');
				alertify.set('notifier','delay', delay);
				pagEvento();
				$("#agregar-evento").modal("hide");
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
}
/*funciones para la pagina peces*/
function pagPez(){
	ver();
	$.post("peces?opcion=1", 
			function(responseText) {
		var patron = /,1-2-3|1-2-3/gi,
		nuevoValor = "",
		str = responseText.replace(patron,nuevoValor);
		peces = jQuery.parseJSON(str);
		iniciarPeces();
		noVer();
	});
}
function iniciarPeces(){
	let con = true;
	$("#select-pez").text('');
	for(let i=0;i<peces.length;i++){
		if(con){
			$("#select-pez").append('<option id="'+i+'" value="'+i+'"  select>'+peces[i].nombre+'</option>');
			con = false;
		}else{
			$("#select-pez").append('<option id="'+i+'" value="'+i+'" >'+peces[i].nombre+'</option>');
		}
	}
	$("#nombre-pez").val(peces[0].nombre);
	$("#cientifico-pez").val(peces[0].nombreCientifico);
	$("#origen-pez").val(peces[0].origen);
	$("#genero-pez").val(peces[0].genero);
	$("#text-area-pez").val(peces[0].descripcion);
	con = true;
	$("#select-sensor-rango").text('');
	for(let i=0;i<peces[0].sensores.length;i++){
		if(con){
			$("#select-sensor-rango").append('<option id="'+i+'" value="'+i+'"  select>'+peces[0].sensores[i].nombreSensor+'</option>');
			con = false;
		}else{
			$("#select-sensor-rango").append('<option id="'+i+'" value="'+i+'" >'+peces[0].sensores[i].nombreSensor+'</option>');
		}
	}
	$("#minimo-pez").val(peces[0].sensores[0].valorMinimo);
	$("#maximo-pez").val(peces[0].sensores[0].valorMaximo);
	$("#indicadores-pez").text("");
	if(peces[0].sensores[0].indicadores.length==0){
		$("#indicadores-pez").append("<tr><th colspan=\"3\" >No existen indicadores</th></tr>");
	}else{
		for(let i=0;i<peces[0].sensores[0].indicadores.length;i++){
			if(peces[0].sensores[0].indicadores[i].activo=="SI"){
				$("#indicadores-pez").append('<tr><td id="min'+i+'">'+peces[0].sensores[0].indicadores[i].minimo+'</td><td id="max'+i+'">'+peces[0].sensores[0].indicadores[i].maximo+'</td><td><div class="input-group activo"><div class="input-group-prepend"><div class="input-group-text" data-toggle="tooltip" data-placement="left" title="Editar" onmouseover="mostrarTooltip()" onclick="actualizarIndicador('+i+')"><span class="fa fa-pencil"></span></div><div class="input-group-text" data-toggle="tooltip" data-placement="right" title="Estado" onmouseover="mostrarTooltip()" onclick="cambiarActivoIndicador('+i+')"><span id="indicadorActivo'+i+'" class="fa fa-toggle-on"></span></div></div></div></td></tr>');
			}else{
				$("#indicadores-pez").append('<tr><td id="min'+i+'">'+peces[0].sensores[0].indicadores[i].minimo+'</td><td id="max'+i+'">'+peces[0].sensores[0].indicadores[i].maximo+'</td><td><div class="input-group activo"><div class="input-group-prepend"><div class="input-group-text" data-toggle="tooltip" data-placement="left" title="Editar" onmouseover="mostrarTooltip()" onclick="actualizarIndicador('+i+')"><span class="fa fa-pencil"></span></div><div class="input-group-text" data-toggle="tooltip" data-placement="right" title="Estado" onmouseover="mostrarTooltip()" onclick="cambiarActivoIndicador('+i+')"><span id="indicadorActivo'+i+'" class="fa fa-toggle-off"></span></div></div></div></td></tr>');
			}
			
		}
	}
}
function cambiarPez(pos){
	$("#nombre-pez").val(peces[pos].nombre);
	$("#cientifico-pez").val(peces[pos].nombreCientifico);
	$("#origen-pez").val(peces[pos].origen);
	$("#genero-pez").val(peces[pos].genero);
	$("#text-area-pez").val(peces[pos].descripcion);
	con = true;
	$("#select-sensor-rango").text('');
	for(let i=0;i<peces[pos].sensores.length;i++){
		if(con){
			$("#select-sensor-rango").append('<option id="'+i+'" value="'+i+'"  select>'+peces[pos].sensores[i].nombreSensor+'</option>');
			con = false;
		}else{
			$("#select-sensor-rango").append('<option id="'+i+'" value="'+i+'" >'+peces[pos].sensores[i].nombreSensor+'</option>');
		}
	}
	$("#minimo-pez").val(peces[pos].sensores[0].valorMinimo);
	$("#maximo-pez").val(peces[pos].sensores[0].valorMaximo);
	$("#indicadores-pez").text("");
	if(peces[pos].sensores[0].indicadores.length==0){
		$("#indicadores-pez").append("<tr><th colspan=\"3\" >No existen indicadores</th></tr>");
	}else{
		for(let i=0;i<peces[pos].sensores[0].indicadores.length;i++){
			if(peces[pos].sensores[0].indicadores[i].activo=="SI"){
				$("#indicadores-pez").append('<tr><td id="min'+i+'">'+peces[pos].sensores[0].indicadores[i].minimo+'</td><td id="max'+i+'">'+peces[pos].sensores[0].indicadores[i].maximo+'</td><td><div class="input-group activo"><div class="input-group-prepend"><div class="input-group-text" data-toggle="tooltip" data-placement="left" title="Editar" onmouseover="mostrarTooltip()" onclick="actualizarIndicador('+i+')"><span class="fa fa-pencil"></span></div><div class="input-group-text" data-toggle="tooltip" data-placement="right" title="Estado" onmouseover="mostrarTooltip()" onclick="cambiarActivoIndicador('+i+')"><span id="indicadorActivo'+i+'" class="fa fa-toggle-on"></span></div></div></div></td></tr>');
			}else{
				$("#indicadores-pez").append('<tr><td id="min'+i+'">'+peces[pos].sensores[0].indicadores[i].minimo+'</td><td id="max'+i+'">'+peces[pos].sensores[0].indicadores[i].maximo+'</td><td><div class="input-group activo"><div class="input-group-prepend"><div class="input-group-text" data-toggle="tooltip" data-placement="left" title="Editar" onmouseover="mostrarTooltip()" onclick="actualizarIndicador('+i+')"><span class="fa fa-pencil"></span></div><div class="input-group-text" data-toggle="tooltip" data-placement="right" title="Estado" onmouseover="mostrarTooltip()" onclick="cambiarActivoIndicador('+i+')"><span id="indicadorActivo'+i+'" class="fa fa-toggle-off"></span></div></div></div></td></tr>');
			}
			
		}
	}
}
function cambiarSensorRango(pos2){
	var pos = $("#select-pez").val();
	$("#minimo-pez").val(peces[pos].sensores[pos2].valorMinimo);
	$("#maximo-pez").val(peces[pos].sensores[pos2].valorMaximo);
	$("#indicadores-pez").text("");
	if(peces[pos].sensores[pos2].indicadores.length==0){
		$("#indicadores-pez").append("<tr><th colspan=\"3\" >No existen indicadores</th></tr>");
	}else{
		for(let i=0;i<peces[pos].sensores[pos2].indicadores.length;i++){
			if(peces[pos].sensores[pos2].indicadores[i].activo=="SI"){
				$("#indicadores-pez").append('<tr><td id="min'+i+'">'+peces[pos].sensores[pos2].indicadores[i].minimo+'</td><td id="max'+i+'">'+peces[pos].sensores[pos2].indicadores[i].maximo+'</td><td><div class="input-group activo"><div class="input-group-prepend"><div class="input-group-text" data-toggle="tooltip" data-placement="left" title="Editar" onmouseover="mostrarTooltip()" onclick="actualizarIndicador('+i+')"><span class="fa fa-pencil"></span></div><div class="input-group-text" data-toggle="tooltip" data-placement="right" title="Estado" onmouseover="mostrarTooltip()" onclick="cambiarActivoIndicador('+i+')"><span id="indicadorActivo'+i+'" class="fa fa-toggle-on"></span></div></div></div></td></tr>');
			}else{
				$("#indicadores-pez").append('<tr><td id="min'+i+'">'+peces[pos].sensores[pos2].indicadores[i].minimo+'</td><td id="max'+i+'">'+peces[pos].sensores[pos2].indicadores[i].maximo+'</td><td><div class="input-group activo"><div class="input-group-prepend"><div class="input-group-text" data-toggle="tooltip" data-placement="left" title="Editar" onmouseover="mostrarTooltip()" onclick="actualizarIndicador('+i+')"><span class="fa fa-pencil"></span></div><div class="input-group-text" data-toggle="tooltip" data-placement="right" title="Estado" onmouseover="mostrarTooltip()" onclick="cambiarActivoIndicador('+i+')"><span id="indicadorActivo'+i+'" class="fa fa-toggle-off"></span></div></div></div></td></tr>');
			}
			
		}
	}
}
function actualizarIndicador(pos){
	let pez = $("#select-pez").val(), sensor = $("#select-sensor-rango").val(); 
	$("#id-indicador").val(pos);
	$("#minimo-actual").val(peces[pez].sensores[sensor].indicadores[pos].minimo);
	$("#maximo-actual").val(peces[pez].sensores[sensor].indicadores[pos].maximo);
	$("#text-area-indicador-actual").text(peces[pez].sensores[sensor].indicadores[pos].recomendacion);
	$("#editar-indicador").modal("show");
}
function guardarActualizarIndicador(){
	let pos = $("#id-indicador").val(),pez = $("#select-pez").val(), sensor = $("#select-sensor-rango").val();
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#minimo-actual").val()=="" || $("#maximo-actual").val()=="" || $("#text-area-indicador-actual").val()==""){
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("peces?opcion=4&idIndicador="+peces[pez].sensores[sensor].indicadores[pos].idIndicador+"&minimo="+$("#minimo-actual").val()+"&maximo="+$("#maximo-actual").val()+"&recomendacion="+$("#text-area-indicador-actual").val()+"&idRango="+peces[pez].sensores[sensor].idRango+"&activo="+peces[pez].sensores[sensor].indicadores[pos].activo+"", 
				function(responseText) {
			if("1"==responseText){
				alertify.success('Estado actualizado');
				alertify.set('notifier','delay', delay);
				$("#min"+pos).text($("#minimo-actual").val());
				peces[pez].sensores[sensor].indicadores[pos].minimo = $("#minimo-actual").val(); 
				$("#max"+pos).text($("#maximo-actual").val());
				peces[pez].sensores[sensor].indicadores[pos].maximo = $("#maximo-actual").val();
				peces[pez].sensores[sensor].indicadores[pos].recomendacion = $("#text-area-indicador-actual").text();
				$("#editar-indicador").modal("hide");
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
}
function cambiarActivoIndicador(pos){
	let pez = $("#select-pez").val(), sensor = $("#select-sensor-rango").val();
	var act, delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if(peces[pez].sensores[sensor].indicadores[pos].activo=="SI"){
		act = "NO";
	}else{
		act = "SI";
	}
	$.post("peces?opcion=4&idIndicador="+peces[pez].sensores[sensor].indicadores[pos].idIndicador+"&minimo="+peces[pez].sensores[sensor].indicadores[pos].minimo+"&maximo="+peces[pez].sensores[sensor].indicadores[pos].maximo+"&recomendacion="+peces[pez].sensores[sensor].indicadores[pos].recomendacion+"&idRango="+peces[pez].sensores[sensor].idRango+"&activo="+act+"", 
			function(responseText) {
		if("1"==responseText){
			alertify.success('Estado actualizado');
			alertify.set('notifier','delay', delay);
			if(act=="SI"){
				peces[pez].sensores[sensor].indicadores[pos].activo="SI";
				$("#indicadorActivo"+pos).removeClass('fa-toggle-off');
				$("#indicadorActivo"+pos).addClass('fa-toggle-on');
			}else{
				peces[pez].sensores[sensor].indicadores[pos].activo="NO";
				$("#indicadorActivo"+pos).removeClass('fa-toggle-on');
				$("#indicadorActivo"+pos).addClass('fa-toggle-off');
			}
			
		}else{
			alertify.error('problemas de conexión');
			alertify.set('notifier','delay', delay);
		}
	});
}
function agregarPez(){
	$("#agregar-pez").modal("show");
}
function guardarPez(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#nombre-pez-nuevo").val() == "" || $("#cientifico-pez-nuevo").val() == "" || $("#origen-pez-nuevo").val() == "" || $("#genero-pez-nuevo").val() == "" || $("#text-area-pez-nuevo").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("peces?opcion=3&nombre="+$("#nombre-pez-nuevo").val()+"&cientifico="+$("#cientifico-pez-nuevo").val()+"&genero="+$("#genero-pez-nuevo").val()+"&origen="+$("#origen-pez-nuevo").val()+"&descripcion="+$("#text-area-pez-nuevo").val()+"", 
				function(responseText) {
			if("1"==responseText){
				alertify.success('Pez agregado');
				alertify.set('notifier','delay', delay);
				pagPez()
				$("#agregar-pez").modal("hide");
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
}
function actualizarPez(){
	let pos = $("#select-pez").val();
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#nombre-pez").val() == "" || $("#cientifico-pez").val() == "" || $("#origen-pez").val() == "" || $("#genero-pez").val() == "" || $("#text-area-pez").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("peces?opcion=2&id="+peces[pos].id+"&nombre="+$("#nombre-pez").val()+"&cientifico="+$("#cientifico-pez").val()+"&genero="+$("#genero-pez").val()+"&origen="+$("#origen-pez").val()+"&descripcion="+$("#text-area-pez").val()+"", 
				function(responseText) {
			if("1"==responseText){
				alertify.success('Pez actualizado');
				alertify.set('notifier','delay', delay);
				$("#"+pos+"").text($("#nombre-pez").val());
				peces[pos].nombre = $("#nombre-pez").val();
				peces[pos].cientifico = $("#cientifico-pez").val();
				peces[pos].genero = $("#genero-pez").val();
				peces[pos].origen = $("#origen-pez").val();
				peces[pos].descripcion = $("#text-area-pez").val();
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
	
}
function actualizarRango(){
	let pezRango = $("#select-pez").val(), sensorRango = $("#select-sensor-rango").val();
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#minimo-pez").val() == "" || $("#maximo-pez").val() == "" ){
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		if($("#minimo-pez").val() < $("#maximo-pez").val()){
			$.post("peces?opcion=6&id="+peces[pezRango].sensores[sensorRango].idRango+"&idPescado="+peces[pezRango].id+"&idSensor="+peces[pezRango].sensores[sensorRango].idSensor+"&maximo="+$("#maximo-pez").val()+"&minimo="+$("#minimo-pez").val(),
					function (responseText){
					if("1"==responseText){
						alertify.success('Rango actualizado');
						alertify.set('notifier','delay', delay);
						peces[pezRango].sensores[sensorRango].valorMaximo = $("#maximo-pez").val();
						peces[pezRango].sensores[sensorRango].valorMinimo = $("#minimo-pez").val();
					}else{
						alertify.error('problemas de conexión');
						alertify.set('notifier','delay', delay);
					}
			});
		}else{
			alertify.error('el valor minimo no puede ser el mayor');
			alertify.set('notifier','delay', delay);
		}
		
	}
}
function agregarIndicador(){
	$("#agregar-indicador").modal("show");
}
function guardarIndicador(){
	let pez = $("#select-pez").val(), sensor = $("#select-sensor-rango").val(), pos = peces[pez].sensores[sensor].indicadores.length;
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#minimo-nuevo").val() == "" || $("#maximo-nuevo").val() == "" || $("#text-area-indicador-nuevo").val() == ""){
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("peces?opcion=5&minimo="+$("#minimo-nuevo").val()+"&maximo="+$("#maximo-nuevo").val()+"&recomendacion="+$("#text-area-indicador-nuevo").val()+"&idRango="+peces[pez].sensores[sensor].idRango+"&activo=SI", 
				function(responseText) {
			if("0"==responseText){
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);				
			}else{
				if(pos==0){
					$("#indicadores-pez").text("");
				}
				peces[pez].sensores[sensor].indicadores.push({idIndicador: responseText,maximo: $("#maximo-nuevo").val(),minimo: $("#minimo-nuevo").val(), recomendacion: $("#text-area-indicador-nuevo").val(), activo: "SI"});
				$("#indicadores-pez").append('<tr><td id="min'+pos+'">'+$("#minimo-nuevo").val()+'</td><td id="max'+pos+'">'+$("#maximo-nuevo").val()+'</td><td><div class="input-group activo"><div class="input-group-prepend"><div class="input-group-text" data-toggle="tooltip" data-placement="left" title="Editar" onmouseover="mostrarTooltip()" onclick="actualizarIndicador('+pos+')"><span class="fa fa-pencil"></span></div><div class="input-group-text" data-toggle="tooltip" data-placement="right" title="Estado" onmouseover="mostrarTooltip()" onclick="cambiarActivoIndicador('+pos+')"><span id="indicadorActivo'+pos+'" class="fa fa-toggle-on"></span></div></div></div></td></tr>');
				$("#agregar-indicador").modal("hide");
				alertify.success('indicador creado');
				alertify.set('notifier','delay', delay);
			}
		});
	}
}
/*funciones para la pagina peceras*/
function pagPecera(){
	ver();
	$.post("peceras?opcion=1", 
			function(responseText) {
		var patron = /,1-2-3|1-2-3/gi,
		nuevoValor = "",
		str = responseText.replace(patron,nuevoValor);
		var separador = "|";
		var objetos = str.split(separador);
		listaPeces = jQuery.parseJSON(objetos[1]);
		peceras = jQuery.parseJSON(objetos[0]);
		iniciarPeceras();
		noVer();
	});
}
function iniciarPeceras(){
	let con = true;
	$("#select-pecera").text('');
	for(let i=0;i<peceras.length;i++){
		if(con){
			$("#select-pecera").append('<option id="'+i+'" value="'+i+'"  select>'+peceras[i].nombre+'</option>');
			con = false;
		}else{
			$("#select-pecera").append('<option id="'+i+'" value="'+i+'" >'+peceras[i].nombre+'</option>');
		}
	}
	if(peceras[0].activo=="SI"){
		$("#activo-pecera").removeClass('fa-toggle-off');
		$("#activo-pecera").addClass('fa-toggle-on');
	}
	$("#profundidad-pecera").val(peceras[0].profundidad);
	$("#diametro-pecera").val(peceras[0].diametro);
	$("#text-area-pecera").val(peceras[0].descripcion);
	var tamano = peceras[0].pepe.length; 
	if(tamano==0){
		$("#peceras-pescados").append("<tr><th coldspan=\"4\" scope=\"row\">No existen registros para esta pecera</th></tr>");
	}else{
		for(let j=0;j<peceras[0].pepe.length;j++){
			if(peceras[0].pepe[j].fechaFinal=="null"){
				$("#peceras-pescados").append("<tr><th scope=\"row\">"+peceras[0].pepe[j].nombrePescado+"</th><td>"+peceras[0].pepe[j].cantidad+"</td><td>"+peceras[0].pepe[j].fechaInicial+"</td><td id=\"fecha-final-pecera-"+j+"\"><div class=\"form-group\"><div class=\"input-group input-group-sm input-margen\"><input id=\"fecha-usuario-"+j+"\" class=\"form-control\" name=\"fecha\" type=\"date\" value=\"\" required><button class=\"btn btn-outline-primary\" onclick=\"agregarFechaFin("+0+","+j+")\" type=\"button\">Agregar</button></div></div></td></tr>");
			}else{
				$("#peceras-pescados").append("<tr><th scope=\"row\">"+peceras[0].pepe[j].nombrePescado+"</th><td>"+peceras[0].pepe[j].cantidad+"</td><td>"+peceras[0].pepe[j].fechaInicial+"</td><td id=\"fecha-final-pecera-"+j+"\">"+peceras[0].pepe[j].fechaFinal+"</td></tr>");
			}
		}
	}
	
}
function cambiarPecera(pos){
	if(peceras[pos].activo=="SI"){
		$("#activo-pecera").removeClass('fa-toggle-off');
		$("#activo-pecera").addClass('fa-toggle-on');
	}else{
		$("#activo-pecera").removeClass('fa-toggle-on');
		$("#activo-pecera").addClass('fa-toggle-off');
	}
	$("#profundidad-pecera").val(peceras[pos].profundidad);
	$("#diametro-pecera").val(peceras[pos].diametro);
	$("#text-area-pecera").val(peceras[pos].descripcion);
	$("#peceras-pescados").text("");
	if(peceras[pos].pepe.length==0){
		$("#peceras-pescados").append("<tr><th coldspan=\"4\" scope=\"row\">No existen registros para esta pecera</th></tr>");
	}else{
		for(let j=0;j<peceras[pos].pepe.length;j++){
			if(peceras[pos].pepe[j].fechaFinal=="null"){
				$("#peceras-pescados").append("<tr><th scope=\"row\">"+peceras[pos].pepe[j].nombrePescado+"</th><td>"+peceras[pos].pepe[j].cantidad+"</td><td>"+peceras[pos].pepe[j].fechaInicial+"</td><td id=\"fecha-final-pecera-"+j+"\"><div class=\"form-group\"><div class=\"input-group input-group-sm input-margen\"><input id=\"fecha-usuario-"+j+"\" class=\"form-control\" name=\"fecha\" type=\"date\" value=\"\" required><button class=\"btn btn-outline-primary\" onclick=\"agregarFechaFin("+pos+","+j+")\" type=\"button\">Agregar</button></div></div></td></tr>");
			}else{
				$("#peceras-pescados").append("<tr><th scope=\"row\">"+peceras[pos].pepe[j].nombrePescado+"</th><td>"+peceras[pos].pepe[j].cantidad+"</td><td>"+peceras[pos].pepe[j].fechaInicial+"</td><td id=\"fecha-final-pecera-"+j+"\">"+peceras[pos].pepe[j].fechaFinal+"</td></tr>");
			}	
		}
	}
}
function actualizarPecera(){
	let pos = $("#select-pecera").val();
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#profundidad-pecera").val() == "" || $("#diametro-pecera").val() == "" || $("#text-area-pecera").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("peceras?opcion=2&id="+peceras[pos].id+"&nombre="+peceras[pos].nombre+"&profundidad="+$("#profundidad-pecera").val()+"&diametro="+$("#diametro-pecera").val()+"&descripcion="+$("#text-area-pecera").val()+"&activo="+peceras[pos].activo+"", 
				function(responseText) {
			if("1"==responseText){
				alertify.success('pecera actualizado');
				alertify.set('notifier','delay', delay);
				peceras[pos].diametro = $("#diametro-pecera").val();
				peceras[pos].profundidad = $("#profundidad-pecera").val();
				peceras[pos].descripcion = $("#text-area-pecera").val();
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
} 
function agregarPecera(){
	$("#agregar-pecera").modal("show");
}
function guardarPecera(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#nombre-pecera-nuevo").val() == "" || $("#text-area-pecera-nuevo").val() == "" || $("#profundidad-pecera-nuevo").val() == "" || $("#diametro-pecera-nuevo").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("peceras?opcion=3&nombre="+$("#nombre-pecera-nuevo").val()+"&diametro="+$("#diametro-pecera-nuevo").val()+"&profundidad="+$("#profundidad-pecera-nuevo").val()+"&descripcion="+$("#text-area-pecera-nuevo").val()+"", 
				function(responseText) {
			if("1"==responseText){
				alertify.success('Pecera creada');
				alertify.set('notifier','delay', delay);
				pagPecera();
				$("#agregar-pecera").modal("hide");
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
}
function cambiarActivoPecera(){
	let pos = $("#select-pecera").val();
	var act, delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if(peceras[pos].activo=="SI"){
		act = "NO";
	}else{
		act = "SI";
	}
	$.post("peceras?opcion=2&id="+peceras[pos].id+"&nombre="+peceras[pos].nombre+"&profundidad="+$("#profundidad-pecera").val()+"&diametro="+$("#diametro-pecera").val()+"&descripcion="+$("#text-area-pecera").val()+"&activo="+act+"", 
			function(responseText) {
		if("1"==responseText){
			alertify.success('Estado actualizado');
			alertify.set('notifier','delay', delay);
			if(act=="SI"){
				peceras[pos].activo="SI";
				$("#activo-pecera").removeClass('fa-toggle-off');
				$("#activo-pecera").addClass('fa-toggle-on');
			}else{
				peceras[pos].activo="NO";
				$("#activo-pecera").removeClass('fa-toggle-on');
				$("#activo-pecera").addClass('fa-toggle-off');
			}
			
		}else{
			alertify.error('problemas de conexión');
			alertify.set('notifier','delay', delay);
		}
	});
}
function agregarPescadoPecera(){
	let con = true;
	$("#select-pez").text('');
	for(let i=0;i<listaPeces.length;i++){
		if(con){
			$("#select-pez").append('<option id="pez'+i+'" value="'+i+'"  select>'+listaPeces[i].nombre+'</option>');
			con = false;
		}else{
			$("#select-pez").append('<option id="pez'+i+'" value="'+i+'" >'+listaPeces[i].nombre+'</option>');
		}
	}
	$("#agregar-pecera-pescado").modal("show");
}
function guardarPeceraPescado(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#select-pez").val() == "" || $("#cantidad-peces").val() == "" || $("#fecha-inicio").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else if($("#cantidad-peces").val()<1){
		alertify.error('No se admiten valores negativo o menores a cero');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("peceras?opcion=5&idPescado="+listaPeces[$("#select-pez").val()].id+"&idPecera="+peceras[$("#select-pecera").val()].id+"&cantidad="+$("#cantidad-peces").val()+"&fechaInicio="+$("#fecha-inicio").val()+"", 
				function(responseText) {
			if("0"==responseText){
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}else{
				alertify.success('Pez agregado');
				alertify.set('notifier','delay', delay);
				var tamano = peceras[$("#select-pecera").val()].pepe.length;
				if(peceras[$("#select-pecera").val()].pepe.length==0){
					$("#peceras-pescados").text("");	
				}
				peceras[$("#select-pecera").val()].pepe.push({id: responseText,idPescado:listaPeces[$("#select-pez").val()].id, nombrePescado: listaPeces[$("#select-pez").val()].nombre, idPecera: peceras[$("#select-pecera").val()].id, cantidad: $("#cantidad-peces").val(), fechaInicial: $("#fecha-inicio").val(), fechaFinal: 'null'});
				$("#peceras-pescados").append("<tr><th scope=\"row\">"+listaPeces[$("#select-pez").val()].nombre+"</th><td>"+$("#cantidad-peces").val()+"</td><td>"+$("#fecha-inicio").val()+"</td><td id=\"fecha-final-pecera-"+tamano+"\"><div class=\"form-group\"><div class=\"input-group input-group-sm input-margen\"><input id=\"fecha-usuario-"+tamano+"\" class=\"form-control\" name=\"fecha\" type=\"date\" value=\"\" required><button class=\"btn btn-outline-primary\" onclick=\"agregarFechaFin("+$("#select-pecera").val()+","+tamano+")\" type=\"button\">Agregar</button></div></div></td></tr>");
				$("#agregar-pecera-pescado").modal("hide");
			}
		});
	}
}
function agregarFechaFin(pos1, pos2){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#fecha-usuario-"+pos2).val()==""){
		alertify.error('Llena el campo');
		alertify.set('notifier','delay', delay);
	}else if($("#fecha-usuario-"+pos2).val()<peceras[pos1].pepe[pos2].fechaInicial){
		alertify.error('Esta fecha no puede ser inferior a la inicial');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("peceras?opcion=4&id="+peceras[pos1].pepe[pos2].id+"&idPescado="+peceras[pos1].pepe[pos2].idPescado+"&idPecera="+peceras[pos1].pepe[pos2].idPecera+"&cantidad="+peceras[pos1].pepe[pos2].cantidad+"&fechaInicial="+peceras[pos1].pepe[pos2].fechaInicial+"&fechaFinal="+$("#fecha-usuario-"+pos2).val()+"", 
				function(responseText) {
			if("1"==responseText){
				alertify.success('Fecha final establecida');
				alertify.set('notifier','delay', delay);
				peceras[pos1].pepe[pos2].fechaFinal = $("#fecha-usuario-"+pos2).val();
				$("#fecha-final-pecera-"+pos2).text($("#fecha-usuario-"+pos2).val());
			}else{
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);
			}
		});
	}
}
/*restricciones*/
function soloNumeros(evt){
	 if(window.event){
		  keynum = evt.keyCode;
	 }else{
		  keynum = evt.which;
	 } 
	 if((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13 || keynum == 6 ){
		 return true;
	 }else{
		 return false;
	 }
}
function soloLetras(e){
	let key = e.keyCode || e.which;
    let tecla = String.fromCharCode(key).toString();
    let letras = " áéíóúabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let especiales = [8, 37, 39, 46, 6];

    let tecla_especial = false
    for(var i in especiales) {
        if(key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if(letras.indexOf(tecla) == -1 && !tecla_especial){
        return false;
    }
}
/*bloquear pagina*/
function ver(){
	$('#cargando').removeClass('no-ver');
    $('#cargando').addClass('ver');
}
function noVer(){
	$('#cargando').removeClass('ver');
    $('#cargando').addClass('no-ver');
}
