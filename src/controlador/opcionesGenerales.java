package controlador;

import java.io.IOException;
import java.io.PrintWriter;

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
import controlador.confCorreo;
/**
 * Servlet implementation class opcionesGenerales
 */
@WebServlet(name = "opciones", urlPatterns = { "/opciones" })
public class opcionesGenerales extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String correo = request.getParameter("correo-recuperar");
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        HttpSession sesion = request.getSession();
		
		Configuration config = new Configuration().configure();
		config.addAnnotatedClass (persona.class);
		ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(config.getProperties()).build();
		SessionFactory factory = config.buildSessionFactory(servReg);
		
		Session session = factory.openSession();
		session.beginTransaction();
		persona p = (persona) session.createQuery("SELECT p FROM persona p WHERE correo='"+correo+"'").uniqueResult();
		session.close();
		if(p==null) {
			out.print(0);
		}else {
			String destinatario =  p.getCorreo();
			String asunto = "Recuperar contraseña";
			String cuerpo = "Su contraseña es "+p.getClave()+" recuerde cambiarla";
			System.out.println(destinatario+" "+asunto+" "+cuerpo);
			confCorreo nuevo = new confCorreo();
			nuevo.enviarConGMail(destinatario, asunto, cuerpo);
			out.print(1);				
		}

	}
	
}
