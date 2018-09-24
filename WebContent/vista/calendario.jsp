<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<h1>Calendario</h1>

<div id="agregar-solucion" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="titulo-agregar-solucion" class="modal-title">Agregar solución</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<select id="select-solucion-cal" class="custom-select custom-select-lg mb-3 seleccion seleccion">
      	
  	  	</select>
  	  	<div class="form-group">
        	 <div class="input-group input-group-sm input-margen">
	        	 <div class="input-group-prepend" title="Hora">
		        	<span class="input-group-text">Hora </span>
		        </div>
		        <input id="input-solucion-cal" name="hora" type="time" class="form-control" />
	        </div>
        </div>
        <div class="form-group">
        	 <div class="input-group input-group-sm input-margen">
	        	 <div class="input-group-prepend" title="Hora">
		        	<span class="input-group-text">Nombre </span>
		        </div>
		        <input id="input-solucion-nombre-cal" name="hora" type="text" placeholder="Nombre de la solución" class="form-control" />
	        </div>
        </div>
      	<div class="form-group">
        	 <label for="text-area-solucion-cal-accion">Acción</label>
        	 <textarea id="text-area-solucion-cal-accion" class="form-control" placeholder="Descripción de su acción" rows="3"></textarea>
        </div>
  	  	<div class="form-group">
        	 <label for="text-area-solucion-cal-observacion">Observación</label>
        	 <textarea id="text-area-solucion-cal-observacion" class="form-control" placeholder="Observación de su solución" rows="3"></textarea>
        </div>
      </div>
      <div class="modal-footer">
      	<button type="button" class="btn btn-info" onclick="cambiarModalEvento()">Agregar Evento</button>
        <button type="button" class="btn btn-primary" onclick="agregarSolucionCalendario()">Enviar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div id="agregar-evento" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="titulo-agregar-evento" class="modal-title">Agregar evento</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<select id="select-evento-cal" onchange='cambiarEventoCal(this.value);' class="custom-select custom-select-lg mb-3 seleccion seleccion">
  	  	</select>
  	  	<select id="select-pecera-cal" class="custom-select custom-select-lg mb-3 seleccion seleccion">
  	  	</select>
  	  	<div class="form-group">
        	 <div class="input-group input-group-sm input-margen">
	        	 <div class="input-group-prepend" title="Hora">
		        	<span class="input-group-text">Hora </span>
		        </div>
		        <input id="input-evento-cal" name="hora" type="time" class="form-control" />
	        </div>
        </div>
  	  	<div class="form-group">
        	 <label for="text-area-evento-cal-descripcion">Descripción:</label>
        	 <textarea id="text-area-evento-cal-descripcion" class="form-control" rows="3" disabled></textarea>
        </div>
  	  	<div class="form-group">
        	 <label for="text-area-evento-cal-observacion">Observación:</label>
        	 <textarea id="text-area-evento-cal-observacion" class="form-control" placeholder="Observación de su evento" rows="3"></textarea>
        </div>      	
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="agregarEventoCalendario()">Enviar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div id="lista-eventos-soluciones" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Lista de Soluciones/Eventos</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<table class="table table-sm">
		  <thead>
		    <tr>
		      <th scope="col">Tipo</th>
		      <th scope="col">Nombre</th>
		      <th scope="col">fecha</th>
		      <th scope="col">Opciones</th>
		    </tr>
		  </thead>
		  <tbody id="tabla-eventos-soluciones">
		    
		  </tbody>
		</table>
      </div>
      <div class="modal-footer">
      	<div id="lista-agregar-incidencia"></div>
      	<button type="button" class="btn btn-info" onclick="cambiarModalEvento()">Agregar Evento</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div id="ver-soluciones-eventos-otros" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="titulo-ver-evento-solucion" class="modal-title"></h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
		<div id="ver-evento-solucion">
		
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div id="editar-solucion" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="titulo-editar-solucion" class="modal-title">Editar solución</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
        	 <div class="input-group input-group-sm input-margen">
	        	 <div class="input-group-prepend" title="Hora">
		        	<span class="input-group-text">Nombre </span>
		        </div>
		        <input id="input-solucion-nombre-cal-editar" name="hora" type="text" placeholder="Nombre de la solución" class="form-control" />
	        </div>
        </div>
      	<div class="form-group">
        	 <label for="text-area-solucion-cal-accion-editar">Acción</label>
        	 <textarea id="text-area-solucion-cal-accion-editar" class="form-control" placeholder="Descripción de su acción" rows="3"></textarea>
        </div>
  	  	<div class="form-group">
        	 <label for="text-area-solucion-cal-observacion-editar">Observación</label>
        	 <textarea id="text-area-solucion-cal-observacion-editar" class="form-control" placeholder="Observación de su solución" rows="3"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <div id="id-valor-solucion"></div>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<div id="editar-evento" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="titulo-editar-evento" class="modal-title">Agregar evento</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<select id="select-evento-cal-editar" class="custom-select custom-select-lg mb-3 seleccion seleccion">
  	  	</select>
  	  	<select id="select-pecera-cal-editar" class="custom-select custom-select-lg mb-3 seleccion seleccion">
  	  	</select>
  	  	<div class="form-group">
        	 <label for="text-area-evento-cal-observacion-editar">Observación:</label>
        	 <textarea id="text-area-evento-cal-observacion-editar" class="form-control" placeholder="Observación de su evento" rows="3"></textarea>
        </div>      	
      </div>
      <div class="modal-footer">
      	<div id="id-valor-evento"></div>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
