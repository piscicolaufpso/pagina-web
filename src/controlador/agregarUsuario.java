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

import modelo.persona;
import modelo.persona_perfil;

@WebServlet(name = "agregarUsuarios", urlPatterns = { "/agregarUsuarios" })
public class agregarUsuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public agregarUsuario() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String opcion = request.getParameter("opcion");
        
        Configuration configuracion = new Configuration().configure();
		configuracion.addAnnotatedClass (persona.class);
		configuracion.addAnnotatedClass (persona_perfil.class);
		ServiceRegistry servReg = new StandardServiceRegistryBuilder().applySettings(configuracion.getProperties()).build();
		SessionFactory factory = configuracion.buildSessionFactory(servReg);
		
		Session sesion = factory.openSession();
		sesion.beginTransaction();
		
		switch(opcion) {
			case "1":
				try {
					out.print("[");
					List<persona> personas = sesion.createQuery("SELECT p FROM persona p").list();
					for(persona persona: personas){
			        	persona_perfil pp = (persona_perfil) sesion.createQuery("SELECT pp FROM persona_perfil pp WHERE pers_id='"+persona.getId()+"'").uniqueResult();
				        if(pp.getId_perfil()!=1) {
				        	out.print("{\"id\":"+persona.getId()+",\"nombre\":\""+persona.getNombre()+"\",\"apellido\":\""+persona.getApellido()+"\",\"activo\":\""+pp.getActivo()+"\",\"genero\":\""+persona.getGenero()+"\",\"documento\":\""+persona.getDocumento()+"\",\"fechaNacimiento\":\""+persona.getFecha_nacimiento()+"\",\"correo\":\""+persona.getCorreo()+"\",\"clave\":\""+persona.getClave()+"\",\"idPerfil\":\""+pp.getId_perfil()+"\",\"idpp\":\""+pp.getId()+"\"},");
				        }
					}
					out.print("123");
					out.print("]");
					sesion.close();
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "2":
				try {
					long id = Long.parseLong(request.getParameter("idpp"));
					long idPersona = Long.parseLong(request.getParameter("idPersona"));
					long idPerfil = Long.parseLong(request.getParameter("idPerfil"));
					String activo = request.getParameter("activo");
					persona_perfil pepe = new persona_perfil(id,idPerfil,idPersona,activo);
					sesion.update(pepe);
					sesion.getTransaction().commit();
					sesion.close();
					out.print("1");
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "3":
				try {
					long idPers = Long.parseLong(request.getParameter("id"));
					String nombre = request.getParameter("nombre").toUpperCase();
					String apellido = request.getParameter("apellido").toUpperCase();
					String genero = request.getParameter("genero");
					Date fecha = java.sql.Date.valueOf(request.getParameter("fecha")); 
					String documento = request.getParameter("documento");
					String contrasena = request.getParameter("contrasena");
					String correo = request.getParameter("correo");
					persona pers = new persona(idPers, nombre, apellido, genero, documento, fecha, correo, contrasena);
					sesion.update(pers);
					sesion.getTransaction().commit();
					sesion.close();
					out.print("1");
				}catch(Exception e) {
					out.print("0");
				}
				break;
			case "4":
				try {
					String nombreNuevo = request.getParameter("nombre").toUpperCase();
					String apellidoNuevo = request.getParameter("apellido").toUpperCase();
					String generoNuevo = request.getParameter("genero");
					Date fechaNuevo = java.sql.Date.valueOf(request.getParameter("fecha")); 
					String documentoNuevo = request.getParameter("documento");
					String contrasenaNuevo = request.getParameter("contrasena");
					String correoNuevo = request.getParameter("correo");
					long idPerfilNuevo = Long.parseLong(request.getParameter("idPerfil"));
					persona person = new persona();
					person.setNombre(nombreNuevo);
					person.setApellido(apellidoNuevo);
					person.setCorreo(correoNuevo);
					person.setDocumento(documentoNuevo);
					person.setGenero(generoNuevo);
					person.setClave(contrasenaNuevo);
					person.setFecha_nacimiento(fechaNuevo);
					Long idGenerado = (long) sesion.save(person);
					persona_perfil personaPerfil = new persona_perfil();
					personaPerfil.setId_perfil(idPerfilNuevo);
					personaPerfil.setId_persona(idGenerado);
					personaPerfil.setActivo("SI");
					sesion.save(personaPerfil);
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
