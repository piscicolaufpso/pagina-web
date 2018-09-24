package controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

import modelo.persona;
/**
 * Servlet implementation class actualizarUsuarios
 */
@WebServlet(name = "usuariosActualizar", urlPatterns = { "/usuariosActualizar" })
public class actualizarUsuarios extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		long id = Long.parseLong(request.getParameter("id"));
		String nombre = request.getParameter("nombre").toUpperCase();
		String apellido = request.getParameter("apellido").toUpperCase();
		String genero = request.getParameter("genero");
		Date fecha = java.sql.Date.valueOf(request.getParameter("fecha")); 
		String documento = request.getParameter("documento");
		String contrasena = request.getParameter("contrasena");
		String correo = request.getParameter("correo");
		HttpSession sesion = request.getSession();
		
		persona p = new persona(id, nombre, apellido, genero, documento, fecha, correo, contrasena);
		response.setContentType("text/html");
        PrintWriter out = response.getWriter();
		try {
			Configuration config = new Configuration().configure();
			config.addAnnotatedClass (persona.class);
			ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(config.getProperties()).build();
			SessionFactory factory = config.buildSessionFactory(servReg);
			Session session = factory.openSession();
			session.beginTransaction();
			session.update(p);
			session.getTransaction().commit();
			session.close();
			sesion.setAttribute("usuario", p);
			out.print("1");
		}catch(Exception e){
			out.print("2");
		}
	
	}

}
