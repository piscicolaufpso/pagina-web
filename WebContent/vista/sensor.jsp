<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<h1>Sensores</h1>

<!--<div id="contenidoSensores"></div>-->

<div class="card"> 
	<div class="card-header">
		<select id="select-sensor" onchange='cambiarSensor(this.value);' class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect01">
		</select>
	</div>
	<div class="card-body"> 
        <div class="form-group">
        	<div class="input-group input-group-sm input-margen"> 
        		 <div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre del sensor" onmouseover="mostrarTooltip()"> 
        			  <span class="input-group-text fa fa-microchip"></span>
        		 </div> 
        		 <input id="nombre-sensor" class="form-control" name="nombre" type="text" value="" required> 
        		 <div class="input-group-prepend activo" >
        		 	  <div class="input-group-text" onclick="cambiarActivoSensor()">
        			  	   <span>Estado: </span>
        			  	   <span id="activo-sensor" class="fa fa-toggle-off"></span>
        			  </div>
        	 	 </div>
        	</div>
        </div>
        <label for="valoresEstadistica">Rangos generales</label>
        <div id="valoresEstadistica" class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="minimo" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-arrow-down"></span>
        		</div>
        		<input id="valor-minimo-estadistica" class="form-control" name="minimo" type="text" placeholder="Minimo" required>
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="maximo" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-arrow-up"></span>
        		</div>
        		<input id="valor-maximo-estadistica" class="form-control" name="maximo" type="text" placeholder="Maximo" required>
        </div>
        <br>
        <div class="form-group">
        	 <label for="exampleFormControlTextarea1">Descripción</label>
        	 <textarea id="text-area-sensor" class="form-control" id="exampleFormControlTextarea1" rows="3">contenido</textarea>
        </div>
        <div class="form-group"> 
        	 <div class="input-group"> 
        		  <div class="input-group-append"> 
        			   <button class="btn btn-outline-success" onclick="actualizarSensor()" type="button">Actualizar</button> 
        		  </div> 
        		  <div class="input-group-append"> 
        			    <button class="btn btn-outline-primary" onclick="agregarNuevoSensor()" type="button">Agregar nuevo</button> 
        		  </div>
        	 </div> 
        </div> 
   </div> 
</div>


<div id="agregar-sensor" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Agregar Sensor</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<label>Nombre Sensor:</label>
        <div class="input-group input-group-sm input-margen"> 
        	<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre del evento" onmouseover="mostrarTooltip()"> 
        		  <span class="input-group-text fa fa-microchip"></span>
        	</div> 
        	 <input id="nombre-sensor-nuevo" class="form-control" name="nombre" type="text" value="" required> 
        </div>
        <br>
        <label for="valoresEstadistica">Rangos generales</label>
        <div id="valoresEstadisticaNuevo" class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="minimo" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-arrow-down"></span>
        		</div>
        		<input id="valor-minimo-estadistica-nuevo" class="form-control" name="minimo" type="text" placeholder="Minimo" required>
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="maximo" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-arrow-up"></span>
        		</div>
        		<input id="valor-maximo-estadistica-nuevo" class="form-control" name="maximo" type="text" placeholder="Maximo" required>
        </div>
        <br>
        <div class="form-group">
        	 <label>Descripción:</label>
        	 <textarea id="text-area-sensor-nuevo" class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="guardarSensor()">Crear sensor</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

