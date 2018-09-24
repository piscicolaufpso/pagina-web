<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="modelo.persona"
	session="true"
	%>
<nav id="sidebar">
   <div class="sidebar-header">
	<h3>Proyecto piscícola</h3>
   </div>
   <ul class="list-unstyled components">
       <li onclick="cambiar('usuario')"><a href="#"><span class="fa fa-user"></span>&nbsp&nbsp Usuario</a></a></li>
       <li onclick="cambiar('datosActuales')"><a href="#"><span class="fa fa-heartbeat"></span>&nbsp Datos actuales</a></li>
       <li onclick="cambiar('calendario')"><a href="#"><span class="fa fa-calendar"></span>&nbsp Calendario</a></li>
   	   <li onclick="cambiar('estadisticas')"><a href="#"><span class="fa fa-line-chart"></span>&nbsp Estadisticas</a></li>
       <li onclick="cambiar('tablas')"><a href="#"><span class="fa fa-table"></span>&nbsp Tablas</a></li>
<%
	HttpSession sesion = request.getSession();
	if (sesion.getAttribute("rol") != null){
		if (sesion.getAttribute("rol").equals("Administrador")){
			out.println("<li><a href='#homeSubmenu' data-toggle='collapse' aria-expanded='false'><span class='fa fa-user-o'>&nbsp Administrador</a><ul class='collapse list-unstyled' id='homeSubmenu'>");
			out.println("<li onclick="+"cambiar('agregarUsuario')"+"><a href='#'><span class='fa fa-user-plus'></span>&nbsp Usuarios</a></li>");
			out.println("<li onclick="+"cambiar('peces')"+"><a href='#'><span class='fa fa-circle'></span>&nbsp Peces</a></li>");
			out.println("<li onclick="+"cambiar('pecera')"+"><a href='#'><span class='fa fa-cube'></span>&nbsp Peceras</a></li>");
			out.println("<li onclick="+"cambiar('sensor')"+"><a href='#'><span class='fa fa-microchip'></span>&nbsp Sensores</a></li>");
			out.println("<li onclick="+"cambiar('evento')"+"><a href='#'><span class='fa fa-info-circle'></span>&nbsp Eventos</a></li></ul></li>");
		}
	}else{
		String url = response.encodeRedirectURL("index.jsp");
		response.sendRedirect(url);
	}
%>    
   </ul>
</nav>