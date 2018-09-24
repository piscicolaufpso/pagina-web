<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<h1>Eventos</h1>

<!--<div id="contenidoEventos"></div>-->

<div class="card"> 
	<div class="card-header">
		<select id="select-evento" onchange='cambiarEvento(this.value);' class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect01">
		</select>
	</div>
	<div class="card-body"> 
        <div class="form-group">
        	<div class="input-group input-group-sm input-margen"> 
        		 <div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre del evento" onmouseover="mostrarTooltip()"> 
        			  <span class="input-group-text fa fa-info-circle"></span>
        		 </div> 
        		 <input id="nombre-evento" class="form-control" name="nombre" type="text" value="" required> 
        		 <div class="input-group-prepend activo">
        		 	  <div class="input-group-text" onclick="cambiarActivoEvento()">
        			  	   <span>Estado: </span>
        			  	   <span id="activo-evento" class="fa fa-toggle-off"></span>
        			  </div>
        	 	 </div>
        	</div>
        </div>
        <div class="form-group">
        	 <label for="exampleFormControlTextarea1">Descripción:</label>
        	 <textarea id="text-area-evento" class="form-control" id="exampleFormControlTextarea1" rows="3" required>contenido</textarea>
        </div>
        <div class="form-group"> 
        	 <div class="input-group"> 
        		  <div class="input-group-append"> 
        			   <button class="btn btn-outline-success" onclick="actualizarEvento()" type="button">Actualizar</button> 
        		  </div> 
        		  <div class="input-group-append"> 
        			    <button class="btn btn-outline-primary" onclick="agregarNuevoEvento()" type="button">Agregar nuevo</button> 
        		  </div>
        	 </div> 
        </div> 
   </div> 
</div>

<div id="agregar-evento" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Agregar Evento</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<label>Nombre Evento:</label>
        <div class="input-group input-group-sm input-margen"> 
        	<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre del evento" onmouseover="mostrarTooltip()"> 
        		  <span class="input-group-text fa fa-info-circle"></span>
        	</div> 
        	 <input id="nombre-evento-nuevo" class="form-control" name="nombre" type="text" value="" required> 
        </div>
        <div class="form-group">
        	 <label>Descripción:</label>
        	 <textarea id="text-area-evento-nuevo" class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="guardarEvento()">Crear evento</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
