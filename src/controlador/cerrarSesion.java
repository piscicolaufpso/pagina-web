package controlador;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet(name = "salir", urlPatterns = { "/salir" })
public class cerrarSesion extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession sesion = request.getSession();		
		sesion.removeAttribute("usuario");
		sesion.removeAttribute("rol");
		PrintWriter out = response.getWriter();
		String url = response.encodeRedirectURL("tablero.jsp");
		response.sendRedirect(url);
	}

}
