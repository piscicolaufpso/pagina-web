package modelo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="pecera")
public class pecera implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="pece_id", nullable=false, unique=true)
	private long id;
	@Column(name="pece_nombre", nullable=false, unique=true) 
	private String nombre;
	@Column(name="pece_diametro", nullable=false)
	private double diametro;
	@Column(name="pece_profundidad", nullable=false)
	private double profundidad;
	@Column(name="pece_descripcion", length=5000, nullable=false)
	private String descripcion;
	@Column(name="pece_activo", length=2, nullable=false)
	private String activo;
	
 	public pecera() {
		
	}
	public pecera(long id, String nombre, double diametro, double profundidad, String descripcion, String activo) {
		this.id = id;
		this.nombre = nombre;
		this.diametro = diametro;
		this.profundidad = profundidad;
		this.descripcion = descripcion;
		this.activo = activo;
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
	public double getDiametro() {
		return diametro;
	}
	public void setDiametro(double diametro) {
		this.diametro = diametro;
	}
	public double getProfundidad() {
		return profundidad;
	}
	public void setProfundidad(double profundidad) {
		this.profundidad = profundidad;
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
	
}
