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

import modelo.sensor;

@WebServlet(name = "sensores", urlPatterns = { "/sensores" })
public class pagSensor extends HttpServlet {
	private static final long serialVersionUID = 1L;
  
    public pagSensor() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String opcion = request.getParameter("opcion");
        
        Configuration configuracion = new Configuration().configure();
		configuracion.addAnnotatedClass (sensor.class);
		ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(configuracion.getProperties()).build();
		SessionFactory factory = configuracion.buildSessionFactory(servReg);
		
		Session sesion = factory.openSession();
		sesion.beginTransaction();
		
		switch(opcion) {
			case "1":
				try {
					out.print("[");
					List<sensor> sensores = sesion.createQuery("SELECT s FROM sensor s").list();
					int tope = sensores.size();
					int cont = 0;
					for(sensor sensor: sensores) {
						out.print("{\"id\":"+sensor.getId()+",\"nombre\":\""+sensor.getNombre()+"\",\"descripcion\":\""+sensor.getDescripcion()+"\",\"activo\":\""+sensor.getActivo()+"\",\"minimo\":"+sensor.getMinimo()+",\"maximo\":"+sensor.getMaximo()+" }");
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
					double minimo = Double.parseDouble(request.getParameter("minimo"));
					double maximo = Double.parseDouble(request.getParameter("maximo"));
					sensor s = new sensor(id,nombre,descripcion,activo,minimo,maximo);
					sesion.update(s);
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
					double minimo = Double.parseDouble(request.getParameter("minimo"));
					double maximo = Double.parseDouble(request.getParameter("maximo"));
					sensor sens = new sensor();
					sens.setNombre(nombreNuevo);
					sens.setDescripcion(descripcionNuevo);
					sens.setMinimo(minimo);
					sens.setMaximo(maximo);
					sens.setActivo("SI");
					sesion.save(sens);
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
