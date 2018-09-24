<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<h1>Peceras</h1>

<div id="contenidoPeceras"></div>

<div class="card">
  <div class="card-header">
      <select id="select-pecera" onchange='cambiarPecera(this.value);' class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect01">
  	  </select>
  </div>
  <div class="card-body">
  	<div class="input-group-prepend activo" >
        		 	  <div class="input-group-text" onclick="cambiarActivoPecera()">
        			  	   <span>Estado: </span>
        			  	   <span id="activo-pecera" class="fa fa-toggle-off"></span>
        			  </div>
     </div>
     <br>
  	<div class="form-group">
			<div class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Diametro de la pecera" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-arrows-h"></span>
        		</div>
        		<input id="diametro-pecera" class="form-control" name="diametro" type="text" placeholder="Diametro" required>
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Unidad en metros" onmouseover="mostrarTooltip()">
					<span class="input-group-text fa fa-maxcdn"></span> 
				</div>
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Profundidad de la pecera" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-arrows-v "></span>
        		</div>
        		<input id="profundidad-pecera" class="form-control" name="profundidad" type="text" placeholder="Profundidad" required>
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Unidad en metros" onmouseover="mostrarTooltip()">
					<span class="input-group-text fa fa-maxcdn"></span> 
				</div>
        	</div>
        	<br>
      <div class="form-group">
    		<label for="exampleFormControlTextarea1">Descripción</label>
    		<textarea id="text-area-pecera" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  	  </div>
  	  <div class="form-group">
	  	<div class="input-group">
	  		<div class="input-group-append">
	    		<button class="btn btn-outline-success" onclick="actualizarPecera()" type="button">Actualizar</button>
	  		</div>
	  		<div class="input-group-append">
	    		<button class="btn btn-outline-primary" onclick="agregarPecera()" type="button">Agregar nuevo</button>
	  		</div>	
		</div>
	  </div>
     </div>
     
     <table class="table">
  <thead class="thead-light">
    <tr>
      <th scope="col">Pescado</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Fecha inicio</th>
      <th scope="col">Fecha Fin</th>
    </tr>
  </thead>
  <tbody id="peceras-pescados">
   
   <tfoot>
    <tr>
      <th scope="row" colspan="4"><button id="botonAgregar" onclick="agregarPescadoPecera()" class="btn btn-primary">Agregar</button></th>
    </tr>
   </tfoot> 
  </tbody>
</table>
  </div>  
</div>

<div id="agregar-pecera" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Agregar Pecera</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="input-group input-group-sm input-margen"> 
        	<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Nombre de la pecera" onmouseover="mostrarTooltip()"> 
        		  <span class="input-group-text fa fa-info-circle"></span>
        	</div> 
        	 <input id="nombre-pecera-nuevo" class="form-control" name="nombre" type="text" value="" placeholder="nombre de la pecera" required> 
        </div>
        <br>
        <div class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Diametro de la pecera" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-arrows-h"></span>
        		</div>
        		<input id="diametro-pecera-nuevo" class="form-control" name="diametro" type="text" placeholder="Diametro" required>
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Unidad en metros" onmouseover="mostrarTooltip()">
					<span class="input-group-text fa fa-maxcdn"></span> 
				</div>
		</div>
			<br>	
		<div class="input-group input-group-sm input-margen">				
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Profundidad de la pecera" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-arrows-v "></span>
        		</div>
        		<input id="profundidad-pecera-nuevo" class="form-control" name="profundidad" type="text" placeholder="Profundidad" required>
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="Unidad en metros" onmouseover="mostrarTooltip()">
					<span class="input-group-text fa fa-maxcdn"></span> 
				</div>
        	</div>
        	<br>
        <div class="form-group">
        	 <label>Descripción:</label>
        	 <textarea id="text-area-pecera-nuevo" class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="guardarPecera()">Crear evento</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div id="agregar-pecera-pescado" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Agregar pez a pecera</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div class="input-group">
		  <div class="input-group-prepend">
		    <label class="input-group-text" for="inputGroupSelect01">Pez</label>
		  </div>
		  <select id="select-pez" class="custom-select" id="inputGroupSelect01">
		  </select>
		</div>
        <br>
        <div class="input-group input-group-sm input-margen">
        		<div class="input-group-prepend" data-toggle="tooltip" data-placement="bottom" title="numero de peces en la pecera" onmouseover="mostrarTooltip()">
        			<span class="input-group-text fa fa-hashtag"></span>
        		</div>
        		<input id="cantidad-peces" class="form-control" name="cantidad" type="number" min="1" placeholder="numero de peces en la pecera" required>
		</div>
		<br>	
		<div class="form-group">
	        <div class="input-group input-group-sm input-margen">
	        	<div class="input-group-addon"  data-toggle="tooltip" data-placement="bottom" title="Fecha de inicio" onmouseover="mostrarTooltip()"><span class="fa fa-calendar"></span></div>
	        	<input id="fecha-inicio" class="form-control" name="fecha" type="date" value="" required>	
	        </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="guardarPeceraPescado()">Agregar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>