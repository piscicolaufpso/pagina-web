<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<h1>Peces</h1>

<div id="contenidoPeces"></div>

<div class="card">
	<div class="card-header"> 
		<select id="select-pez" onchange='cambiarPez(this.value);' class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect01">
		</select>
	</div>
	<div class="card-body"> 
    	<div class="form-group"> 
        	<div class="input-group input-group-sm input-margen"> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre comun del pez" onmouseover="mostrarTooltip()"> 
        		     <span class="input-group-text fa fa-id-card-o"></span> 
        		</div>
        		<input id="nombre-pez" class="form-control" name="nombre" type="text" placeholder="Nombre" value="" required> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre cientifco del pez" onmouseover="mostrarTooltip()"> 
        		    <span class="input-group-text fa fa-id-card"></span> 
        	 	</div> 
        		<input id="cientifico-pez" class="form-control" name="cientifico" type="text" placeholder="Nombre cientifico" value="" required> 
        	</div> 
        </div> 
        <div class="form-group"> 
        	<div class="input-group input-group-sm input-margen"> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Procedencia del pez" onmouseover="mostrarTooltip()"> 
        		    <span class="input-group-text fa fa-globe "></span> 
        		</div> 
        		<input id="origen-pez" class="form-control" name="origen" type="text" placeholder="Origen" value=""> 
        	</div> 
        </div> 
        <div class="form-group"> 
        	<div class="input-group input-group-sm input-margen"> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Genero del pez" onmouseover="mostrarTooltip()"> 
        		    <span class="input-group-text fa fa-circle-o"></span> 
        		</div> 
        		<input id="genero-pez" class="form-control" name="genero" type="text" placeholder="Genero" value=""> 
        	</div> 
        </div> 
        <div class="form-group"> 
        	<label for="exampleFormControlTextarea1">Descripción</label> 
        	<textarea id="text-area-pez" class="form-control" rows="3"></textarea> 
        </div> 
    	<div class="form-group"> 
        	<div class="input-group"> 
        		<div class="input-group-append"> 
        			<button onclick="actualizarPez()" class="btn btn-outline-success" type="button">Actualizar</button> 
        		</div> 
        		<div class="input-group-append"> 
        			<button onclick="agregarPez()" class="btn btn-outline-primary" type="button">Agregar nuevo</button> 
        		</div>	 
        	</div> 
        </div>
	</div>
	<div class="card-header">
		<select id="select-sensor-rango" onchange='cambiarSensorRango(this.value);' class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect01">
		</select>
	</div>
	<table class="table"> 
        <tbody>
 			<tr class="table-success"> 
        		<th>Rango estable</th> 
        	</tr> 
        	<tr> 
        	    <th> 
					<div class="form-group"> 
						<div class="input-group input-group-sm input-margen"> 
							<div class="input-group-prepend" data-toggle="tooltip" data-placement="left" title="Valor minimo" onmouseover="mostrarTooltip()"> 
								<span class="input-group-text fa fa-long-arrow-down"></span> 
							</div> 
							<input id="minimo-pez" class="form-control" name="minimo" type="text" placeholder="minimo" required> 
							<div class="input-group-prepend" data-toggle="tooltip" data-placement="right" title="Valor maximo" onmouseover="mostrarTooltip()"> 
								<span class="input-group-text fa fa-long-arrow-up"></span> 
							</div> 
							<input id="maximo-pez" class="form-control" name="maximo" type="text" placeholder="maximo" required> 
						</div> 
					</div> 
					<button id="botonActualizar" onclick="actualizarRango()" class="btn btn-info">Actualizar</button> 
        		</th> 
        	</tr> 
		</tbody>
	</table>
	<table class="table table-sm" > 
        <thead>
        	<tr class="table-success"> 
        		<th colspan="3" >Rangos indicadores</th> 
        	</tr> 
        	<tr class="table-secondary">
        		<th>Min</th>
        		<th>Max</th>
        		<th>Opciones</th>
        	</tr>
        </thead>
        <tbody id="indicadores-pez">
        	
        </tbody>
        <tfoot>
        	<tr><th colspan="3" ><button id="botonActualizar" onclick="agregarIndicador()" class="btn btn-primary">Agregar indicador</button></th></tr> 
        </tfoot>
	</table>
</div>

<div id="agregar-pez" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Agregar pez</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<div class="card-body"> 
    	<div class="form-group"> 
        	<div class="input-group input-group-sm input-margen"> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre comun del pez" onmouseover="mostrarTooltip()"> 
        		     <span class="input-group-text fa fa-id-card-o"></span> 
        		</div>
        		<input id="nombre-pez-nuevo" class="form-control" name="nombre" type="text" placeholder="Nombre" value="" required>
        	</div>
        </div>
        <div class="form-group"> 
        	<div class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre cientifco del pez" onmouseover="mostrarTooltip()"> 
        		    <span class="input-group-text fa fa-id-card"></span> 
        	 	</div> 
        		<input id="cientifico-pez-nuevo" class="form-control" name="cientifico" type="text" placeholder="Nombre cientifico" value="" required> 
        	</div> 
        </div> 
        <div class="form-group"> 
        	<div class="input-group input-group-sm input-margen"> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Procedencia del pez" onmouseover="mostrarTooltip()"> 
        		    <span class="input-group-text fa fa-globe "></span> 
        		</div> 
        		<input id="origen-pez-nuevo" class="form-control" name="origen" type="text" placeholder="Origen" value=""> 
        	</div> 
        </div> 
        <div class="form-group"> 
        	<div class="input-group input-group-sm input-margen"> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Genero del pez" onmouseover="mostrarTooltip()"> 
        		    <span class="input-group-text fa fa-circle-o"></span> 
        		</div> 
        		<input id="genero-pez-nuevo" class="form-control" name="genero" type="text" placeholder="Genero" value=""> 
        	</div> 
        </div> 
        <div class="form-group"> 
        	<label for="exampleFormControlTextarea1">Descripción</label> 
        	<textarea id="text-area-pez-nuevo" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> 
        </div> 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="guardarPez()">Agregar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</div>

<div id="editar-indicador" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Editar Indicador</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <input id="id-indicador" type="hidden" name="id" value="">
        <div class="form-group"> 
        	<div class="input-group input-group-sm input-margen"> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Valor minimo" onmouseover="mostrarTooltip()"> 
        				<span class="input-group-text fa fa-long-arrow-down"></span> 
        		</div> 
        		<input id="minimo-actual" class="form-control" name="minimo" type="text" placeholder="minimo" required> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Valor maximo" onmouseover="mostrarTooltip()"> 
        			<span class="input-group-text fa fa-long-arrow-up"></span> 
        		</div> 
        		<input id="maximo-actual" class="form-control" name="maximo" type="text" placeholder="maximo" required> 
        	</div> 
       </div> 
       <div class="form-group"> 
        <label for="exampleFormControlTextarea1">Recomendacion</label> 
        	<textarea id="text-area-indicador-actual" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> 
       </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="guardarActualizarIndicador()">Editar indicador</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div id="agregar-indicador" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Agregar Indicador</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group"> 
        	<div class="input-group input-group-sm input-margen"> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Valor minimo" onmouseover="mostrarTooltip()"> 
        				<span class="input-group-text fa fa-long-arrow-down"></span> 
        		</div> 
        		<input id="minimo-nuevo" class="form-control" name="minimo" type="text" placeholder="minimo" required> 
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Valor maximo" onmouseover="mostrarTooltip()"> 
        			<span class="input-group-text fa fa-long-arrow-up"></span> 
        		</div> 
        		<input id="maximo-nuevo" class="form-control" name="maximo" type="text" placeholder="maximo" required> 
        	</div> 
       </div> 
       <div class="form-group"> 
        <label for="exampleFormControlTextarea1">Recomendacion</label> 
        	<textarea id="text-area-indicador-nuevo" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> 
       </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="guardarIndicador()">Crear indicador</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
