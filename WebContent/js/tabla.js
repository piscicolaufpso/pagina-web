var datosTabla,listaPeceras, listaSensores;

function traerDatos(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	ver();
	if($("#fecha-inicio").val() == "" || $("#fecha-fin").val() == ""){
		noVer();
		alertify.error('Coloca fecha de inicio y fin para calcular');
		alertify.set('notifier','delay', delay);
	}else if($("#fecha-inicio").val() > $("#fecha-fin").val()){
		noVer();
		alertify.error('La fecha de inicio no puede ser mayor a la fecha final');
		alertify.set('notifier','delay', delay);
	}else{
		$.post("tablas?fechaIni="+$("#fecha-inicio").val()+"&fechaFin="+$("#fecha-fin").val(), 
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
				listaSensores = jQuery.parseJSON(objetos[0]);
				listaPeceras = jQuery.parseJSON(objetos[1]);
				if(objetos[2]=="0"){
					$("#tablaDatos").text("");
					$("#defecto").text("");
					$("#tablaDatos").append("<h2 class=\"centrar-opciones\">No existen datos en las fechas seleccionadas</h2>");
				}else{
					$("#tablaDatos").text("");
					$("#defecto").text("");
					$("#tablaDatos").append("<thead class=\"thead-light\"><tr><th scope=\"col\">Pecera</th><th scope=\"col\">Ver</th></tr></thead>");
					$("#tablaDatos").append("<tbody class=\"tbody\">");
					for(let i=0;i<listaPeceras.length;i++){
						for(let j=0;j<listaSensores.length;j++){
							$("#tablaDatos").append("<tr><th scope=\"col\">"+listaPeceras[i].nombre+"</th><th scope=\"col\"><div class=\"form-group\"><div class=\"input-group input-group-sm input-margen\"><div class=\"input-group-addon activo\" onclick=\"verInfo("+i+","+j+")\"><strong>"+listaSensores[j].nombre+" </strong></div></div></div></th></tr>");
						}
					}
					$("#tablaDatos").append("</tbody>");
					datosTabla = jQuery.parseJSON(objetos[2]);
				}
				noVer();
			}
		});
	}
}
function verInfo(id,idSensor){
	var doc = new jsPDF();
	var titulo = ['Datos de la pecera : '+listaPeceras[id].nombre];
	var falso = new Array(1);
	doc.autoTable(titulo, falso, {
		theme: 'plain',
		styles: {
	    	fontSize: 20,
	    	font: "times",
	    	textColor: [253, 254, 254],
	    	fillColor: [205, 92, 92]
	    }
	});
	var titulo2 = ["Peces en esta pecera: "];
	var descripcionFalso = new Array();
	var descripcion = new Array();
	var condicion = true, condicion2 = true;
	for(var l=0;l<listaPeceras[id].pescados.length;l++){
		if(condicion){
			titulo2[0] +=  listaPeceras[id].pescados[l].nombre;
			descripcion.push(listaPeceras[id].pescados[l].nombre);
			condicion = false;
		}else{
			for(var p=0;p<descripcion.length;p++){
				if(p!=l){
					if(descripcion[p]==listaPeceras[id].pescados[l].nombre){
						condicion2 = false;
					}
				}
			}
			if(condicion2){
				titulo2[0] +=  ", "+listaPeceras[id].pescados[l].nombre;
				descripcion.push(listaPeceras[id].pescados[l].nombre);
			}
		}
	}
	var posPrincipal = doc.autoTableEndPosY();
	doc.autoTable(titulo2, descripcionFalso, {
	    styles: {fillColor: [200, 220, 240]},
	    margin: {top: posPrincipal},
	    theme: 'plain'
	});
	var columna = ["Fecha", "Hora",listaSensores[idSensor].nombre];
	var datoString = "";
	var rows = new Array(); 
	for(var i=0;i<datosTabla.length;i++){
		if(datosTabla[i].pecera==listaPeceras[id].id){
			if(listaSensores[idSensor].idSensor==datosTabla[i].sensor){
				datoString += datosTabla[i].fecha+"|"+datosTabla[i].hora+"|"+datosTabla[i].valor;
				var separador = "|";
				var objetos = datoString.split(separador);
				rows.push(objetos);
				datoString = "";
			}
		}
	}
	var pos = doc.autoTableEndPosY();
	doc.autoTable(columna, rows, {
	    margin: {top: pos}
	});
	doc.save('table.pdf');
}
function ver(){
	$('#cargando').removeClass('no-ver');
    $('#cargando').addClass('ver');
}
function noVer(){
	$('#cargando').removeClass('ver');
    $('#cargando').addClass('no-ver');
}