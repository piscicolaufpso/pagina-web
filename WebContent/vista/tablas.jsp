<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<h1>Tablas</h1>

<div class="form-group">
	<div class="input-group input-group-sm input-margen">
		<div class="input-group-addon"><span class="fa fa-calendar" data-toggle="tooltip" data-placement="bottom" title="Fecha inicio" onmouseover="mostrarTooltip()"></span></div>
		<input id="fecha-inicio" class="form-control" name="fecha_inicio" type="date" min="2018-01-01" required>
		<div class="input-group-addon"><span class="fa fa-calendar" data-toggle="tooltip" data-placement="bottom" title="Fecha Fin" onmouseover="mostrarTooltip()"></span></div>
		<input id="fecha-fin" class="form-control" name="fecha_fin" type="date" min="2018-01-01" required>
	</div>
</div>
<button class="btn btn-outline-primary" onclick="traerDatos()" type="button">Calcular</button>

<table id="tablaDatos" class="table">
	<h2 id="defecto" class="centrar-opciones">Selecciona fechas para calcular</h2>
</table>


