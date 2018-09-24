<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<h1>Valores</h1>

<div class="form-group">
	<div class="input-group input-group-sm input-margen">
		<div class="input-group-prepend">
        	<span class="input-group-text fa fa-cube "></span>
        </div>
      <select class="form-control" id="peceras">
    	<option onclick="cambiarContenido('pecera')" value="pecera" selected>Peceras</option>
    	<option onclick="cambiarContenido('pescado')" value="pescado">Pescados</option>
    	<option onclick="cambiarContenido('sensor')" value="sensor">Sensores</option>
    	<option onclick="cambiarContenido('evento')" value="evento">Eventos</option>
  	  </select>
  	  <div class="input-group-prepend">
        	<span class="input-group-text fa fa-microchip "></span>
        </div>
  	  <select class="form-control" id="sensores">
  	  	<option value="temp" selected>Todos</option>
    	<option value="temp">Temperatura</option>
    	<option value="ph">Ph</option>
  	  </select>
  	  <div class="input-group-append">
    		<button class="btn btn-outline-secondary" type="button">Agregar</button>
  	  </div>
    </div>
</div>
 <div id="contenedorValores">
 	<jsp:include page="pecera.jsp"></jsp:include>	
 </div>