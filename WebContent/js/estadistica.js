var sensoresLista, pecerasExistentes, pecerasDatos, ultimoDiaMes;
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var colores = ["#480032","#90aeff","#e7759a","#092a35","#ff5f5f","#fcf3ca","#08c299","#ff5e3a","#900048","#1c1124"];
var canvas, ctx, mychar;
var condicion = true;
function estadisticas(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 15);
	ver();
	$.post("estadisticas?extraer=1", 
			function(responseText) {
		if(responseText==0){
			alertify.error('Problemas de conexión recargue la página');
			alertify.set('notifier','delay', delay);
			noVer();
		}else{
			var patron = /,1-2-3|1-2-3/gi,
			nuevoValor = "",
			str = responseText.replace(patron,nuevoValor);
			var separador = "|";			
			var objetos = str.split(separador);
			sensoresLista = jQuery.parseJSON(objetos[0]);
			pecerasExistentes = jQuery.parseJSON(objetos[1]);
			noVer();
		}
	});
}

function estadisticaDia(){
	$("#select-pecera-dia").text('');
	$("#select-sensor-dia").text('');
	var booleano = true;
	for(let i=0;i<pecerasExistentes.length;i++){
		if(booleano){
			$("#select-pecera-dia").append('<option id='+i+' value="'+i+'" select>'+pecerasExistentes[i].nombre+'</option>');
			booleano = false;
		}else{
			$("#select-pecera-dia").append('<option id='+i+' value="'+i+'" >'+pecerasExistentes[i].nombre+'</option>');
		}
	}
	for(let i=0;i<sensoresLista.length;i++){
		if(booleano){
			$("#select-sensor-dia").append('<option id='+i+' value="'+i+'" select>'+sensoresLista[i].nombre+'</option>');
			booleano = false;
		}else{
			$("#select-sensor-dia").append('<option id='+i+' value="'+i+'" >'+sensoresLista[i].nombre+'</option>');
		}
	}
	$("#estadisticas-dia").modal("show");
}
function estadisticaMes(){
	$("#select-pecera-mes").text('');
	$("#select-sensor-mes").text('');
	var booleano = true;
	for(let i=0;i<pecerasExistentes.length;i++){
		if(booleano){
			$("#select-pecera-mes").append('<option id='+i+' value="'+i+'" select>'+pecerasExistentes[i].nombre+'</option>');
			booleano = false;
		}else{
			$("#select-pecera-mes").append('<option id='+i+' value="'+i+'" >'+pecerasExistentes[i].nombre+'</option>');
		}
	}
	for(let i=0;i<sensoresLista.length;i++){
		if(booleano){
			$("#select-sensor-mes").append('<option id='+i+' value="'+i+'" select>'+sensoresLista[i].nombre+'</option>');
			booleano = false;
		}else{
			$("#select-sensor-mes").append('<option id='+i+' value="'+i+'" >'+sensoresLista[i].nombre+'</option>');
		}
	}
	$("#estadisticas-mes").modal("show");
}
function estadisticaAno(){
	$("#select-pecera-ano").text('');
	$("#select-sensor-ano").text('');
	var booleano = true;
	for(let i=0;i<pecerasExistentes.length;i++){
		if(booleano){
			$("#select-pecera-ano").append('<option id='+i+' value="'+i+'" select>'+pecerasExistentes[i].nombre+'</option>');
			booleano = false;
		}else{
			$("#select-pecera-ano").append('<option id='+i+' value="'+i+'" >'+pecerasExistentes[i].nombre+'</option>');
		}
	}
	for(let i=0;i<sensoresLista.length;i++){
		if(booleano){
			$("#select-sensor-ano").append('<option id='+i+' value="'+i+'" select>'+sensoresLista[i].nombre+'</option>');
			booleano = false;
		}else{
			$("#select-sensor-ano").append('<option id='+i+' value="'+i+'" >'+sensoresLista[i].nombre+'</option>');
		}
	}
	$("#estadisticas-ano").modal("show");
}

function consultarDia(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	ver();
	if($("#fecha-dia").val() == ""){
		noVer();
		alertify.error('Coloca una fecha para calcular');
		alertify.set('notifier','delay', delay);
	}else{
		$("#estadisticas-dia").modal("hide");
		let posSensor = $("#select-sensor-dia").val();
		let posPecera = $("#select-pecera-dia").val();
		$.post("estadisticas?extraer=2&opcion=dia&fecha="+$("#fecha-dia").val()+"&pecera="+pecerasExistentes[posPecera].id+"&sensor="+sensoresLista[posSensor].id, 
				function(responseText) {
			var patron = /,1-2-3|1-2-3/gi,
			nuevoValor = "",
			str = responseText.replace(patron,nuevoValor);			
			if(str=="0"){
				if(!condicion){
					mychar.destroy();
				}
				$("#defecto").text("");
				$("#defecto").append("<h2 class=\"centrar-opciones\">No existen datos en las fechas seleccionadas</h2>");
			}else{
				$("#defecto").text("");
				var valores = [], horas = [];
				pecerasDatos = jQuery.parseJSON(str);
				for(var k=0;k<pecerasDatos.length;k++){
					valores.push(pecerasDatos[k].valor);
					horas.push(pecerasDatos[k].hora);					
				}
				canvas = document.getElementById('mychart');
				ctx = canvas.getContext('2d');
				if(condicion){
					condicion = false;
				}else{
					mychar.destroy();
				}
				mychar = new Chart(ctx, {
				    type: 'line',
				    data: {
				        labels: horas,
				        datasets: [{
						    label: pecerasExistentes[posPecera].nombre,
							backgroundColor: "#90aeff",
							borderColor: "#90aeff",
						    data: valores,
						    borderWidth: 1,
						    fill: false
						}]
				    },
				    options: {
				    	responsive: true,
						title: {
							display: true,
							fontSize: 20,
							text: 'Valores de '+sensoresLista[posSensor].nombre+' en la pecera: '+pecerasExistentes[posPecera].nombre+" el dia "+$("#fecha-dia").val()
						},
						scales: {
							xAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Horas'
								},
								ticks: {
									suggestedMin: sensoresLista[posSensor].minimo,
				                    suggestedMax: sensoresLista[posSensor].maximo
				                }
							}],
							yAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Valores'
								},
								ticks: {
									suggestedMin: sensoresLista[posSensor].minimo,
				                    suggestedMax: sensoresLista[posSensor].maximo
				                }
							}]
						}
				    }
				});
			}
			noVer();
		});
	}
}

function consultarMes(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	ver();
	if($("#fecha-mes").val() == ""){
		noVer();
		alertify.error('Coloca una fecha para calcular');
		alertify.set('notifier','delay', delay);
	}else{
		let posSensor = $("#select-sensor-mes").val();
		let posPecera = $("#select-pecera-mes").val();
		$("#estadisticas-mes").modal("hide");
		var fecha = $("#fecha-mes").val();
		var separador = "-";
		var objetos = fecha.split(separador);
		var ultimoDia = new Date(objetos[0], objetos[1], 0);
		ultimoDiaMes = ultimoDia.getDate();
		var fechaInicio = objetos[0]+"-"+objetos[1]+"-1";
		var fechaFin = objetos[0]+"-"+objetos[1]+"-"+ultimoDiaMes;
		$.post("estadisticas?extraer=2&opcion=mes&fechaInicio="+fechaInicio+"&fechaFin="+fechaFin+"&pecera="+pecerasExistentes[posPecera].id+"&sensor="+sensoresLista[posSensor].id, 
				function(responseText) {
			var patron = /,1-2-3|1-2-3/gi,
			nuevoValor = "",
			str = responseText.replace(patron,nuevoValor);
			if(str=="0"){
				if(!condicion){
					mychar.destroy();
				}
				$("#defecto").text("");
				$("#defecto").append("<h2 class=\"centrar-opciones\">No existen datos en las fechas seleccionadas</h2>");
			}else{
				$("#defecto").text("");
				var valores = [], dias = [];
				pecerasDatos = jQuery.parseJSON(str);
				for(var i=1;i<=ultimoDiaMes;i++){
					dias.push(i);
				}
				for(var j=1;j<=ultimoDiaMes;j++){
					valores.push(0);
				}
				var valoresDia = parseFloat(pecerasDatos[0].valor), numeroDatosDias = 1;
				var fechaDiaCambiante = "", fechaDiaConstante = pecerasDatos[0].fecha;
				var divisor = "-";
				var diaEspecifico = fechaDiaConstante.split(divisor);
				valores[diaEspecifico[2]-1] = valoresDia; 
				for(var k=1;k<pecerasDatos.length;k++){
					fechaDiaCambiante = pecerasDatos[k].fecha;
					if(fechaDiaConstante==fechaDiaCambiante){
						valoresDia += parseFloat(pecerasDatos[k].valor);
						numeroDatosDias++;
					}else{
						diaEspecifico = fechaDiaConstante.split(divisor);
						valores[diaEspecifico[2]-1] = dosDecimales(parseFloat(valoresDia/numeroDatosDias));
						fechaDiaConstante = pecerasDatos[k].fecha
						valoresDia = parseFloat(pecerasDatos[k].valor);
						numeroDatosDias = 1;
					}
				}
				fechaDiaCambiante = pecerasDatos[pecerasDatos.length-1].fecha;
				diaEspecifico = fechaDiaConstante.split(divisor);
				valores[diaEspecifico[2]-1] = dosDecimales(parseFloat(valoresDia/numeroDatosDias));
				canvas = document.getElementById('mychart');
				ctx = canvas.getContext('2d');
				if(condicion){
					condicion = false;
				}else{
					mychar.destroy();
				}
				mychar = new Chart(ctx, {
				    type: 'line',
				    data: {
				        labels: dias,
				        datasets: [{
						    label: pecerasExistentes[posPecera].nombre,
							backgroundColor: "#90aeff",
							borderColor: "#90aeff",
						    data: valores,
						    borderWidth: 1,
						    fill: false
						}]
				    },
				    options: {
				    	responsive: true,
						title: {
							display: true,
							fontSize: 20,
							text: 'Valores de '+sensoresLista[posSensor].nombre+' en la pecera: '+pecerasExistentes[posPecera].nombre+" el mes de "+meses[objetos[1]-1]
						},
						scales: {
							xAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Dias'
								},
								ticks: {
									suggestedMin: sensoresLista[posSensor].minimo,
				                    suggestedMax: sensoresLista[posSensor].maximo
				                }
							}],
							yAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Valores'
								},
								ticks: {
									suggestedMin: sensoresLista[posSensor].minimo,
				                    suggestedMax: sensoresLista[posSensor].maximo
				                }
							}]
						}
				    }
				});
				
			}
			noVer();
		});
	}
}

function consultarAno(){
	var delay = alertify.get('notifier','delay');
	alertify.set('notifier','delay', 10);
	ver();
	if($("#fecha-ano").val() == ""){
		noVer();
		alertify.error('Coloca una fecha para calcular');
		alertify.set('notifier','delay', delay);
	}else{
		var fecha = $("#fecha-ano").val();
		let posSensor = $("#select-sensor-ano").val();
		let posPecera = $("#select-pecera-ano").val();
		$("#estadisticas-ano").modal("hide");
		var separador = "-";
		var objetos = fecha.split(separador);
		var fechaInicio = objetos[0]+"-1-1";
		var fechaFin = objetos[0]+"-12-31";
		$.post("estadisticas?extraer=2&opcion=ano&fechaInicio="+fechaInicio+"&fechaFin="+fechaFin+"&pecera="+pecerasExistentes[posPecera].id+"&sensor="+sensoresLista[posSensor].id, 
				function(responseText) {
			var patron = /,1-2-3|1-2-3/gi,
			nuevoValor = "",
			str = responseText.replace(patron,nuevoValor);
			if(str=="0"){
				if(!condicion){
					mychar.destroy();
				}
				$("#defecto").text("");
				$("#defecto").append("<h2 class=\"centrar-opciones\">No existen datos en las fechas seleccionadas</h2>");
			}else{
				$("#defecto").text("");
				pecerasDatos = jQuery.parseJSON(str);
				var valores = [];
				for(var j=1;j<=12;j++){
					valores.push(0);
				}
				var valoresDia = parseFloat(pecerasDatos[0].valor), numeroDatosDias = 1;
				var fechaDiaCambiante = "", fechaDiaConstante = pecerasDatos[0].fecha;
				var divisor = "-";
				var diaEspecifico = fechaDiaConstante.split(divisor);
				valores[diaEspecifico[1]-1] = valoresDia; 
				fechaDiaConstante = diaEspecifico[1];
				for(var k=1;k<pecerasDatos.length;k++){
					fechaDiaCambiante = pecerasDatos[k].fecha;
					diaEspecifico = fechaDiaCambiante.split(divisor);
					if(fechaDiaConstante==diaEspecifico[1]){
						valoresDia += parseFloat(pecerasDatos[k].valor);
						numeroDatosDias++;
					}else{
						valores[diaEspecifico[1]-1] = dosDecimales(parseFloat(valoresDia/numeroDatosDias));
						fechaDiaConstante =diaEspecifico[1];
						valoresDia = parseFloat(pecerasDatos[k].valor);
						numeroDatosDias = 1;
					}
				}
				fechaDiaCambiante = pecerasDatos[pecerasDatos.length-1].fecha;
				diaEspecifico = fechaDiaCambiante.split(divisor);
				valores[diaEspecifico[1]-1] = dosDecimales(parseFloat(valoresDia/numeroDatosDias));
				canvas = document.getElementById('mychart');
				ctx = canvas.getContext('2d');
				if(condicion){
					condicion = false;
				}else{
					mychar.destroy();
				}
				mychar = new Chart(ctx, {
				    type: 'line',
				    data: {
				        labels: meses,
				        datasets: [{
						    label: pecerasExistentes[posPecera].nombre,
							backgroundColor: "#90aeff",
							borderColor: "#90aeff",
						    data: valores,
						    borderWidth: 1,
						    fill: false
						}]
				    },
				    options: {
				    	responsive: true,
						title: {
							display: true,
							fontSize: 20,
							text: 'Valores de '+sensoresLista[posSensor].nombre+' en la pecera: '+pecerasExistentes[posPecera].nombre+" el año "+objetos[0]
						},
						scales: {
							xAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Meses'
								},
								ticks: {
									suggestedMin: sensoresLista[posSensor].minimo,
				                    suggestedMax: sensoresLista[posSensor].maximo
				                }
							}],
							yAxes: [{
								display: true,
								scaleLabel: {
									display: true,
									labelString: 'Valores'
								},
								ticks: {
									suggestedMin: sensoresLista[posSensor].minimo,
				                    suggestedMax: sensoresLista[posSensor].maximo
				                }
							}]
						}
				    }
				});
			}
			noVer();
		});
	}
}
function dosDecimales(n) {
	  let t=n.toString();
	  let regex=/(\d*.\d{0,2})/;
	  return t.match(regex)[0];
}
function ver(){
	$('#cargando').removeClass('no-ver');
    $('#cargando').addClass('ver');
}
function noVer(){
	$('#cargando').removeClass('ver');
    $('#cargando').addClass('no-ver');
}

