package controlador;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import modelo.pecera;
import modelo.sensor; 
import modelo.sensor_pecera_pescado;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.hibernate.service.ServiceRegistry;
import java.util.List;
/**
 * Servlet implementation class datosActuales
 */
@WebServlet(name = "actuales", urlPatterns = { "/actuales" })
public class datosActuales extends HttpServlet {
	private static final long serialVersionUID = 1L;
 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        int cantidadPeces = 0, cantidadSensores = 0;
		try {
			Configuration configuracion = new Configuration().configure();
			configuracion.addAnnotatedClass (pecera.class);
			configuracion.addAnnotatedClass (sensor.class);
			configuracion.addAnnotatedClass (sensor_pecera_pescado.class);
			ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(configuracion.getProperties()).build();
			SessionFactory factory = configuracion.buildSessionFactory(servReg);			
			Session sesion = factory.openSession();
			sesion.beginTransaction();
			List<pecera> peceras = sesion.createQuery("SELECT p FROM pecera p").list();
			List<sensor> sensores = sesion.createQuery("SELECT s FROM sensor s").list();
			sensor_pecera_pescado sppFechaHora = (sensor_pecera_pescado) sesion.createQuery("SELECT MAX(spp) FROM sensor_pecera_pescado spp").uniqueResult();
			out.print("[");
		  	for(pecera pecera: peceras) {
		  		if(pecera.getActivo().equals("SI")) {
		  			out.print("{\"id\":"+pecera.getId()+",\"nombre\":\""+pecera.getNombre()+"\",\"datos\":[");
			  		for(sensor sensor: sensores) {
			  			if(sensor.getActivo().equals("SI")) {
			  				try {
			  				sensor_pecera_pescado peceraSensor = (sensor_pecera_pescado) sesion.createQuery("SELECT spp FROM sensor_pecera_pescado spp WHERE spp.id_pecera='"+pecera.getId()+"' AND spp.id_sensor='"+sensor.getId()+"' AND spp.fecha='"+sppFechaHora.getFecha()+"' AND spp.hora='"+sppFechaHora.getHora()+"'").uniqueResult(); 				  			
				  			if(pecera.getId() == peceraSensor.getId_pecera() && sensor.getId() == peceraSensor.getId_sensor()) {
				  				out.print("{\"id\":"+peceraSensor.getId()+",\"idSensor\":"+peceraSensor.getId_sensor()+",\"nombreSensor\":\""+sensor.getNombre()+"\",\"valor\":"+peceraSensor.getValor()+",\"fecha\":\""+peceraSensor.getFecha()+"\",\"hora\":\""+peceraSensor.getHora()+"\",\"incidencia\":\""+peceraSensor.getIncidencia()+"\"},");		  				
				  			}
			  				}catch(Exception e) {
			  					out.print("{\"id\":0,\"idSensor\":0,\"nombreSensor\":\""+sensor.getNombre()+"\",\"valor\":\"no tiene\",\"fecha\":\"--/--/--\",\"hora\":\"00:00:00\",\"incidencia\":\"SI\"},");
			  				}
			  			}
			  		}
			  		out.print("1-2-3]},");
		  		}		  		
		  	}
		  	out.print("1-2-3]");
		  	sesion.close();
	}catch(Exception e) {
		out.print("0");
	}
	}
}
