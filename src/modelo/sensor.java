package modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="sensor")
public class sensor implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="sens_id", nullable=false, unique=true)
	private long id;
	@Column(name="sens_nombre", length=100, nullable=false, unique=true)
	private String nombre;
	@Column(name="sens_descripcion", length=2000)
	private String descripcion;
	@Column(name="sens_activo", length=2, nullable=false)
	private String activo;
	@Column(name="sens_minimo", nullable=false)
	private double minimo;
	@Column(name="sens_maximo", nullable=false)
	private double maximo;
	
	public sensor() {
		
	}
	
	public sensor(long id, String nombre, String descripcion, String activo, double minimo, double maximo) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.activo = activo;
		this.minimo = minimo;
		this.maximo = maximo;
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
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getActivo() {
		return activo;
	}
	public void setActivo(String activo) {
		this.activo = activo;
	}
	public double getMaximo() {
		return maximo;
	}
	public void setMaximo(double maximo) {
		this.maximo = maximo;
	}
	public double getMinimo() {
		return minimo;
	}
	public void setMinimo(double minimo) {
		this.minimo = minimo;
	}
}
