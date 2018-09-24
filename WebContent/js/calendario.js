var fechaIdConsulta, peceras, personas, solucion, sensores, eventos, eventosPersona, incidenciaFecha;
var diaActual = new Date();

function calendario(){
	$('#calendario').calendar({
		  showHeaders: true,
		  startYear: diaActual.getFullYear(),
		  maxYear: 2025,
		  maxDay: null,
		  maxMonth: null,
		  maxDayMessage: 'You can not choose day from future',
		  minYear: 2017,
		  minDay: null,
		  minMonth: null,
		  minDayMessage: 'You can not choose day from past',
		  boostrapVersion: 4,
		  cols: 12,
		  colsSm: 6,
		  colsMd: 4,
		  colsLg: 3,
		  colsXl: 3,
		  maxDaysToChoose: false,
		  maxDaysToChooseMessage: 'Maximum days to choose is: ',
		  mode: 'classic'
	});
	ver();
	$.post("calendario?opcion=1", 
			function(responseText) {
		if("0"==responseText){
			noVer();
			alertify.error('problemas de conexión o de la información enviada');
			alertify.set('notifier','delay', delay);				
		}else{		
			var patron = /,1-2-3|1-2-3/gi,
			nuevoValor = "",
			str = responseText.replace(patron,nuevoValor);
			var separador = "|";
			var objetos = str.split(separador);
			peceras = jQuery.parseJSON(objetos[0]);
			sensores = jQuery.parseJSON(objetos[1]);
			personas = jQuery.parseJSON(objetos[2]); 
			eventos = jQuery.parseJSON(objetos[3]);
			eventosPersona = jQuery.parseJSON(objetos[4]);
			solucion = jQuery.parseJSON(objetos[5]);
			incidenciaFecha = jQuery.parseJSON(objetos[6]);
			agregarIncidencias();
			agregarEventos();
			agregarSoluciones();
			noVer();
		}
	});
	$('.jqyc-prev-year').on('click', function (event) {		
		agregarIncidencias();
		agregarEventos();
		agregarSoluciones();
		adelanteCalendario();
		atrasCalendario();
	});

	$('.jqyc-next-year').on('click', function (event) {
		agregarIncidencias();
		agregarEventos();
		agregarSoluciones();
		adelanteCalendario();
		atrasCalendario();
	});
		
}

function adelanteCalendario(){
	$('.jqyc-next-year').on('click', function (event) {
		agregarIncidencias();
		agregarEventos();
		agregarSoluciones();
		adelanteCalendario();
		atrasCalendario();
	});
}

function atrasCalendario(){
	$('.jqyc-prev-year').on('click', function (event) {
		agregarIncidencias();
		agregarEventos();
		agregarSoluciones();
		adelanteCalendario();
		atrasCalendario();
	});
}

function incluirEventosSolucion(variable){
	fechaIdConsulta = variable;
	var fechaId = $("#"+variable).attr("class");
	if(fechaId.indexOf("solucion")>0 || fechaId.indexOf("evento")>0){
		$("#tabla-eventos-soluciones").text("");
		$("#"+variable+" input[id^='solu']").each(function(){
			let id = $(this).val();
			let nombre;
			for(let i=0;i<personas.length;i++){
				if(personas[i].id==solucion[id].persona){
					nombre = personas[i].nombre;
					break;
				}
			}
			if(solucion[id].persona==$("#usuario-actual").val()){
				$("#tabla-eventos-soluciones").append('<tr><td>Solución</td><td>'+nombre+'</td><td>'+solucion[id].fecha+'</td><td><span onClick="opcionesCalendarioSolucion('+id+',\'eliminar\')" title="Eliminar" class="fa fa-trash activo"></span> | <span onClick="opcionesCalendarioSolucion('+id+',\'ver\')" title="Ver"  class="fa fa-eye activo"></span> | <span onClick="opcionesCalendarioSolucion('+id+',\'editar\')" title="Editar" class="fa fa-edit activo"></span></td></tr>');
			}else{
				$("#tabla-eventos-soluciones").append('<tr><td>Solución</td><td>'+nombre+'</td><td>'+solucion[id].fecha+'</td><td><span onClick="opcionesCalendarioSolucion('+id+',\'ver\')" title="Ver" class="fa fa-eye activo"></span></td></tr>');
			}
			
    	});
		$("#"+variable+" input[id^='even']").each(function(){
			let id = $(this).val();
			let nombre;
			for(let i=0;i<personas.length;i++){			
				if(personas[i].id==eventosPersona[id].idPersona){
					nombre = personas[i].nombre;
					break;
				}
			}
			if(eventosPersona[id].idPersona==$("#usuario-actual").val()){
				$("#tabla-eventos-soluciones").append('<tr><td>Evento</td><td>'+nombre+'</td><td>'+eventosPersona[id].fecha+'</td><td><span onClick="opcionesCalendarioEvento('+id+',\'eliminar\')" title="Eliminar" class="fa fa-trash activo"></span> | <span onClick="opcionesCalendarioEvento('+id+',\'ver\')" title="Ver" class="fa fa-eye activo"></span> | <span onClick="opcionesCalendarioEvento('+id+',\'editar\')" title="Editar" class="fa fa-edit activo"></span></td></tr>');
			}else{
				$("#tabla-eventos-soluciones").append('<tr><td>Evento</td><td>'+nombre+'</td><td>'+eventosPersona[id].fecha+'</td><td><span onClick="opcionesCalendarioEvento('+id+',\'ver\')" title="Ver" class="fa fa-eye activo"></span></td></tr>');
			}
    	});
		if(fechaId.indexOf("incidencia")>0){
			$("#lista-agregar-incidencia").text('');
			$("#lista-agregar-incidencia").append('<button type="button" class="btn btn-info" onclick="cambiarModalSolucion()">Agregar Solución</button>');
		}else{
			$("#lista-agregar-incidencia").text('');
		}
		$("#lista-eventos-soluciones").modal('show');
		
	}else if(fechaId.indexOf("incidencia")>0){
			$('#titulo-agregar-solucion').text('Agregar solución '+variable);
			$("#select-solucion-cal").text("");
			$("#"+variable+" input[id^='inci']").each(function(){
				let id = $(this).val();
				var peceraNombre, sensorNombre;
				for(let j=0;j<peceras.length;j++){
					if(peceras[j].id==incidenciaFecha[id].pecera){
						peceraNombre = peceras[j].nombre; 
						break;
					}
				}
				for(let k=0;k<sensores.length;k++){
					if(sensores[k].id==incidenciaFecha[id].sensor){
						sensorNombre = sensores[k].nombre; 
						break;
					}
				}
				$("#select-solucion-cal").append('<option id='+id+' value="'+id+'">'+peceraNombre+" / "+sensorNombre+": "+incidenciaFecha[id].valor+" / "+incidenciaFecha[id].hora+'</option>');
	    	});
			$("#input-solucion-cal").val("");
			$("#input-solucion-nombre-cal").val("");
			$("#text-area-solucion-cal-observacion").val("");
			$("#text-area-solucion-cal-accion").val("");
			$("#agregar-solucion").modal('show');
	}else{
		$('#titulo-agregar-evento').text('Agregar evento '+variable);
		$("#select-evento-cal").text('');
		for(let i=0;i<eventos.length;i++){
			if(eventos[i].activo=="SI"){
				$("#select-evento-cal").append('<option id='+i+' value="'+i+'">'+eventos[i].nombre+'</option>');
			}			
		}
		$("#select-pecera-cal").text('');
		for(let j=0;j<peceras.length;j++){
			$("#select-pecera-cal").append('<option id="'+j+'" value="'+j+'">'+peceras[j].nombre+'</option>');
		}
		$("#text-area-evento-cal-descripcion").text('');
		$("#text-area-evento-cal-descripcion").append(eventos[0].descripcion);
		$("#text-area-evento-cal-observacion").val('');
		$("#input-evento-cal").val("");
		$("#agregar-evento").modal('show');
	}
	
	
}
function agregarSolucionCalendario(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#text-area-solucion-cal-accion").val() == "" || $("#text-area-solucion-cal-observacion").val() == "" || $("#input-solucion-nombre-cal").val() == "" || $("#input-solucion-cal").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$("#agregar-solucion").modal('hide');
		ver();
		console.log("calendario?opcion=3&idPersona="+$("#usuario-actual").val()+"&fechaIncidencia="+incidenciaFecha[$('#select-solucion-cal').val()].id+"&fecha="+diaActual.getFullYear()+"-"+(diaActual.getMonth()+1)+"-"+diaActual.getDate()+"&hora="+$("#input-solucion-cal").val()+":00&nombre="+$("#input-solucion-nombre-cal").val()+"&accion="+$("#text-area-solucion-cal-accion").val()+"&observacion="+$("#text-area-solucion-cal-observacion").val());
		$.post("calendario?opcion=3&idPersona="+$("#usuario-actual").val()+"&fechaIncidencia="+incidenciaFecha[$('#select-solucion-cal').val()].id+"&fecha="+diaActual.getFullYear()+"-"+(diaActual.getMonth()+1)+"-"+diaActual.getDate()+"&hora="+$("#input-solucion-cal").val()+":00&nombre="+$("#input-solucion-nombre-cal").val()+"&accion="+$("#text-area-solucion-cal-accion").val()+"&observacion="+$("#text-area-solucion-cal-observacion").val(), 
				function(responseText) {
			if("0"==responseText){
				noVer();
				alertify.error('problemas de conexión o de la información enviada');
				alertify.set('notifier','delay', delay);				
			}else{
				var tamano = solucion.length;
				$('#'+fechaIdConsulta).addClass("solucion");
				try {
					solucion.push({id:responseText,persona:$("#usuario-actual").val(), fechaIncidencia: incidenciaFecha[$('#select-solucion-cal').val()].id, fecha: diaActual.getFullYear()+"-"+(diaActual.getMonth()+1)+"-"+diaActual.getDate(), hora: $("#input-solucion-cal").val()+":00" ,nombre: $("#input-solucion-nombre-cal").val(),accion: $("#text-area-solucion-cal-accion").val(), observacion: $("#text-area-evento-cal-observacion").val()});
					$('#'+fechaIdConsulta).append("<input id=\"solu"+tamano+"\" name=\"solu"+tamano+"\" type=\"hidden\" value=\""+tamano+"\">");
				}
				catch(err) {
					$('#'+fechaIdConsulta).append("<input id=\"solu"+0+"\" name=\"solu"+0+"\" type=\"hidden\" value=\""+0+"\">");
				    solucion = jQuery.parseJSON("[{\"id\":"+responseText+",\"persona\":"+$("#usuario-actual").val()+",\"fechaIncidencia\":"+incidenciaFecha[$('#select-solucion-cal').val()].id+",\"hora\":\""+$("#input-solucion-cal").val()+":00"+"\",\"fecha\":\""+diaActual.getFullYear()+"-"+(diaActual.getMonth()+1)+"-"+diaActual.getDate()+"\",\"nombre\":\""+$("#input-solucion-nombre-cal").val()+"\",\"accion\":\""+$("#text-area-solucion-cal-accion").val()+"\",\"observacion\":\""+$("#text-area-evento-cal-observacion").val()+"\"}]");
				}
				alertify.success('Solución agregada');
				alertify.set('notifier','delay', delay);
				noVer();
			}
		});
	
	}
}

function agregarEventoCalendario(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($("#text-area-evento-cal-observacion").val() == "" || $("#input-evento-cal").val() == ""){	
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$("#agregar-evento").modal('hide');
		ver();	
		$.post("calendario?opcion=2&idPersona="+$("#usuario-actual").val()+"&idEvento="+eventos[$("#select-evento-cal").val()].id+"&idPecera="+peceras[$("#select-pecera-cal").val()].id+"&fecha="+fechaIdConsulta+"&hora="+$("#input-evento-cal").val()+":00&observacion="+$("#text-area-evento-cal-observacion").val(), 
				function(responseText) {
			if("0"==responseText){
				noVer();
				alertify.error('problemas de conexión o de la información enviada');
				alertify.set('notifier','delay', delay);				
			}else{
				var tamano = eventosPersona.length;
				var variable = $('#'+fechaIdConsulta).attr("class");
				if(variable.indexOf("incidencia")>0){
					$('#'+fechaIdConsulta).css({
						"box-shadow": "rgb(69, 165, 151) 0px -2px 0px 0px inset, rgb(255, 74, 50) 0px -4px 0px 0px inset"
					});
					$('#'+fechaIdConsulta).addClass("evento");
					$('#'+fechaIdConsulta).append("<input id=\"even"+tamano+"\" name=\"even"+tamano+"\" type=\"hidden\" value=\""+tamano+"\">");
				}else{
					$('#'+fechaIdConsulta).css("box-shadow","rgb(69, 165, 151) 0px -2px 0px 0px inset");
					$('#'+fechaIdConsulta).addClass("evento");
					$('#'+fechaIdConsulta).append("<input id=\"even"+tamano+"\" name=\"even"+tamano+"\" type=\"hidden\" value=\""+tamano+"\">");
				}
				eventosPersona.push({id: responseText,idPersona:$("#usuario-actual").val(), idPecera: peceras[$("#select-pecera-cal").val()].id, idEvento: eventos[$("#select-evento-cal").val()].id, fecha: fechaIdConsulta, hora: $("#input-evento-cal").val()+":00" , observacion: $("#text-area-evento-cal-observacion").val()});
				alertify.success('Evento agregado');
				alertify.set('notifier','delay', delay);
				noVer();
			}
		});
	}
}

function opcionesCalendarioSolucion(id,tipo){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if(tipo=="eliminar"){
		$("#lista-eventos-soluciones").modal('hide');
		ver();
		$.post("calendario?opcion=4&id="+solucion[id].id+"&idPersona="+solucion[id].persona+"&fechaIncidencia="+solucion[id].fechaIncidencia+"&fecha="+solucion[id].fecha+"&hora="+solucion[id].hora+"&nombre="+solucion[id].nombre+"&accion="+solucion[id].accion+"&observacion="+solucion[id].observacion, 
				function(responseText) {
			if("0"==responseText){
				noVer();
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);				
			}else{
				var booleano = true;
				solucion.splice(id,1);
				$("#solu"+id).remove();
				$("#"+fechaIdConsulta+" input[id^='solu']").each(function(){
					booleano = false;
				});
				if(booleano){
					$("#"+fechaIdConsulta).removeClass('solucion');
				}
				alertify.success('Solución eliminada');
				alertify.set('notifier','delay', delay);
				noVer();
				cambiar('calendario');
			}
		});
		
	}else if(tipo=="editar"){
		$("#id-valor-solucion").text('');
		$("#id-valor-solucion").append('<button type="button" class="btn btn-primary" onclick="editarSolucionCalendario('+id+')">Enviar</button>');
		$('#titulo-editar-solucion').text('Agregar solución '+solucion[id].fecha+" "+solucion[id].hora);
		$("#input-solucion-nombre-cal-editar").val(solucion[id].nombre);
		$("#text-area-solucion-cal-accion-editar").val(solucion[id].accion);
		$("#text-area-solucion-cal-observacion-editar").val(solucion[id].observacion);
		$("#lista-eventos-soluciones").modal('hide');
		$("#editar-solucion").modal('show');
	}else{
		var nombre,idCambiante, pecera, sensor, idPecera, idSensor, valor;
		$("#titulo-ver-evento-solucion").text('');
		$("#titulo-ver-evento-solucion").append('Solución/'+solucion[id].fecha+'/'+solucion[id].hora);
		$("#ver-evento-solucion").text('');
		idCambiante = solucion[id].persona;
		for(let i=0;i<personas.length;i++){
			if(idCambiante==personas[i].id){
				nombre = personas[i].nombre+" "+personas[i].apellido;
			}
		}
		idCambiante = solucion[id].fechaIncidencia;
		for(let i=0;i<incidenciaFecha.length;i++){
			if(idCambiante==incidenciaFecha[i].id){
				idPecera = incidenciaFecha[i].pecera;
				idSensor = incidenciaFecha[i].sensor;
				valor = incidenciaFecha[i].valor;
				break;
			}
		}
		for(let i=0;i<peceras.length;i++){
			if(idPecera==peceras[i].id){
				pecera = peceras[i].nombre;
				break;
			}
		}
		for(let i=0;i<sensores.length;i++){
			if(idSensor==sensores[i].id){
				sensor = sensores[i].nombre;
				break;
			}
		}
		$("#ver-evento-solucion").append('<div><h6>Nombre: </h6><small class="text-muted">'+nombre+'</small></div><h1></h1>');
		$("#ver-evento-solucion").append('<div><h6>Nombre de la solución: </h6><small class="text-muted">'+solucion[id].nombre+'</small></div><h1></h1>');
		$("#ver-evento-solucion").append('<div><h6>Accion: </h6><small class="text-muted">'+solucion[id].accion+'</small></div><h1></h1>');
		$("#ver-evento-solucion").append('<div><h6>Observacion: </h6><small class="text-muted">'+solucion[id].observacion+'</small></div><h1></h1>');
		$("#ver-evento-solucion").append('<div><h6>Pecera: </h6><small class="text-muted">'+pecera+'</small></div><h1></h1>');
		$("#ver-evento-solucion").append('<div><h6>Sensor: </h6><small class="text-muted">'+sensor+' | valor de la incidencia '+valor+'</small></div><h1></h1>');
		$("#lista-eventos-soluciones").modal('hide');
		$("#ver-soluciones-eventos-otros").modal('show');
	}
}
function opcionesCalendarioEvento(id,tipo){	
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if(tipo=="eliminar"){
		$("#lista-eventos-soluciones").modal('hide');
		ver();
		$.post("calendario?opcion=5&id="+eventosPersona[id].id+"&idPersona="+eventosPersona[id].idPersona+"&idEvento="+eventosPersona[id].idEvento+"&idPecera="+eventosPersona[id].idPecera+"&fecha="+eventosPersona[id].fecha+"&hora="+eventosPersona[id].hora+"&observacion="+eventosPersona[id].observacion, 
				function(responseText) {
			if("0"==responseText){
				noVer();
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);				
			}else{
				var booleano = true;
				eventosPersona.splice(id,1);
				$("#even"+id).remove();
				$("#"+fechaIdConsulta+" input[id^='even']").each(function(){
					booleano = false;
				});
				if(booleano){
				 	$("#"+fechaIdConsulta).removeClass('evento');
				 	$("#"+fechaIdConsulta).removeAttr('style');
				}
				alertify.success('Evento eliminado');
				alertify.set('notifier','delay', delay);
				noVer();
				cambiar('calendario');
			}
		});
		
		
	}else if(tipo=="editar"){
		$('#titulo-editar-evento').text('Agregar evento '+eventosPersona[id].fecha+" "+eventosPersona[id].hora);
		
		$("#select-evento-cal-editar").text('');
		for(let i=0;i<eventos.length;i++){
			if(eventos[i].activo=="SI"){
				if(eventos[i].id==eventosPersona[id].idEvento){
					$("#select-evento-cal-editar").append('<option id='+i+' value="'+i+'" selected>'+eventos[i].nombre+'</option>');
				}else{
					$("#select-evento-cal-editar").append('<option id='+i+' value="'+i+'">'+eventos[i].nombre+'</option>');
				}
			}			
		}
		$("#select-pecera-cal-editar").text('');
		for(let j=0;j<peceras.length;j++){
			if(peceras[j].id==eventosPersona[id].idPecera){
				$("#select-pecera-cal-editar").append('<option id="'+j+'" value="'+j+'" selected>'+peceras[j].nombre+'</option>');
			}else{
				$("#select-pecera-cal-editar").append('<option id="'+j+'" value="'+j+'">'+peceras[j].nombre+'</option>');
			}
		}
		$("#id-valor-evento").text('');
		$("#id-valor-evento").append('<button type="button" class="btn btn-primary" onclick="editarEventoCalendario('+id+')">Enviar</button>');
		$("#text-area-evento-cal-observacion-editar").val(eventosPersona[id].observacion);
		$("#lista-eventos-soluciones").modal('hide');
		$("#editar-evento").modal('show');
	}else{
		var nombre,idCambiante, pecera, evento, descripcion;
		$("#titulo-ver-evento-solucion").text('');
		$("#titulo-ver-evento-solucion").append('Evento/'+eventosPersona[id].fecha+'/'+eventosPersona[id].hora);
		$("#ver-evento-solucion").text('');
		idCambiante = eventosPersona[id].idPersona;
		for(let i=0;i<personas.length;i++){
			if(idCambiante==personas[i].id){
				nombre = personas[i].nombre+" "+personas[i].apellido;
			}
		}
		idCambiante = eventosPersona[id].idPecera;
		for(let i=0;i<peceras.length;i++){
			if(idCambiante==peceras[i].id){
				pecera = peceras[i].nombre;
				break;
			}
		}
		idCambiante = eventosPersona[id].idEvento;
		for(let i=0;i<eventos.length;i++){
			if(idCambiante==eventos[i].id){
				evento = eventos[i].nombre;
				descripcion = eventos[i].descripcion;
				break;
			}
		}
		$("#ver-evento-solucion").append('<div><h6>Nombre: </h6><small class="text-muted">'+nombre+'</small></div><h1></h1>');
		$("#ver-evento-solucion").append('<div><h6>Pecera: </h6><small class="text-muted">'+pecera+'</small></div><h1></h1>');
		$("#ver-evento-solucion").append('<div><h6>Evento: </h6><small class="text-muted">'+evento+'</small></div><h1></h1>');
		$("#ver-evento-solucion").append('<div><h6>Descripción: </h6><small class="text-muted">'+descripcion+'</small></div><h1></h1>');
		$("#ver-evento-solucion").append('<div><h6>Observación: </h6><small class="text-muted">'+eventosPersona[id].observacion+'</small></div><h1></h1>');		
		$("#lista-eventos-soluciones").modal('hide');
		$("#ver-soluciones-eventos-otros").modal('show');
	}
}

function cambiarEventoCal(id){
	$("#text-area-evento-cal-descripcion").text('');
	$("#text-area-evento-cal-descripcion").append(eventos[id].descripcion);
}

function cambiarModalEvento(){
	$("#agregar-solucion").modal('hide');
	$("#lista-eventos-soluciones").modal('hide');
	$('#titulo-agregar-evento').text('Agregar evento '+fechaIdConsulta);
	$("#select-evento-cal").text('');
	for(let i=0;i<eventos.length;i++){
		if(eventos[i].activo=="SI"){
			$("#select-evento-cal").append('<option id='+i+' value="'+i+'">'+eventos[i].nombre+'</option>');
		}			
	}
	$("#select-pecera-cal").text('');
	for(let j=0;j<peceras.length;j++){
		$("#select-pecera-cal").append('<option id="'+j+'" value="'+j+'">'+peceras[j].nombre+'</option>');
	}
	$("#text-area-evento-cal-descripcion").text('');
	$("#text-area-evento-cal-descripcion").append(eventos[0].descripcion);
	$("#text-area-evento-cal-observacion").val('');
	$("#input-evento-cal").val("");
	$("#agregar-evento").modal('show');
}

function cambiarModalSolucion(){
	$("#agregar-evento").modal('hide');
	$("#lista-eventos-soluciones").modal('hide');
	$('#titulo-agregar-solucion').text('Agregar solución '+fechaIdConsulta);
	$("#select-solucion-cal").text("");
	$("#"+fechaIdConsulta+" input[id^='inci']").each(function(){
		let id = $(this).val();
		var peceraNombre, sensorNombre;
		for(let j=0;j<peceras.length;j++){
			if(peceras[j].id==incidenciaFecha[id].pecera){
				peceraNombre = peceras[j].nombre; 
				break;
			}
		}
		for(let k=0;k<sensores.length;k++){
			if(sensores[k].id==incidenciaFecha[id].sensor){
				sensorNombre = sensores[k].nombre; 
				break;
			}
		}
		$("#select-solucion-cal").append('<option id='+id+' value="'+id+'" select>'+peceraNombre+" / "+sensorNombre+": "+incidenciaFecha[id].valor+" / "+incidenciaFecha[id].hora+'</option>');
	});
	$("#input-solucion-cal").val("");
	$("#input-solucion-nombre-cal").val("");
	$("#text-area-solucion-cal-observacion").val("");
	$("#text-area-solucion-cal-accion").val("");
	$("#agregar-solucion").modal('show');
}

function agregarIncidencias(){
	var divisor = "-";
	var fechaDividida, fechaCambiante; 
	for(var i=0;i<incidenciaFecha.length;i++){
		fechaCambiante = incidenciaFecha[i].fecha; 
		fechaDividida = fechaCambiante.split(divisor);		
		$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).css("box-shadow","rgb(255, 128, 0) 0px -2px 0px 0px inset");
		$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).addClass("incidencia");
		$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).append("<input id=\"inci"+i+"\" name=\"inci"+i+"\" type=\"hidden\" value=\""+i+"\">");
		
	}
}

function agregarEventos(){
	var divisor = "-";
	var fechaDividida, fechaCambiante; 
	for(var i=0;i<eventosPersona.length;i++){
		fechaCambiante = eventosPersona[i].fecha; 
		fechaDividida = fechaCambiante.split(divisor);
		var variable = $('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).attr("class");
		if(variable===undefined){}else{
			if(variable.indexOf("incidencia")>0){
				$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).css({
					"box-shadow": "rgb(69, 165, 151) 0px -2px 0px 0px inset, rgb(255, 74, 50) 0px -4px 0px 0px inset"
				});
				$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).addClass("evento");
				$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).append("<input id=\"even"+i+"\" name=\"even"+i+"\" type=\"hidden\" value=\""+i+"\">");
			}else{
				$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).css("box-shadow","rgb(69, 165, 151) 0px -2px 0px 0px inset");
				$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).addClass("evento");
				$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).append("<input id=\"even"+i+"\" name=\"even"+i+"\" type=\"hidden\" value=\""+i+"\">");
			}
		}
	}

}

function agregarSoluciones(){
	var divisor = "-";
	var fechaDividida, fechaCambiante, fechaInc; 
	for(var i=0;i<solucion.length;i++){
		fechaInc = solucion[i].fechaIncidencia;
		for(var j=0;j<incidenciaFecha.length;j++){
			if(fechaInc==incidenciaFecha[j].id){
				fechaCambiante = incidenciaFecha[j].fecha;
				break;
			}
		}
		fechaDividida = fechaCambiante.split(divisor);
		$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).addClass("solucion");
		$('#'+fechaDividida[0]+"-"+(fechaDividida[1]*1)+"-"+(fechaDividida[2]*1)).append("<input id=\"solu"+i+"\" name=\"solu"+i+"\" type=\"hidden\" value=\""+i+"\">");
	}
}

function editarEventoCalendario(id){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($('#text-area-evento-cal-observacion-editar').val() == ""){
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$("#editar-evento").modal('hide');
		ver();
	$.post("calendario?opcion=6&id="+eventosPersona[id].id+"&idPersona="+eventosPersona[id].idPersona+"&idEvento="+eventos[$('#select-evento-cal-editar').val()].id+"&idPecera="+peceras[$('#select-pecera-cal-editar').val()].id+"&fecha="+eventosPersona[id].fecha+"&hora="+eventosPersona[id].hora+"&observacion="+$('#text-area-evento-cal-observacion-editar').val(), 
			function(responseText) {
		if("0"==responseText){
			noVer();
			alertify.error('problemas de conexión');
			alertify.set('notifier','delay', delay);				
		}else{
			eventosPersona[id].observacion = $('#text-area-evento-cal-observacion-editar').val();
			eventosPersona[id].idEvento = eventos[$('#select-evento-cal-editar').val()].id;
			eventosPersona[id].idPecera = peceras[$('#select-pecera-cal-editar').val()].id;
			alertify.success('Evento editado');
			alertify.set('notifier','delay', delay);
			noVer();			
		}
	});
	}
}

function editarSolucionCalendario(id){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	if($('#input-solucion-nombre-cal-editar').val() == "" || $('#text-area-solucion-cal-accion-editar').val() == "" || $('#text-area-solucion-cal-observacion-editar').val() == ""){
		alertify.error('Llena todos los campos');
		alertify.set('notifier','delay', delay);
	}else{
		$("#editar-solucion").modal('hide');
		ver();
		$.post("calendario?opcion=7&id="+solucion[id].id+"&idPersona="+solucion[id].persona+"&fechaIncidencia="+solucion[id].fechaIncidencia+"&fecha="+solucion[id].fecha+"&hora="+solucion[id].hora+"&nombre="+$('#input-solucion-nombre-cal-editar').val()+"&accion="+$('#text-area-solucion-cal-accion-editar').val()+"&observacion="+$('#text-area-solucion-cal-observacion-editar').val(), 
				function(responseText) {
			if("0"==responseText){
				noVer();
				alertify.error('problemas de conexión');
				alertify.set('notifier','delay', delay);				
			}else{
				solucion[id].nombre = $('#input-solucion-nombre-cal-editar').val();
				solucion[id].accion = $('#text-area-solucion-cal-accion-editar').val();
				solucion[id].observacion = $('#text-area-solucion-cal-observacion-editar').val();
				alertify.success('Solución editada');
				alertify.set('notifier','delay', delay);
				noVer();
			}
		});
	}
}

function ver(){
	$('#cargando').removeClass('no-ver');
    $('#cargando').addClass('ver');
}
function noVer(){
	$('#cargando').removeClass('ver');
    $('#cargando').addClass('no-ver');
}






