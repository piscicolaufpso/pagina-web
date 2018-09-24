package controlador;

import java.io.IOException;

//import javax.servlet.RequestDispatcher;
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

import modelo.perfil;
import modelo.persona;
import modelo.persona_perfil;

@WebServlet(name = "principal", urlPatterns = { "/principal" })
public class validadorPrincipal extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String correo = request.getParameter("correo");
		String clave = request.getParameter("clave");
		String error = "";
		String urlMal = response.encodeRedirectURL("index.jsp");
		String urlBien = response.encodeRedirectURL("tablero.jsp");
		HttpSession sesion = request.getSession();
		
		Configuration config = new Configuration().configure();
		config.addAnnotatedClass (persona.class);
		config.addAnnotatedClass (persona_perfil.class);
		config.addAnnotatedClass (perfil.class);
		ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(config.getProperties()).build();
		SessionFactory factory = config.buildSessionFactory(servReg);
		
		Session session = factory.openSession();
		session.beginTransaction();
		persona p = (persona) session.createQuery("SELECT p FROM persona p WHERE correo='"+correo+"' AND clave='"+clave+"'").uniqueResult();
		if(p==null) {
			session.close();
			sesion.setAttribute("error", "1");
			response.sendRedirect(urlMal);
		}else {
			sesion.setAttribute("usuario", p);
			persona_perfil pp = (persona_perfil) session.createQuery("SELECT pp FROM persona_perfil pp WHERE pers_id='"+p.getId()+"'").uniqueResult();
			if(pp.getActivo().equals("NO")) {
				session.close();
				sesion.setAttribute("error", "2");
				response.sendRedirect(urlMal);
			}else {
				perfil per = (perfil) session.createQuery("SELECT p FROM perfil p WHERE perf_id='"+pp.getId_perfil()+"'").uniqueResult();
				session.close();
				String rol = per.getNombre();
				rol = Character.toUpperCase(rol.charAt(0)) + rol.substring(1, rol.length()).toLowerCase();
				sesion.setAttribute("usuario", p);
				sesion.setAttribute("rol", rol);
				error = (String) sesion.getAttribute("error");
				if(error != null) {
					sesion.removeAttribute("error");
				}
				response.sendRedirect(urlBien);
			}
			
		}
		
	}

}
