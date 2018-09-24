package controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.Time;
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
import modelo.persona;
import modelo.pescado;
import modelo.pescado_pecera;
import modelo.sensor;
import modelo.sensor_pecera_pescado;
import modelo.evento;
import modelo.evento_persona_pecera;
import modelo.solucion_persona;

@WebServlet(name = "calendario", urlPatterns = { "/calendario" })
public class pagCalendario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public pagCalendario() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String opcion = request.getParameter("opcion");
        Configuration configuracion = new Configuration().configure();
  		configuracion.addAnnotatedClass (persona.class);
        configuracion.addAnnotatedClass (pecera.class);
  		configuracion.addAnnotatedClass (pescado.class);
  		configuracion.addAnnotatedClass (sensor.class);
  		configuracion.addAnnotatedClass (pescado_pecera.class);
  		configuracion.addAnnotatedClass (evento.class);
  		configuracion.addAnnotatedClass (solucion_persona.class);
  		configuracion.addAnnotatedClass (evento_persona_pecera.class);
  		configuracion.addAnnotatedClass (sensor_pecera_pescado.class);
  		ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(configuracion.getProperties()).build();
  		SessionFactory factory = configuracion.buildSessionFactory(servReg);
  		Session sesion = factory.openSession();
  		sesion.beginTransaction();
  		try {
  			switch(opcion) {
  				case("1"):
  					List<pecera> peceras = sesion.createQuery("SELECT p FROM pecera p").list();
  		       		List<sensor> sensores = sesion.createQuery("SELECT s FROM sensor s").list();
  		       		List<persona> personas = sesion.createQuery("SELECT pe FROM persona pe").list();
  		       		List<evento> eventos = sesion.createQuery("SELECT e FROM evento e").list();
  		       		List<evento_persona_pecera> eventosPersona = sesion.createQuery("SELECT ep FROM evento_persona_pecera ep").list();
  		       		List<solucion_persona> solucion = sesion.createQuery("SELECT sp FROM solucion_persona sp").list();
  		       		List<sensor_pecera_pescado> peceraSP = sesion.createQuery("SELECT spp FROM sensor_pecera_pescado spp WHERE spp.incidencia='SI' ORDER BY spp.fecha asc, spp.hora asc").list();
  		       		out.print("[");
	  		       	for(pecera p: peceras) {
	             		if(p.getActivo().equals("SI")) {
	             			out.print("{\"id\":"+p.getId()+",\"nombre\":\""+p.getNombre()+"\"},");
	             		}
	             	}
	  		       	out.print("1-2-3]|[");
  		       		for(sensor sensor: sensores){
	  		 			if(sensor.getActivo().equals("SI")){
	  		 				out.print("{\"id\":"+sensor.getId()+",\"nombre\":\""+sensor.getNombre()+"\"},");
	  		 			}
	  		      	}
  		       		out.print("1-2-3]|[");
  		       		for(persona persona: personas) {
  		       			out.print("{\"id\":"+persona.getId()+",\"nombre\":\""+persona.getNombre()+"\",\"apellido\":\""+persona.getApellido()+"\"},");
  		       		}
  		       		out.print("1-2-3]|[");
  		       		for(evento evento: eventos) {
  		       			out.print("{\"id\":"+evento.getId()+",\"nombre\":\""+evento.getNombre()+"\",\"descripcion\":\""+evento.getDescripcion()+"\",\"activo\":\""+evento.getActivo()+"\"},");
		       		}
		       		out.print("1-2-3]|");
		       		if(eventosPersona.size()!=0) {
		       			out.print("[");
		       			for(evento_persona_pecera ep: eventosPersona) {
		       				out.print("{\"id\":"+ep.getId()+",\"idPersona\":"+ep.getId_persona()+",\"idPecera\":"+ep.getId_pecera()+",\"idEvento\":"+ep.getId_evento()+",\"fecha\":\""+ep.getFecha()+"\",\"hora\":\""+ep.getHora()+"\",\"observacion\":\""+ep.getObservacion()+"\"},");
		       			}
		       			out.print("1-2-3]|");
		       		}else {
		       			out.print("0|");
		       		}
		       		if(solucion.size()!=0) {
		       			out.print("[");
		       			for(solucion_persona sol: solucion) {
		       				out.print("{\"id\":"+sol.getId()+",\"persona\":"+sol.getId_persona()+",\"fechaIncidencia\":"+sol.getId_fecha()+",\"hora\":\""+sol.getHora()+"\",\"fecha\":\""+sol.getFecha()+"\",\"nombre\":\""+sol.getNombre()+"\",\"accion\":\""+sol.getAccion()+"\",\"observacion\":\""+sol.getObservacion()+"\"},");
		       			}
		       			out.print("1-2-3]|");
		       		}else {
		       			out.print("0|");
		       		}
		       		if(peceraSP.size()!=0) {
		        		out.print("[");		        		
		            	for(sensor_pecera_pescado spp: peceraSP){
		            		out.print("{\"id\":"+spp.getId()+",\"pecera\":"+spp.getId_pecera()+",\"sensor\":"+spp.getId_sensor()+",\"fecha\":\""+spp.getFecha()+"\",\"hora\":\""+spp.getHora()+"\",\"valor\":\""+spp.getValor()+"\",\"incidencia\":\""+spp.getIncidencia()+"\"},");
		            	}
		            	out.print("1-2-3]");
		        	}else {
		        		out.print("0");
		        	}
		       		sesion.close();
  					break;
  				case("2"):
  					long idPersona = Long.parseLong(request.getParameter("idPersona"));
  					long idPecera = Long.parseLong(request.getParameter("idPecera"));  					
  					long idEvento = Long.parseLong(request.getParameter("idEvento"));  					
  					Date fecha = java.sql.Date.valueOf(request.getParameter("fecha"));
  					Time hora = java.sql.Time.valueOf(request.getParameter("hora"));
  					String observacion = request.getParameter("observacion");
  					evento_persona_pecera evpp = new evento_persona_pecera();
  					evpp.setId_evento(idEvento);
  					evpp.setId_pecera(idPecera);
  					evpp.setId_persona(idPersona);
  					evpp.setFecha(fecha);
  					evpp.setHora(hora);
  					evpp.setObservacion(observacion);
  					Long idIndicadorNuevo = (long) sesion.save(evpp);
					sesion.getTransaction().commit();
					sesion.close();
					out.print(idIndicadorNuevo);
  					break;
  				case("3"):
  					long idPersonaSolucion = Long.parseLong(request.getParameter("idPersona"));
					long idFechaSolucion = Long.parseLong(request.getParameter("fechaIncidencia"));  					  					
					Date fechaSolucion = java.sql.Date.valueOf(request.getParameter("fecha"));
					Time horaSolucion = java.sql.Time.valueOf(request.getParameter("hora"));
					String nombreSolucion = request.getParameter("nombre");
					String accionSolucion = request.getParameter("accion");
					String observacionSolucion = request.getParameter("observacion");
					solucion_persona sp = new solucion_persona();
					sp.setId_persona(idPersonaSolucion);
					sp.setId_fecha(idFechaSolucion);
					sp.setFecha(fechaSolucion);
					sp.setHora(horaSolucion);
					sp.setNombre(nombreSolucion);
					sp.setAccion(accionSolucion);
					sp.setObservacion(observacionSolucion);
					Long idIndicadorNuevoSolucion = (long) sesion.save(sp);
					sesion.getTransaction().commit();
					sesion.close();
					out.print(idIndicadorNuevoSolucion);
  					break;
  				case("4"):
  					long idSolucionEliminar = Long.parseLong(request.getParameter("id"));
  					long idPersonaSolucionEliminar = Long.parseLong(request.getParameter("idPersona"));
  					long idFechaSolucionEliminar = Long.parseLong(request.getParameter("fechaIncidencia"));  					  					
					Date fechaSolucionEliminar = java.sql.Date.valueOf(request.getParameter("fecha"));
					Time horaSolucionEliminar = java.sql.Time.valueOf(request.getParameter("hora"));
					String nombreSolucionEliminar = request.getParameter("nombre");
					String accionSolucionEliminar = request.getParameter("accion");
					String observacionSolucionEliminar = request.getParameter("observacion");
					solucion_persona spEliminar = new solucion_persona(idSolucionEliminar,idPersonaSolucionEliminar,idFechaSolucionEliminar,fechaSolucionEliminar,horaSolucionEliminar,nombreSolucionEliminar,accionSolucionEliminar,observacionSolucionEliminar);
					sesion.delete(spEliminar);
					sesion.getTransaction().commit();
					sesion.close();
					out.print(1);
					break;
  				case("5"):
  					long idEventoEliminar = Long.parseLong(request.getParameter("id"));
  					long idPersonaEventoEliminar = Long.parseLong(request.getParameter("idPersona"));
					long idPeceraEventoEliminar = Long.parseLong(request.getParameter("idPecera"));  					
					long idEventoEventoEliminar = Long.parseLong(request.getParameter("idEvento"));  					
					Date fechaEventoEliminar = java.sql.Date.valueOf(request.getParameter("fecha"));
					Time horaEventoEliminar = java.sql.Time.valueOf(request.getParameter("hora"));
					String observacionEventoEliminar = request.getParameter("observacion");
					evento_persona_pecera evppEliminar = new evento_persona_pecera(idEventoEliminar, idEventoEventoEliminar, idPersonaEventoEliminar, idPeceraEventoEliminar, fechaEventoEliminar, horaEventoEliminar, observacionEventoEliminar);
					sesion.delete(evppEliminar);
					sesion.getTransaction().commit();
					sesion.close();
					out.print(1);
  					break;
  				case("6"):
  					long idEventoEditar = Long.parseLong(request.getParameter("id"));
					long idPersonaEventoEditar = Long.parseLong(request.getParameter("idPersona"));
					long idPeceraEventoEditar = Long.parseLong(request.getParameter("idPecera"));  					
					long idEventoEventoEditar = Long.parseLong(request.getParameter("idEvento"));  					
					Date fechaEventoEditar = java.sql.Date.valueOf(request.getParameter("fecha"));
					Time horaEventoEditar = java.sql.Time.valueOf(request.getParameter("hora"));
					String observacionEventoEditar = request.getParameter("observacion");
					evento_persona_pecera evppEditar = new evento_persona_pecera(idEventoEditar, idEventoEventoEditar, idPersonaEventoEditar, idPeceraEventoEditar, fechaEventoEditar, horaEventoEditar, observacionEventoEditar);
					sesion.update(evppEditar);
					sesion.getTransaction().commit();
					sesion.close();
					out.print(1);
  					break;
  				case("7"):
  					long idSolucionEditar = Long.parseLong(request.getParameter("id"));
					long idPersonaSolucionEditar = Long.parseLong(request.getParameter("idPersona"));
					long idFechaSolucionEditar = Long.parseLong(request.getParameter("fechaIncidencia"));  					  					
					Date fechaSolucionEditar = java.sql.Date.valueOf(request.getParameter("fecha"));
					Time horaSolucionEditar = java.sql.Time.valueOf(request.getParameter("hora"));
					String nombreSolucionEditar = request.getParameter("nombre");
					String accionSolucionEditar = request.getParameter("accion");
					String observacionSolucionEditar = request.getParameter("observacion");
					solucion_persona spEditar = new solucion_persona(idSolucionEditar,idPersonaSolucionEditar,idFechaSolucionEditar,fechaSolucionEditar,horaSolucionEditar,nombreSolucionEditar,accionSolucionEditar,observacionSolucionEditar);
					sesion.update(spEditar);
					sesion.getTransaction().commit();
					sesion.close();
					out.print(1);
  					break;
  			}
  		}catch(Exception e) {
  			out.print("0");
  		}
	}

}
