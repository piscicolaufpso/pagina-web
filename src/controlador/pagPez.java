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
import modelo.rango;
import modelo.indicador;
import modelo.pescado;

@WebServlet(name = "peces", urlPatterns = { "/peces" })
public class pagPez extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
    public pagPez() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
        
		PrintWriter out = response.getWriter();
        String opcion = request.getParameter("opcion");
       
        Configuration configuracion = new Configuration().configure();
		configuracion.addAnnotatedClass (sensor.class);
		configuracion.addAnnotatedClass (rango.class);
		configuracion.addAnnotatedClass (indicador.class);
		configuracion.addAnnotatedClass (pescado.class);
		ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(configuracion.getProperties()).build();
		SessionFactory factory = configuracion.buildSessionFactory(servReg);
		
		Session sesion = factory.openSession();
		sesion.beginTransaction();
		
		switch(opcion) {
			case "1":
				try {
					out.print("[");
					List<pescado> pescados = sesion.createQuery("SELECT p FROM pescado p").list();
					for(pescado pez: pescados) {
						out.print("{\"id\":"+pez.getId()+",\"nombre\":\""+pez.getNombre()+"\",\"nombreCientifico\":\""+pez.getNombre_cientifico()+"\",\"origen\":\""+pez.getOrigen()+"\",\"genero\":\""+pez.getGenero()+"\",\"descripcion\":\""+pez.getDescripcion()+"\",\"sensores\":[");
						List<sensor> sensores = sesion.createQuery("SELECT s FROM sensor s").list();
						for(sensor sensor: sensores) {
							rango rangoSP = (rango) sesion.createQuery("SELECT r FROM rango r WHERE id_pescado='"+pez.getId()+"' AND id_sensor='"+sensor.getId()+"'").uniqueResult();
							if(sensor.getActivo().equals("SI")) {
								out.print("{\"idSensor\":"+sensor.getId()+",\"nombreSensor\":\""+sensor.getNombre()+"\",\"idRango\":"+rangoSP.getId()+",\"valorMaximo\":"+rangoSP.getMax()+",\"valorMinimo\":"+rangoSP.getMin()+",\"indicadores\":[");
								List<indicador> indicadores = sesion.createQuery("SELECT i FROM indicador i WHERE id_rango='"+rangoSP.getId()+"'").list();
								for(indicador indicador: indicadores) {
									out.print("{\"idIndicador\":"+indicador.getId()+",\"maximo\":"+indicador.getMax()+",\"minimo\":"+indicador.getMin()+",\"recomendacion\":\""+indicador.getRecomendacion()+"\",\"activo\":\""+indicador.getActivo()+"\"},");
								}
								out.print("1-2-3]},");
							}
						}
						out.print("1-2-3]},");
					}
					out.print("1-2-3]");
				}catch(Exception e) {
					out.print("0");
				}
				sesion.close();
				break;
			case "2":
				try {
					long id = Long.parseLong(request.getParameter("id"));
					String nombre = request.getParameter("nombre");
					String cientifico = request.getParameter("cientifico");
					String origen = request.getParameter("origen");
					String genero = request.getParameter("genero");
					String descripcion = request.getParameter("descripcion");
					pescado pez = new pescado(id,nombre,cientifico,origen,genero,descripcion);
					sesion.update(pez);
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
					String cientificoNuevo = request.getParameter("cientifico");
					String origenNuevo = request.getParameter("origen");
					String generoNuevo = request.getParameter("genero");
					String descripcionNuevo = request.getParameter("descripcion");
					pescado pezNuevo = new pescado();
					pezNuevo.setNombre(nombreNuevo);
					pezNuevo.setNombre_cientifico(cientificoNuevo);
					pezNuevo.setOrigen(origenNuevo);
					pezNuevo.setGenero(generoNuevo);
					pezNuevo.setDescripcion(descripcionNuevo);
					Long idGenerado = (long) sesion.save(pezNuevo);
					List<sensor> sensores = sesion.createQuery("SELECT s FROM sensor s").list();
					for(sensor sensor: sensores) {
						rango rangoNuevo = new rango();
						rangoNuevo.setId_pescado(idGenerado);
						rangoNuevo.setId_sensor(sensor.getId());
						rangoNuevo.setMax(1);
						rangoNuevo.setMin(0);
						sesion.save(rangoNuevo);
					}
					sesion.getTransaction().commit();
					sesion.close();
					out.print("1");
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "4":
				try {
					long idIndicador = Long.parseLong(request.getParameter("idIndicador"));
					long idRango = Long.parseLong(request.getParameter("idRango"));
					double minimo = Double.parseDouble(request.getParameter("minimo"));
					double maximo = Double.parseDouble(request.getParameter("maximo"));
					String recomendacion = request.getParameter("recomendacion");
					String activo = request.getParameter("activo");
					indicador indicador = new indicador(idIndicador,idRango,maximo,minimo,recomendacion,activo);
					sesion.update(indicador);
					sesion.getTransaction().commit();
					sesion.close();
					out.print("1");
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "5":
				try {
					long idRangoNuevo = Long.parseLong(request.getParameter("idRango"));
					double minimoNuevo = Double.parseDouble(request.getParameter("minimo"));
					double maximoNuevo = Double.parseDouble(request.getParameter("maximo"));
					String recomendacionNuevo = request.getParameter("recomendacion");
					String activoNuevo = request.getParameter("activo");
					indicador indicadorNuevo = new indicador();
					indicadorNuevo.setActivo(activoNuevo);
					indicadorNuevo.setId_rango(idRangoNuevo);
					indicadorNuevo.setMax(maximoNuevo);
					indicadorNuevo.setMin(minimoNuevo);
					indicadorNuevo.setRecomendacion(recomendacionNuevo);
					Long idIndicadorNuevo = (long) sesion.save(indicadorNuevo);
					sesion.getTransaction().commit();
					sesion.close();
					out.print(idIndicadorNuevo);
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "6":
				try {
					long idRangoActualizar = Long.parseLong(request.getParameter("id"));
					long idPescadoActualizar = Long.parseLong(request.getParameter("idPescado"));
					long idSensorActualizar = Long.parseLong(request.getParameter("idSensor"));
					double minimoActualizar = Double.parseDouble(request.getParameter("minimo"));
					double maximoActualizar = Double.parseDouble(request.getParameter("maximo"));
					rango rango = new rango(idRangoActualizar,idPescadoActualizar,idSensorActualizar,maximoActualizar,minimoActualizar);
					sesion.update(rango);
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

