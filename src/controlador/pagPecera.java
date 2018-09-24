package controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
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



@WebServlet(name = "peceras", urlPatterns = { "/peceras" })
public class pagPecera extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public pagPecera() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String opcion = request.getParameter("opcion");
        
        Configuration configuracion = new Configuration().configure();
		configuracion.addAnnotatedClass (pecera.class);
		configuracion.addAnnotatedClass (pescado_pecera.class);
		configuracion.addAnnotatedClass (pescado.class);
		ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(configuracion.getProperties()).build();
		SessionFactory factory = configuracion.buildSessionFactory(servReg);
		
		Session sesion = factory.openSession();
		sesion.beginTransaction();
		
		switch(opcion) {
			case "1":
				try {
					out.print("[");
					List<pecera> peceras = sesion.createQuery("SELECT p FROM pecera p").list();
					for(pecera pecera: peceras) {
						out.print("{\"id\":"+pecera.getId()+",\"nombre\":\""+pecera.getNombre()+"\",\"diametro\":"+pecera.getDiametro()+",\"profundidad\":"+pecera.getProfundidad()+",\"descripcion\":\""+pecera.getDescripcion()+"\",\"activo\":\""+pecera.getActivo()+"\",\"pepe\":[");
						List<pescado_pecera> pescadosPecera = sesion.createQuery("SELECT p FROM pescado_pecera p WHERE id_pecera='"+pecera.getId()+"'").list();
				        for(pescado_pecera pescadoPecera:  pescadosPecera) {
				        	pescado pez = (pescado) sesion.createQuery("SELECT p FROM pescado p WHERE id='"+pescadoPecera.getId_pescado()+"'").uniqueResult();
				        	out.print("{\"id\":"+pescadoPecera.getId()+",\"idPescado\":"+pescadoPecera.getId_pescado()+",\"nombrePescado\":\""+pez.getNombre()+"\",\"idPecera\":"+pescadoPecera.getId_pecera()+",\"cantidad\":"+pescadoPecera.getCantidad()+",\"fechaInicial\":\""+pescadoPecera.getFecha_inicio()+"\",\"fechaFinal\":\""+pescadoPecera.getFecha_fin()+"\"},");
				        }
				        out.print("1-2-3]},");
					}
					out.print("1-2-3]|[");
					List<pescado> peces = sesion.createQuery("SELECT p FROM pescado p").list();
					for(pescado pez: peces) {
						out.print("{\"id\":"+pez.getId()+",\"nombre\":\""+pez.getNombre()+"\"},");
					}
					out.print("1-2-3]");
					sesion.close();
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "2":
				try {
					long id = Long.parseLong(request.getParameter("id"));
					String nombre = request.getParameter("nombre");
					double profundidad = Double.parseDouble(request.getParameter("profundidad"));
					double diametro = Double.parseDouble(request.getParameter("diametro"));
					String descripcion = request.getParameter("descripcion");
					String activo = request.getParameter("activo");
					pecera pecera = new pecera(id,nombre,diametro,profundidad,descripcion,activo);
					sesion.update(pecera);
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
					double profundidadNuevo = Double.parseDouble(request.getParameter("profundidad"));
					double diametroNuevo = Double.parseDouble(request.getParameter("diametro"));
					String descripcionNuevo = request.getParameter("descripcion");
					pecera peceraNueva = new pecera();
					peceraNueva.setNombre(nombreNuevo);
					peceraNueva.setDiametro(diametroNuevo);
					peceraNueva.setProfundidad(profundidadNuevo);
					peceraNueva.setDescripcion(descripcionNuevo);
					peceraNueva.setActivo("SI");
					sesion.save(peceraNueva);
					sesion.getTransaction().commit();
					sesion.close();
					out.print("1");
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "4":
				try {
					long idPeceraPescado = Long.parseLong(request.getParameter("id"));
					long idPescado = Long.parseLong(request.getParameter("idPescado"));
					long idPecera = Long.parseLong(request.getParameter("idPecera"));
					int cantidad = Integer.parseInt(request.getParameter("cantidad"));
					Date fechaInicial = java.sql.Date.valueOf(request.getParameter("fechaInicial"));
					Date fechaFinal = java.sql.Date.valueOf(request.getParameter("fechaFinal")); 
					pescado_pecera pepe = new pescado_pecera(idPeceraPescado, idPescado, idPecera, cantidad, fechaInicial, fechaFinal);
					sesion.update(pepe);
					sesion.getTransaction().commit();
					sesion.close();
					out.print("1");
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "5":
				try {
					long idPescadoRelacion = Long.parseLong(request.getParameter("idPescado"));
					long idPeceraRelacion = Long.parseLong(request.getParameter("idPecera"));
					int cantidadRelacion = Integer.parseInt(request.getParameter("cantidad"));
					Date fechaInicialRelacion = java.sql.Date.valueOf(request.getParameter("fechaInicio"));
					pescado_pecera pepeRelacion = new pescado_pecera();
					pepeRelacion.setId_pecera(idPeceraRelacion);
					pepeRelacion.setId_pescado(idPescadoRelacion);
					pepeRelacion.setCantidad(cantidadRelacion);
					pepeRelacion.setFecha_inicio(fechaInicialRelacion);
					Long idGenerado = (long) sesion.save(pepeRelacion);
					sesion.getTransaction().commit();
					sesion.close();
					out.print(idGenerado);
				}catch(Exception e) {
					out.print("0");
				}
				break;
			default:
				out.println("0");
				break;
		}   
	}

}
