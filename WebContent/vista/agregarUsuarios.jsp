<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<h1>Gestión de operarios</h1>

<div id="contenidoAgregarUsuario"></div>

<table class="table"> 
		<thead class="thead-light"> 
			<tr> 
        		<th scope="col">Nombre</th>  
        		<th scope="col">Correo</th> 
        		<th scope="col">Opciones</th> 
        	</tr> 
        </thead> 
       <tbody id="usuarios">
    
			
        </tbody>
        <tfoot>
        	<tr>
        		<th scope="row" colspan="3"><button id="botonAgregar" class="btn btn-primary" onclick="agregarUsuarios()">Agregar</button></th> 
        	</tr> 
        </tfoot> 
</table>

<div id="agregar-usuario" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Crear usuario</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<form id="formulario-usuario" name="formulario-usuario">
	  		<div class="form-group">
		  		<div class="input-group input-group-sm input-margen">
		  			<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre" onmouseover="mostrarTooltip()">
		    			<span class="input-group-text fa fa-user-o" ></span>
		  			</div>
		  			<input id="nombre-usuario-nuevo" class="form-control" name="nombre" type="text" onkeypress="return soloLetras(event);" placeholder="Nombre" value="" required>		  			
				</div>
			</div>
			<div class="form-group">
				<div class="input-group input-group-sm input-margen">
		  			<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Apellido" onmouseover="mostrarTooltip()">
		    			<span class="input-group-text fa fa-user-o" ></span>
		  			</div>
		  			<input id="apellido-usuario-nuevo" class="form-control" name="apellido" type="text" onkeypress="return soloLetras(event);" placeholder="Apellido" value="" required>
		  		</div>
			</div>
		 <div class="form-group">
			<div class="input-group">
  				<div class="input-group-prepend">
    				<div class="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Genero: Femenino" onmouseover="mostrarTooltip()">
    					<input type="radio" name="genero-nuevo" value="F"><span class="fa fa-female"></span>
    				</div>
    				<div class="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Genero: Masculino" onmouseover="mostrarTooltip()">
    					<input type="radio" name="genero-nuevo" value="M"><span class="fa fa-male"></span>
    				</div>
				</div>
			</div>
        </div>
        <div class="form-group">
	        <div class="input-group input-group-sm input-margen">
	        	<div class="input-group-addon"  data-toggle="tooltip" data-placement="bottom" title="Fecha de nacimiento" onmouseover="mostrarTooltip()"><span class="fa fa-calendar"></span></div>
	        	<input id="fecha-usuario-nuevo" class="form-control" name="fecha" type="date" value="" required>	
	        </div>
        </div>
        <div class="form-group"> 
			<div class="input-group input-group-sm input-margen">
        		<div class="input-group-addon" data-toggle="tooltip" data-placement="bottom" title="Contraseña" onmouseover="mostrarTooltip()"><span class="fa fa-lock"></span></div>
        			<input id="contrasena-usuario-nuevo" class="form-control" name="clave" type="password" placeholder="Contraseña" value="" required>
        			<div class="input-group-addon" onclick="verClave()" data-toggle="tooltip" data-placement="bottom" title="Ver contraseña" onmouseover="mostrarTooltip()"><span id="icono" class="fa fa-eye"></span></div>
        	</div>
		</div>
        <div class="form-group">
			<div class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Correo electronico" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-at" ></span>
        		</div>
        		<input id="correo-usuario-nuevo" class="form-control" name="correo" type="email" placeholder="Correo" value="" required>        		
        	</div>
        </div>
        <div class="form-group">
        	<div class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend">
        			<span class="input-group-text fa fa-id-card-o" data-toggle="tooltip" data-placement="bottom" title="Documento de identificación" onmouseover="mostrarTooltip()"></span>
        		</div>
        		<input id="documento-usuario-nuevo" class="form-control" name="documento" type="text" placeholder="documento" onkeypress="return soloNumeros(event);" value="" required>
        	</div>
        </div>
    </form>
      </div>
      <div class="modal-footer">
        <button id="boton-modal-usuarios" type="button" class="btn btn-primary" onclick="crearUsuario()">Crear</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div id="actualizar-usuario" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="titulo-usuarios" class="modal-title">Actualizar usuario</h2>
        <input id="pos-usuario" type="hidden" name="id" value="">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<form id="formulario-usuario" name="formulario-usuario">
	  		<div class="form-group">
		  		<div class="input-group input-group-sm input-margen">
		  			<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre" onmouseover="mostrarTooltip()">
		    			<span class="input-group-text fa fa-user-o" ></span>
		  			</div>
		  			<input id="nombre-usuario" class="form-control" name="nombre" type="text" onkeypress="return soloLetras(event);" placeholder="Nombre" value="" required>		  			
				</div>
			</div>
			<div class="form-group">
				<div class="input-group input-group-sm input-margen">
		  			<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Apellido" onmouseover="mostrarTooltip()">
		    			<span class="input-group-text fa fa-user-o" ></span>
		  			</div>
		  			<input id="apellido-usuario" class="form-control" name="apellido" type="text" onkeypress="return soloLetras(event);" placeholder="Apellido" value="" required>
		  		</div>
			</div>
		 <div class="form-group">
			<div class="input-group">
  				<div class="input-group-prepend">
    				<div class="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Genero: Femenino" onmouseover="mostrarTooltip()">
    					<input id="mujer-usuario" type="radio" name="genero" value="F"><span class="fa fa-female"></span>
    				</div>
    				<div class="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Genero: Masculino" onmouseover="mostrarTooltip()">
    					<input id="hombre-usuario" type="radio" name="genero" value="M"><span class="fa fa-male"></span>
    				</div>
				</div>
			</div>
        </div>
        <div class="form-group">
	        <div class="input-group input-group-sm input-margen">
	        	<div class="input-group-addon"  data-toggle="tooltip" data-placement="bottom" title="Fecha de nacimiento" onmouseover="mostrarTooltip()"><span class="fa fa-calendar"></span></div>
	        	<input id="fecha-usuario" class="form-control" name="fecha" type="date" value="" required>	
	        </div>
        </div>
        <div class="form-group"> 
			<div class="input-group input-group-sm input-margen">
        		<div class="input-group-addon" data-toggle="tooltip" data-placement="bottom" title="Contraseña" onmouseover="mostrarTooltip()"><span class="fa fa-lock"></span></div>
        			<input id="contrasena-usuario" class="form-control" name="clave" type="password" placeholder="Contraseña" value="" required>
        			<div class="input-group-addon" onclick="verClave()" data-toggle="tooltip" data-placement="bottom" title="Ver contraseña" onmouseover="mostrarTooltip()"><span id="icono" class="fa fa-eye"></span></div>
        	</div>
		</div>
        <div class="form-group">
			<div class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Correo electronico" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-at" ></span>
        		</div>
        		<input id="correo-usuario" class="form-control" name="correo" type="email" placeholder="Correo" value="" required>        		
        	</div>
        </div>
        <div class="form-group">
        	<div class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend">
        			<span class="input-group-text fa fa-id-card-o" data-toggle="tooltip" data-placement="bottom" title="Documento de identificación" onmouseover="mostrarTooltip()"></span>
        		</div>
        		<input id="documento-usuario" class="form-control" name="documento" type="text" placeholder="documento" onkeypress="return soloNumeros(event);" value="" required>
        	</div>
        </div>
    </form>
      </div>
      <div class="modal-footer">
        <button id="boton-modal-usuarios" type="button" class="btn btn-primary" onclick="editarUsuario()" >Actualizar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>