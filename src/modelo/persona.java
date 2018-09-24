package modelo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import javax.persistence.Id;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;

@Entity
@Table(name="persona")
public class persona implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="pers_id", nullable=false, unique=true)
	private long id;
	@Column(name="pers_nombre", length=50, nullable=false)
	private String nombre;
	@Column(name="pers_apellido", length=50, nullable=false)
	private String apellido;
	@Column(name="pers_genero", length=1, nullable=false)
	private String genero;
	@Column(name="pers_documento", length=15, nullable=false)
	private String documento;
	@Column(name="pers_fecha_nacimiento", nullable=false)
	@Type(type="date")
	private Date fecha_nacimiento;
	@Column(name="pers_correo", length=320, nullable=false)
	private String correo;
	@Column(name="pers_clave", length=100, nullable=false)
	private String clave;
	
	public persona() {
		
	}
	public persona(long id, String nombre, String apellido, String genero, String documento, Date fecha_nacimiento,
			String correo, String clave) {
		this.id = id;
		this.nombre = nombre;
		this.apellido = apellido;
		this.genero = genero;
		this.documento = documento;
		this.fecha_nacimiento = fecha_nacimiento;
		this.correo = correo;
		this.clave = clave;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getApellido() {
		return apellido;
	}
	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	public String getGenero() {
		return genero;
	}
	public void setGenero(String genero) {
		this.genero = genero;
	}
	public String getDocumento() {
		return documento;
	}
	public void setDocumento(String documento) {
		this.documento = documento;
	}
	public Date getFecha_nacimiento() {
		return fecha_nacimiento;
	}
	public void setFecha_nacimiento(Date fecha_nacimiento) {
		this.fecha_nacimiento = fecha_nacimiento;
	}
	public String getCorreo() {
		return correo;
	}
	public void setCorreo(String correo) {
		this.correo = correo;
	}
	public String getClave() {
		return clave;
	}
	public void setClave(String clave) {
		this.clave = clave;
	}
}
