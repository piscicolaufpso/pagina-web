<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import="modelo.persona"
	import="modelo.persona_perfil"
	session="true"
	%>
<%	HttpSession sesion = request.getSession();
	persona p = (persona)sesion.getAttribute("usuario");
%>
<h1>Usuario</h1>

<div class="card">
  <div class="card-body">
  	<form id="formulario-usuario" name="formulario-usuario">
  		<h3 class="text-success"><%out.print(sesion.getAttribute("rol")); %></h3>
  		<hr align="left" noshade="noshade" size="2" width="100%" color="#DFDFDF"/>
  		<input id="id-usuario" type="hidden" name="id" value="<%out.print(p.getId());%>">
  		<div class="form-group">
	  		<div class="input-group input-group-sm input-margen">
	  			<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre y apellido" onmouseover="mostrarTooltip()">
	    			<span class="input-group-text fa fa-user-o" ></span>
	  			</div>
	  			<input id="nombre-usuario" class="form-control" name="nombre" type="text" onkeypress="return soloLetras(event);" placeholder="Nombre" value="<%out.print(p.getNombre());%>" required>
	  			<input id="apellido-usuario" class="form-control" name="apellido" type="text" onkeypress="return soloLetras(event);" placeholder="Apellido" value="<%out.print(p.getApellido());%>" required>
			</div>
		</div>
		 <div class="form-group">
			<div class="input-group">
  				<div class="input-group-prepend">
    				<div class="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Genero: Femenino" onmouseover="mostrarTooltip()">
    					<input type="radio" name="genero" value="F" <%if(p.getGenero().equals("F")){out.print("checked");} %>><span class="fa fa-female"></span>
    				</div>
    				<div class="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Genero: Masculino" onmouseover="mostrarTooltip()">
    					<input type="radio" name="genero" value="M" <%if(p.getGenero().equals("M")){out.print("checked");} %>><span class="fa fa-male"></span>
    				</div>
				</div>
			</div>
        </div>
        <div class="form-group">
	        <div class="input-group input-group-sm input-margen">
	        	<div class="input-group-addon"  data-toggle="tooltip" data-placement="bottom" title="Fecha de nacimiento" onmouseover="mostrarTooltip()"><span class="fa fa-calendar"></span></div>
	        	<input id="fecha-usuario" class="form-control" name="fecha" type="date" value="<% out.print(p.getFecha_nacimiento()); %>" required>	
	        </div>
        </div>
        <div class="form-group"> 
			<div class="input-group input-group-sm input-margen">
        		<div class="input-group-addon" data-toggle="tooltip" data-placement="bottom" title="Contraseña" onmouseover="mostrarTooltip()"><span class="fa fa-lock"></span></div>
        			<input id="contrasena-usuario" class="form-control" name="clave" type="password" placeholder="Contraseña" value="<% out.print(p.getClave()); %>" required>
        			<div class="input-group-addon" onclick="verClave()" data-toggle="tooltip" data-placement="bottom" title="Ver contraseña" onmouseover="mostrarTooltip()"><span id="icono" class="fa fa-eye"></span></div>
        	</div>
		</div>
        <div class="form-group">
			<div class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Correo electronico" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-at" ></span>
        		</div>
        		<input id="correo-usuario" class="form-control" name="correo" type="email" placeholder="Correo" value="<% out.print(p.getCorreo()); %>" required>
        		<div class="input-group-prepend">
        			<span class="input-group-text fa fa-id-card-o" data-toggle="tooltip" data-placement="bottom" title="Documento de identificación" onmouseover="mostrarTooltip()"></span>
        		</div>
        		<input id="documento-usuario" class="form-control" name="documento" type="text" placeholder="documento" onkeypress="return soloNumeros(event);" value="<% out.print(p.getDocumento()); %>" required>
        	</div>
        </div>
        <button id="botonActualizar" class="btn btn-primary" onclick="actualizarUsuario(event)">Actualizar</button>
    </form>
  </div>
</div>