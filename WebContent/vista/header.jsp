<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<nav class="navbar navbar-default">
     <div class="container-fluid">
          <div class="navbar-header">
        	  <button onclick="verMenu()" type="button" id="sidebarCollapse" class="btn btn-info navbar-btn" onclick="">
     	          <i class="glyphicon glyphicon-align-left"></i>
                  <span id="iconoMenu" class="fa fa-times"></span>
              </button>
          </div>
          <form id="formularioSalir" class="form-inline mt-2 mt-md-0" method="POST" action="salir">
    		<a class="navbar-brand" onclick="salir()" href="#">Salir &nbsp<span class="fa fa-sign-out"></span></a>
		  </form>
     </div>
</nav>
