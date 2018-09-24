package controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.util.Calendar;
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

import modelo.pecera;
import modelo.pescado;
import modelo.pescado_pecera;
import modelo.sensor;
import modelo.sensor_pecera_pescado;


@WebServlet(name = "estadisticas", urlPatterns = { "/estadisticas" })
public class pagEstadistica extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public pagEstadistica() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String extraer = request.getParameter("extraer");
        Configuration configuracion = new Configuration().configure();
  		configuracion.addAnnotatedClass (pecera.class);
  		configuracion.addAnnotatedClass (pescado.class);
  		configuracion.addAnnotatedClass (sensor.class);
  		configuracion.addAnnotatedClass (pescado_pecera.class);
  		configuracion.addAnnotatedClass (sensor_pecera_pescado.class);
  		ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(configuracion.getProperties()).build();
  		SessionFactory factory = configuracion.buildSessionFactory(servReg);
  		Session sesion = factory.openSession();
  		sesion.beginTransaction();
        switch(extraer) {
        	case "1":
        		 try {
        			List<pecera> peceras = sesion.createQuery("SELECT p FROM pecera p").list();
               		List<sensor> sensores = sesion.createQuery("SELECT s FROM sensor s").list();
               		out.print("[");
         		  	for(sensor sensor: sensores){
         	 			if(sensor.getActivo().equals("SI")){
         	 				out.print("{\"id\":"+sensor.getId()+",\"nombre\":\""+sensor.getNombre()+"\",\"minimo\":"+sensor.getMinimo()+",\"maximo\":"+sensor.getMaximo()+"},");
         	 			}
         	      	}
         		  	out.print("1-2-3]|[");
         		  	for(pecera p: peceras) {
                 		if(p.getActivo().equals("SI")) {
                 			out.print("{\"id\":"+p.getId()+",\"nombre\":\""+p.getNombre()+"\"},");
                 		}
                 	}
         		  	out.print("1-2-3]");
        	     }catch(Exception e) {
        	        	out.print("0");
        	     }
        		sesion.close();
        		break;
        	case "2":
        		 try {
        			 String opcion = request.getParameter("opcion");
        			 long pecera = Long.parseLong(request.getParameter("pecera"));
        			 long sensor = Long.parseLong(request.getParameter("sensor"));
	         		 List<sensor_pecera_pescado> peceraSP = null; 
	               	 if(opcion.equals("dia")) {
	               		Date fecha = java.sql.Date.valueOf(request.getParameter("fecha"));      	
	               		peceraSP = sesion.createQuery("SELECT spp FROM sensor_pecera_pescado spp WHERE spp.id_pecera='"+pecera+"' and spp.id_sensor='"+sensor+"' and spp.fecha='"+fecha+"' ORDER BY spp.fecha asc, spp.hora asc").list();
	               	}else if(opcion.equals("mes")) {
	               		Date fechaInicio = java.sql.Date.valueOf(request.getParameter("fechaInicio"));
	               		Date fechaFin = java.sql.Date.valueOf(request.getParameter("fechaFin"));
	               		peceraSP = sesion.createQuery("SELECT spp FROM sensor_pecera_pescado spp  WHERE spp.id_pecera='"+pecera+"' and spp.id_sensor='"+sensor+"' and spp.fecha BETWEEN '"+fechaInicio+"' and '"+fechaFin+"' ORDER BY spp.fecha asc, spp.hora asc").list();
	               	}else if(opcion.equals("ano")) {
	               		Date fechaInicioAno = java.sql.Date.valueOf(request.getParameter("fechaInicio"));
	               		Date fechaFinAno = java.sql.Date.valueOf(request.getParameter("fechaFin"));
	               		peceraSP = sesion.createQuery("SELECT spp FROM sensor_pecera_pescado spp  WHERE spp.id_pecera='"+pecera+"' and spp.id_sensor='"+sensor+"' and spp.fecha BETWEEN '"+fechaInicioAno+"' and '"+fechaFinAno+"' ORDER BY spp.fecha asc, spp.hora asc").list();
	               	}else {
	               		out.print("0");
	               	}
	               	if(peceraSP.size()!=0) {
	                	out.print("[");
	                   	for(sensor_pecera_pescado spp: peceraSP){
	                   		out.print("{\"pecera\":"+spp.getId_pecera()+",\"sensor\":"+spp.getId_sensor()+",\"fecha\":\""+spp.getFecha()+"\",\"hora\":\""+spp.getHora()+"\",\"valor\":\""+spp.getValor()+"\",\"incidencia\":\""+spp.getIncidencia()+"\"},");
	                   	}
	                   	out.print("1-2-3]");
	                }else {
	                	out.print("0");
	                }
           	
        		 	}catch(Exception e) {
        		 		out.print("0");
        		 	}
        		sesion.close();
          		break;
        }
	}

}
