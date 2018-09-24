package controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;

import modelo.evento;
import modelo.sensor;

/**
 * Servlet implementation class pagEvento
 */
@WebServlet(name = "eventos", urlPatterns = { "/eventos" })
public class pagEvento extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public pagEvento() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String opcion = request.getParameter("opcion");
        
        Configuration configuracion = new Configuration().configure();
		configuracion.addAnnotatedClass (evento.class);
		ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(configuracion.getProperties()).build();
		SessionFactory factory = configuracion.buildSessionFactory(servReg);
		
		Session sesion = factory.openSession();
		sesion.beginTransaction();
		switch(opcion) {
			case "1":
				try {
					out.print("[");
					List<evento> eventos = sesion.createQuery("SELECT e FROM evento e").list();
					int tope = eventos.size();
					int cont = 0;
					for(evento evento: eventos) {
						out.print("{\"id\":"+evento.getId()+",\"nombre\":\""+evento.getNombre()+"\",\"descripcion\":\""+evento.getDescripcion()+"\",\"activo\":\""+evento.getActivo()+"\" }");
						cont++;
						if(cont<tope) {
							out.print(",");
						}
					}
					out.print("]");
					sesion.close();
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "2":
				try {
					long id = Long.parseLong(request.getParameter("id"));
					String nombre = request.getParameter("nombre");
					String descripcion = request.getParameter("descripcion");
					String activo = request.getParameter("activo");
					evento e = new evento(id,nombre,descripcion,activo);
					sesion.update(e);
					sesion.getTransaction().commit();
					sesion.close();
					out.print("1");
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "3":
				try {
					String nombreNuevo = request.getParameter("nombre");
					String descripcionNuevo = request.getParameter("descripcion");
					evento event = new evento();
					event.setNombre(nombreNuevo);
					event.setDescripcion(descripcionNuevo);
					event.setActivo("SI");
					sesion.save(event);
					sesion.getTransaction().commit();
					sesion.close();
					out.print("1");
				}catch(Exception e) {
					out.print("0");
				}
				break;
			default:
				out.print("0");
				break;
		}
	}
	
}
