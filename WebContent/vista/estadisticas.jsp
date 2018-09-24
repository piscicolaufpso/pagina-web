<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<h1>Estadisticas</h1>

<div class="card">
  <div class="card-header">
     <div class="btn-group centrar-opciones" role="group" aria-label="Basic example">
  		<button type="button" class="btn btn-secondary" onclick="estadisticaDia()">Dia</button>
  		<button type="button" class="btn btn-secondary" onclick="estadisticaMes()">Mes</button>
  		<button type="button" class="btn btn-secondary" onclick="estadisticaAno()">Año</button>
	  </div>
  </div>
  <div class="card-header bg-info" style="color: white;">
  	<h2 id="defecto" class="centrar-opciones">Selecciona fechas para graficar</h2>
  </div>
  <div class="card-body" >
  	<canvas id="mychart" width="350" height="100%"></canvas>
  </div>  
</div>

<div id="estadisticas-dia" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Traer datos por día</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="input-group input-group-sm input-margen">
			<div class="input-group-addon"><span class="fa fa-calendar" data-toggle="tooltip" data-placement="bottom" title="Fecha" onmouseover="mostrarTooltip()"></span></div>
			<input id="fecha-dia" class="form-control" name="fecha_dia" type="date" min="2018-01-01" required>
		</div>
		<br>
		<select id="select-pecera-dia"  class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect01">
  	  	</select>
  	  	<br>
  	  	<select id="select-sensor-dia"  class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect02">
  	  	</select>
  	  	<br>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="consultarDia()">Consultar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</div>

<div id="estadisticas-mes" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Traer datos por mes<br>(se promedian los dias)</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="input-group input-group-sm input-margen">
			<div class="input-group-addon"><span class="fa fa-calendar" data-toggle="tooltip" data-placement="bottom" title="Fecha" onmouseover="mostrarTooltip()"></span></div>
			<input id="fecha-mes" class="form-control" name="fecha_mes" type="date" min="2018-01-01" required>
		</div>
		<br>
		<select id="select-pecera-mes"  class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect01">
  	  	</select>
  	  	<br>
  	  	<select id="select-sensor-mes"  class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect02">
  	  	</select>
  	  	<br>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="consultarMes()">Consultar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>
</div>

<div id="estadisticas-ano" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title">Traer datos por año<br>(se promedian los meses)</h2>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      	<div class="input-group input-group-sm input-margen">
			<div class="input-group-addon"><span class="fa fa-calendar" data-toggle="tooltip" data-placement="bottom" title="Fecha" onmouseover="mostrarTooltip()"></span></div>
			<input id="fecha-ano" class="form-control" name="fecha_ano" type="date" min="2018-01-01" required>
		</div>
		<br>
		<select id="select-pecera-ano"  class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect01">
  	  	</select>
  	  	<br>
  	  	<select id="select-sensor-ano"  class="custom-select custom-select-lg mb-3 seleccion seleccion" id="inputGroupSelect02">
  	  	</select>
  	  	<br>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="consultarAno()">Consultar</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>

<script src="js/Chart.min.js"></script>