package controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.Timestamp;
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
import modelo.sensor;
import modelo.pescado_pecera;
import modelo.sensor_pecera_pescado;

@WebServlet(name = "tablas", urlPatterns = { "/tablas" })
public class pagTabla extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public pagTabla() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        Timestamp fechaActual= new java.sql.Timestamp(Calendar.getInstance().getTime().getTime());

        try {
        	Date fechaInicio = java.sql.Date.valueOf(request.getParameter("fechaIni")); 
        	Date fechaFinal = java.sql.Date.valueOf(request.getParameter("fechaFin"));
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
      		List<pecera> peceras = sesion.createQuery("SELECT p FROM pecera p").list();
      		List<sensor> sensores = sesion.createQuery("SELECT s FROM sensor s").list();
        	out.print("[");
		  	for(sensor sensor: sensores){
	 			if(sensor.getActivo().equals("SI")){
	 				out.print("{\"idSensor\":"+sensor.getId()+",\"nombre\":\""+sensor.getNombre()+"\"},");
	 			}
	      	}
		  	out.print("1-2-3]|[");
      		for(pecera p: peceras) {
        		if(p.getActivo().equals("SI")) {
        			out.print("{\"id\":"+p.getId()+",\"nombre\":\""+p.getNombre()+"\",\"fechaInicio\":\""+fechaInicio+"\",\"fechaFin\":\""+fechaFinal+"\",\"pescados\":[");
        			List<pescado_pecera> pp = sesion.createQuery("SELECT pp FROM pescado_pecera pp WHERE id_pecera='"+p.getId()+"'").list();
        			for(pescado_pecera pepe: pp) {
        				if(pepe.getFecha_fin()==null || fechaInicio.compareTo(pepe.getFecha_fin())<0){
        					pescado pez = (pescado) sesion.createQuery("SELECT p FROM pescado p WHERE id='"+pepe.getId_pescado()+"'").uniqueResult();
        					out.print("{\"nombre\":\""+pez.getNombre()+"\"},");
        				}
        			}
        			out.print("1-2-3]},");
        		}
        	}
        	List<sensor_pecera_pescado> peceraSP;
        	if((fechaInicio.compareTo(fechaFinal)!=0)) {
        		peceraSP = sesion.createQuery("SELECT spp FROM sensor_pecera_pescado spp  WHERE spp.fecha BETWEEN '"+fechaInicio+"' and '"+fechaFinal+"' ORDER BY spp.fecha asc, spp.hora asc").list();
        	}else {
        		peceraSP = sesion.createQuery("SELECT spp FROM sensor_pecera_pescado spp WHERE spp.fecha='"+fechaInicio+"' ORDER BY spp.fecha asc, spp.hora asc").list();
        	}
        	out.print("1-2-3]|");
        	if(peceraSP.size()!=0) {
        		out.print("[");
            	for(sensor_pecera_pescado spp: peceraSP){
            		out.print("{\"pecera\":"+spp.getId_pecera()+",\"sensor\":"+spp.getId_sensor()+",\"fecha\":\""+spp.getFecha()+"\",\"hora\":\""+spp.getHora()+"\",\"valor\":\""+spp.getValor()+"\",\"incidencia\":\""+spp.getIncidencia()+"\"},");
            	}
            	out.print("1-2-3]");
        	}else {
        		out.print("0");
        	}
        	sesion.close();
        }catch(Exception e) {
        	out.print("0");
        }
	}

}
