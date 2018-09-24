<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page session="true" %>
<% 
	HttpSession sesion = request.getSession();
	if (sesion.getAttribute("usuario") != null){
		String url = response.encodeRedirectURL("tablero.jsp");
		response.sendRedirect(url);
	}
%> 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
    	<meta name="robots" content="all,follow">
		<title>Login</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/font-awesome.min.css">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,700">
		<link rel="stylesheet" href="css/login.css">
		<link rel="stylesheet" href="css/general.css">
		<style>
			.alerta{
				margin: 1em;
				z-index: 5;
			}
		</style>
	</head>
	<body>
	<% 
		String error = (String) sesion.getAttribute("error");
		if(error != null){
			if(error.equals("2")){
				out.print("<div class='alerta alert alert-danger alert-dismissible fade show' role='alert'><strong> No existes en el sistema</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
			}else{
				out.print("<div class='alerta alert alert-danger alert-dismissible fade show' role='alert'><strong> Datos erroneos</strong><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>");
			}
		}
	%>
		<div class="container principal">
			<div class="row"> 
			    <div class="col-sm contorno contorno-informacion">			
				    <h2 class="display-4">Proyecto piscícola</h2>
				    <a href="#"><strong>Universidad Francisco de Paula Santander Ocaña</strong></a>
			    </div>
			    <div class="col-sm bg-light contorno contorno-formulario">
			      <form class="form contorno-form" method="POST" action="principal">
			      	<div class="icono">
			      		<span class="fa fa-user fa-5x"></span>
			      	</div>
			      	<div class="form-group">
			       		<div class="input-group input-group-sm input-margen">
                        	 <div class="input-group-addon"><span class="fa fa-at"></span></div>
                         	<input id="correo" class="form-control" name="correo" type="email" placeholder="Correo" required>
                    	</div>
                  	</div>
                  	<div class="form-group"> 
			        	<div class="input-group input-group-sm input-margen">
                        	<div class="input-group-addon"><span class="fa fa-lock"></span></div>
                        	<input id="contrasena" class="form-control" name="clave" type="password" placeholder="Contraseña" required>
                        	<div class="input-group-addon" onclick="verClave()"><span id="icono" class="fa fa-eye"></span></div>
                    	</div>
			        </div>
			        <button id="boton_inicio" class="btn btn-primary" Type="submit">Enviar</button><br><br>
			        <a href="#" class="recuperar" data-toggle="modal" data-target="#exampleModal"><i>Olvidaste tu contraseña?</i></a>
			      </form>
			    </div>			
			</div>
		</div>
		
		<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div id="cargando" class="no-ver">
			<i id="icono-cargando" class="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
			<span class="sr-only">Loading...</span>
		</div>
  			<div class="modal-dialog" role="document">
    			<div class="modal-content">
      				<div class="modal-header">
        				<h5 class="modal-title" id="exampleModalLabel">Recuperar contraseña</h5>
        				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
          					<span aria-hidden="true">&times;</span>
        				</button>
      				</div>
      				<div class="modal-body">
	        			<div class="form-group">
				       		<div class="input-group input-group-sm input-margen">
	                        	<div class="input-group-addon"><span class="fa fa-at"></span></div>
	                         	<input id="correo-recuperar" class="form-control" name="correoRecuperar" type="email" placeholder="Correo" required>
	                    	</div>
	                  	</div>
      				</div>
      				<div id="error-campos" class='alerta alert alert-danger' role='alert' style="display:none;" ><strong> llena todos los campos o Escriba una dirección correcta</strong></div>
      				<div id="error-sistema" class='alerta alert alert-warning' role='alert' style="display:none;" ><strong> No existes en el sistema</strong></div>
      				<div id="bien-correo" class='alerta alert alert-success' role='alert' style="display:none;" ><strong> Verifica tu correo</strong></div>
      				<div class="modal-footer">
        				<button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        				<button type="button" class="btn btn-primary" onClick="recuperarClave()">Enviar</button>
      				</div>
    			</div>
  			</div>
		</div>
		
		<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>
		<script src="js/jquery-3.2.1.min.js"></script>
		<script src="js/popper.min.js"></script>		
      	<script src="js/bootstrap.min.js"></script>
      	
      	<script src="js/Script.js"></script>
	</body>
</html>