var cambio=true;
function verClave(){
	if(cambio){
		$('#icono').removeClass('fa-eye');
	    $('#icono').addClass('fa-eye-slash');
	    $('#contrasena').attr('type','text');               
	}else{
	    $('#icono').removeClass('fa-eye-slash');
	    $('#icono').addClass('fa-eye');
	    $('#contrasena').attr('type','password');
	}
	cambio = !cambio;
}

function recuperarClave(){
	$("#error-campos").attr('style','display:none');
	$("#bien-correo").attr('style','display:none');
	$("#error-sistema").attr('style','display:none');
	var email = document.getElementById('correo-recuperar');
	if(!email.validity.valid){
		$("#error-campos").removeAttr('style');
		$("#bien-correo").attr('style','display:none');
		$("#error-sistema").attr('style','display:none');

	}else{
		ver();
		$.post("opciones?correo-recuperar="+$("#correo-recuperar").val(), 
				function(responseText) {
			if("0"==responseText){
				noVer();
				$("#error-campos").attr('style','display:none');
				$("#bien-correo").attr('style','display:none');
				$("#error-sistema").removeAttr('style');			
			}else{
				noVer();
				$("#error-campos").attr('style','display:none');
				$("#bien-correo").removeAttr('style');
				$("#error-sistema").attr('style','display:none');
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
