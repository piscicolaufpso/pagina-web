package modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="pescado")
public class pescado implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="pesc_id", nullable=false, unique=true)
	private long id;
	@Column(name="pesc_nombre", length=100, nullable=false, unique=true)
	private String nombre;
	@Column(name="pesc_nombre_cientifico", length=200, nullable=false, unique=true)
	private String nombre_cientifico;
	@Column(name="pesc_origen", length=100, nullable=false)
	private String origen;
	@Column(name="pesc_genero", length=200, nullable=false)
	private String genero;
	@Column(name="pesc_descripcion", length=5000, nullable=false)
	private String descripcion;
	
	public pescado() {
		
	}
	public pescado(long id, String nombre, String nombre_cientifico, String origen, String genero, String descripcion) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.nombre_cientifico = nombre_cientifico;
		this.origen = origen;
		this.genero = genero;
		this.descripcion = descripcion;
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
	public String getNombre_cientifico() {
		return nombre_cientifico;
	}
	public void setNombre_cientifico(String nombre_cientifico) {
		this.nombre_cientifico = nombre_cientifico;
	}
	public String getOrigen() {
		return origen;
	}
	public void setOrigen(String origen) {
		this.origen = origen;
	}
	public String getGenero() {
		return genero;
	}
	public void setGenero(String genero) {
		this.genero = genero;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

}
