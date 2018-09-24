<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>  
<%@ page import="modelo.persona"
	session="true"
%>
<%	HttpSession sesion = request.getSession();
	persona p = (persona)sesion.getAttribute("usuario");
	if (p == null){
		String url = response.encodeRedirectURL("index.jsp");
		response.sendRedirect(url);
	}
%>      
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/jquery.bootstrap.year.calendar.min.css">
    <link rel="stylesheet" href="css/alertify.min.css">
    <link rel="stylesheet" href="css/default.min.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/general.css">
    <link rel="stylesheet" href="css/tablero.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,700">
    <title>Tablero</title>
</head>
<body>
	<input id="usuario-actual" type="text" value="<%if(p!=null)out.print(p.getId());%>" hidden>
    <div class="wrapper">
    	<div id="cargando" class="no-ver">
			<i id="icono-cargando" class="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
			<span class="sr-only">Loading...</span>
		</div>
		<jsp:include page="vista/menu.jsp"></jsp:include>
		<div id="content">
 				<jsp:include page="vista/header.jsp"></jsp:include>
                <div id="contenedor" class="container-fluid">
        			<jsp:include page="vista/datosActuales.jsp"></jsp:include>	
        		</div>
        		<div id="calendario"></div>
        </div>
    </div>
		
	<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js" integrity="sha384-a5N7Y/aK3qNeh15eJKGWxsqtnX/wWdSZSKp+81YjTmS15nvnvxKHuzaWwXHDli+4" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.5/jspdf.debug.js"></script>
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/jquery.bootstrap.year.calendar.min.js"></script>
    <script src="js/autotable.js"></script>
    <script src="js/alertify.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/funciones.js"></script>
    <script src="js/tabla.js"></script>
    <script src="js/estadistica.js"></script>
    <script src="js/calendario.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.concat.min.js"></script>
    <script>
        $(document).ready(function () {
            $("#sidebar").mCustomScrollbar({
                theme: "minimal"
            });
        
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar, #content').toggleClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
 			
            datosActuales();
            
        });
    </script>
</body>
</html>